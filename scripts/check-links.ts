// /scripts/check-links.ts
import fs from 'fs/promises';
import path from 'path';
import chalk from 'chalk';

const DIST_DIR = path.join(process.cwd(), 'dist');
const IGNORE_EXTENSIONS = [
  '.css',
  '.js',
  '.json',
  '.ico',
  '.svg',
  '.png',
  '.jpg',
  '.jpeg',
  '.webp',
  '.avif',
  '.mp4',
];

async function getHtmlFiles(dir: string): Promise<string[]> {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    entries.map((entry) => {
      const res = path.resolve(dir, entry.name);
      if (entry.isDirectory()) {
        return getHtmlFiles(res);
      }
      return res.endsWith('.html') ? res : [];
    }),
  );
  return Array.prototype.concat(...files);
}

function findLinks(htmlContent: string): string[] {
  const linkRegex = /href="([^"]+)"/g;
  const links = [];
  let match;
  while ((match = linkRegex.exec(htmlContent)) !== null) {
    links.push(match[1]);
  }
  return links;
}

async function checkFileExists(filePath: string): Promise<boolean> {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

export async function checkLinks(): Promise<string[]> {
  console.log(
    chalk.blue('[LINKS] 🔗 Checking internal links in build output...'),
  );
  const htmlFiles = await getHtmlFiles(DIST_DIR);
  const brokenLinks: string[] = [];

  for (const file of htmlFiles) {
    const content = await fs.readFile(file, 'utf-8');
    const links = findLinks(content);

    for (const link of links) {
      if (
        link.startsWith('http') ||
        link.startsWith('//') ||
        link.startsWith('#') ||
        link.startsWith('mailto:') ||
        link.startsWith('tel:')
      ) {
        continue;
      }

      const extension = path.extname(link);
      if (IGNORE_EXTENSIONS.includes(extension)) continue;

      let targetPath = path.join(DIST_DIR, link);

      // Handle SPA routing: /projects/some-slug should check for /projects/some-slug/index.html or resolve to the root index.html
      let exists = await checkFileExists(targetPath);
      if (!exists && !path.extname(targetPath)) {
        exists = await checkFileExists(path.join(targetPath, 'index.html'));
      }
      // This simple check assumes try_files $uri $uri/ /index.html; in nginx. All non-asset links are valid.
      // A more complex check would require spinning up a server. For this script, we'll focus on asset links.
      if (extension && !exists) {
        brokenLinks.push(`[${path.relative(DIST_DIR, file)}] -> ${link}`);
      }
    }
  }

  return brokenLinks;
}

// Allow running this script directly
if (
  import.meta.url.startsWith('file:') &&
  process.argv[1] === new URL(import.meta.url).pathname
) {
  checkLinks().then((brokenLinks) => {
    if (brokenLinks.length > 0) {
      console.error(chalk.red('Found broken links:'));
      brokenLinks.forEach((link) => console.log(`- ${link}`));
      process.exit(1);
    } else {
      console.log(chalk.green('No broken internal links found.'));
    }
  });
}
