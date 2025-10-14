// /vitest.setup.tsx (VERSIÓN FINAL Y CORREGIDA)
import '@testing-library/jest-dom';
import { vi } from 'vitest';

// La línea 'import React from 'react';' ha sido eliminada.

// Mockea (suplanta) el componente StaggeredMenu durante las pruebas
vi.mock('@/components/layout/StaggeredMenu', () => {
  return {
    // Asegúrate de que el mock se exporte como 'default'
    default: () => <div data-testid="mocked-staggered-menu" />,
  };
});

// Mockea el componente Galaxy
vi.mock('@/components/effects/backgrounds/Galaxy', () => {
  return {
    default: () => <div data-testid="mocked-galaxy" />,
  };
});
