// /src/App.test.tsx (VERSIÓN ASÍNCRONA CORREGIDA)
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import { HelmetProvider } from 'react-helmet-async';
import i18n from '@/lib/i18n';
import App from './App';
import { describe, it, expect } from 'vitest';

describe('App Component', () => {
  it('renders the main application wrapper after the preloader', async () => {
    render(
      <BrowserRouter>
        <I18nextProvider i18n={i18n}>
          <HelmetProvider>
            <App />
          </HelmetProvider>
        </I18nextProvider>
      </BrowserRouter>,
    );

    // LA CLAVE: Espera hasta 3 segundos a que el texto aparezca.
    // Esto le da tiempo al preloader para que termine su animación.
    await waitFor(
      () => {
        expect(screen.getByText(/Get in touch/i)).toBeInTheDocument();
      },
      { timeout: 3000 },
    );
  });
});
