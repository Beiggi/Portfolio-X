// /src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import App from './App';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import ProjectDetail from './pages/ProjectDetail';
import NotFound from './pages/NotFound';
import './lib/i18n';
import './styles/global.css';

// Define the routes using the modern object-based approach
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />, // A fallback for errors
    children: [
      { index: true, element: <Home /> },
      { path: 'about', element: <About /> },
      { path: 'projects', element: <Projects /> },
      { path: 'contact', element: <Contact /> },
      { path: 'projects/:slug', element: <ProjectDetail /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HelmetProvider>
      {/* Use RouterProvider to enable the future flags */}
      <RouterProvider
        router={router}
        future={{
          // Opt-in to the new features
          v7_startTransition: true,
          v7_relativeSplatPath: true,
        }}
      />
    </HelmetProvider>
  </React.StrictMode>,
);
