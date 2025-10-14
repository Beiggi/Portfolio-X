// /scripts/diagnose.ts
import { exec } from 'child_process';
import { promisify } from 'util';
import fs from 'fs/promises';
import path from 'path';
import chalk from 'chalk';

const execAsync = promisify(exec);

const report = {
  timestamp: new Date().toISOString(),
  tsErrors: '',
  lintErrors: '',
  testResults: '',
  buildErrors: '',
  auditIssues: '',
  unusedDeps: '',
  brokenLinks: [] as string[],
};

async function runCommand(command: string, description: string) {
  console.log(chalk.blue(`[DIAG] 🏃 Running: ${description}...`));
  try {
    const { stdout, stderr } = await execAsync(command);
    if (stderr) {
      console.error(
        chalk.yellow(`[WARN] Stderr from "${description}":\n${stderr}`),
      );
    }
    console.log(chalk.green(`[DIAG] ✅ Success: ${description}`));
    return { success: true, output: stdout || stderr };
  } catch (error: any) {
    console.error(chalk.red(`[DIAG] ❌ Error running "${description}":`));
    console.error(error.stdout || error.stderr);
    console.log(chalk.red('----------------------------------'));
    return { success: false, output: error.stdout || error.stderr };
  }
}

async function main() {
  console.log(chalk.bold.magenta('🚀 Starting portfolio diagnostics...'));

  // 1. TypeScript Check
  const tsResult = await runCommand(
    'pnpm tsc --noEmit',
    'TypeScript Type Check',
  );
  if (!tsResult.success) report.tsErrors = tsResult.output;

  // 2. ESLint Check
  const lintResult = await runCommand(
    'pnpm eslint "src/**/*.{ts,tsx}" --max-warnings=0',
    'ESLint Check',
  );
  if (!lintResult.success) report.lintErrors = lintResult.output;

  // 3. Vitest Run
  const testResult = await runCommand('pnpm vitest run', 'Unit Tests (Vitest)');
  if (!testResult.success) report.testResults = testResult.output;

  // 4. Vite Build Check
  const buildResult = await runCommand('pnpm build', 'Production Build');
  if (!buildResult.success) report.buildErrors = buildResult.output;

  // 5. Dependency Check
  const auditResult = await runCommand('pnpm audit --json', 'NPM Audit');
  if (!auditResult.success) report.auditIssues = auditResult.output;

  const depcheckResult = await runCommand(
    'pnpm depcheck',
    'Unused Dependencies (depcheck)',
  );
  if (!depcheckResult.success) report.unusedDeps = depcheckResult.output;

  // 6. Broken Links Check (requires build to be successful)
  if (buildResult.success) {
    const { checkLinks } = await import('./check-links.js');
    const brokenLinks = await checkLinks();
    report.brokenLinks = brokenLinks;
    if (brokenLinks.length > 0) {
      console.error(
        chalk.red(
          `[DIAG] ❌ Found ${brokenLinks.length} broken internal links.`,
        ),
      );
    } else {
      console.log(
        chalk.green(`[DIAG] ✅ Success: No broken internal links found.`),
      );
    }
  }

  // Generate Report
  const reportDir = path.join(process.cwd(), 'reports');
  await fs.mkdir(reportDir, { recursive: true });
  const reportPath = path.join(reportDir, 'diagnose-report.json');
  await fs.writeFile(reportPath, JSON.stringify(report, null, 2));

  console.log(
    chalk.bold.magenta(
      `\n🏁 Diagnostics complete. Report saved to: ${reportPath}`,
    ),
  );
}

main().catch((err) => {
  console.error(
    chalk.red.bold('A critical error occurred during diagnostics:'),
    err,
  );
  process.exit(1);
});
