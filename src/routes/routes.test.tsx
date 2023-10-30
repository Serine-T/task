/* eslint-disable react/no-array-index-key */
import React, { ReactElement } from 'react';

import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

import PAGE_ROUTES from './routingEnum';
import { routingArray } from './routingArray';

describe('Routing Logic', () => {
  const renderWithRouter = (ui: ReactElement, { route = PAGE_ROUTES.HOME } = {}) => {
    window.history.pushState({}, 'Test page', route);

    return render(ui, { wrapper: MemoryRouter });
  };

  it('navigate to Analytics page when HOME route is accessed', () => {
    renderWithRouter(
      <Routes>
        {routingArray.map((route, index) => (
          <Route key={index} path={route.path} element={route.element} />
        ))}
      </Routes>,
    );
    expect(screen.getByText(/Monthly statistics reports/)).toBeInTheDocument();
  });

  it('show NotFound component for non-existent route', () => {
    renderWithRouter(
      <Routes>
        {routingArray.map((route, index) => (
          <Route key={index} path={route.path} element={route.element} />
        ))}
      </Routes>,
      { route: '/non-existent-route' as PAGE_ROUTES },
    );
    expect(screen.getByText(/404/)).toBeInTheDocument();
  });

  it('render Users component for USERS route', () => {
    renderWithRouter(
      <Routes>
        {routingArray.map((route, index) => (
          <Route key={index} path={route.path} element={route.element} />
        ))}
      </Routes>,
      { route: PAGE_ROUTES.USERS },
    );
    expect(screen.getByText(/Users/)).toBeInTheDocument();
  });

  it('render Reports component for REPORT route', () => {
    renderWithRouter(
      <Routes>
        {routingArray.map((route, index) => (
          <Route key={index} path={route.path} element={route.element} />
        ))}
      </Routes>,
      { route: PAGE_ROUTES.REPORTS },
    );
    expect(screen.getByText(/Reports/)).toBeInTheDocument();
  });
});
