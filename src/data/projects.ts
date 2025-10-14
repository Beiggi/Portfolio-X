// /src/data/projects.ts
export interface ProjectDetails {
  title: string;
  description: string;
  challenge: string;
  solution: string;
  role: string;
}

export interface Project {
  slug: string;
  category: string;
  imageUrl: string;
  videoUrl?: string;
  techStack: string[];
  timeline: string;
  liveUrl?: string;
  repoUrl?: string;
  details: {
    es: ProjectDetails;
    en: ProjectDetails;
    it: ProjectDetails;
  };
}

export const projects: Project[] = [
  {
    slug: 'interactive-data-dashboard',
    category: 'Web Application',
    imageUrl: '/placeholder/project-1.webp',
    videoUrl: '/placeholder/project-1-preview.mp4',
    techStack: ['React', 'TypeScript', 'D3.js', 'Node.js', 'PostgreSQL'],
    timeline: '3 Months',
    liveUrl: '#',
    repoUrl: '#',
    details: {
      en: {
        title: 'Interactive Data Dashboard',
        description: 'A cutting-edge platform for real-time data analysis.',
        challenge:
          'The main challenge was to process and visualize large datasets in real-time without compromising performance.',
        solution:
          'We implemented a WebSocket-based architecture for data streaming and used D3.js for efficient, interactive visualizations.',
        role: 'Lead Frontend Developer',
      },
      es: {
        title: 'Dashboard de Datos Interactivo',
        description:
          'Una plataforma de vanguardia para el análisis de datos en tiempo real.',
        challenge:
          'El principal desafío fue procesar y visualizar grandes conjuntos de datos en tiempo real sin comprometer el rendimiento.',
        solution:
          'Implementamos una arquitectura basada en WebSockets para el streaming de datos y utilizamos D3.js para visualizaciones eficientes e interactivas.',
        role: 'Desarrollador Frontend Principal',
      },
      it: {
        title: 'Dashboard Dati Interattivo',
        description:
          "Una piattaforma all'avanguardia per l'analisi dei dati in tempo reale.",
        challenge:
          'La sfida principale era elaborare e visualizzare grandi set di dati in tempo reale senza compromettere le prestazioni.',
        solution:
          "Abbiamo implementato un'architettura basata su WebSocket per lo streaming di dati e utilizzato D3.js per visualizzazioni efficienti e interattive.",
        role: 'Sviluppatore Frontend Principale',
      },
    },
  },
  // Añade hasta 7 proyectos más aquí para un total de 8
];
