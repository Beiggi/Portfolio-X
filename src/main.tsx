import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import './lib/i18n';
import './styles/global.css';

// Importación de componentes de página
import App from './App.tsx';
import Home from './pages/Home.tsx';
import About from './pages/About.tsx';
import Projects from './pages/Projects.tsx';
import Contact from './pages/Contact.tsx';
import ProjectDetail from './pages/ProjectDetail.tsx';
import NotFound from './pages/NotFound.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Home /> },
      { path: 'about', element: <About /> },
      { path: 'projects', element: <Projects /> },
      { path: 'projects/:projectId', element: <ProjectDetail /> },
      { path: 'contact', element: <Contact /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HelmetProvider>
      <RouterProvider router={router} />
    </HelmetProvider>
  </React.StrictMode>,
);
