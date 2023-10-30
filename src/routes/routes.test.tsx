/* eslint-disable react/no-array-index-key */
import React, { ReactElement } from 'react';

import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import Analytics from '@containers/Analytics';
import { Provider } from 'react-redux';
import store from '@features/app/store';

import PAGE_ROUTES from './routingEnum';
import { routingArray } from './routingArray';

describe('Routing Logic', () => {
  const renderWithRouter = (ui: ReactElement, { route = PAGE_ROUTES.HOME } = {}) => {
    window.history.pushState({}, 'Test page', route);

    return render(ui, { wrapper: MemoryRouter });
  };

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

  it('navigate to Analytics page when HOME route is accessed', async () => {
    renderWithRouter(
      <Provider store={store}>
        <Routes>
          <Route path={PAGE_ROUTES.HOME} element={<Analytics />} />
        </Routes>
      </Provider>,
    );

    const resultText = await screen.findByText(/Monthly statistics reports/);

    expect(resultText).toBeInTheDocument();
  });
});
