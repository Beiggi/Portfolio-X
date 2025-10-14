import { Github, Linkedin, Mail } from 'lucide-react';

export const navItems = [
  { key: 'header.home', link: '/' },
  { key: 'header.about', link: '/about' },
  { key: 'header.projects', link: '/projects' },
  { key: 'header.contact', link: '/contact' },
  { key: 'header.cv', link: '#' }, // El link se genera dinámicamente en App.tsx
];

export const socialLinks = [
  {
    label: 'GitHub',
    link: 'https://github.com/your-username',
    ariaLabel: 'GitHub Profile',
    icon: Github,
  },
  {
    label: 'LinkedIn',
    link: 'https://linkedin.com/in/your-username',
    ariaLabel: 'LinkedIn Profile',
    icon: Linkedin,
  },
  {
    label: 'Email',
    link: 'mailto:your.email@example.com',
    ariaLabel: 'Send an Email',
    icon: Mail,
  },
];
