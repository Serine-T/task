/* eslint-disable react/no-array-index-key */
import React from 'react';

import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '@features/app/store';

import Sidebar from '.';

test('Sidebar Navigation', () => {
  render(
    <Provider store={store}>
      <MemoryRouter>
        <Sidebar />
      </MemoryRouter>
    </Provider>,
  );

  expect(screen.getByRole('link', { name: /Users/i })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /Reports/i })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /Analytics/i })).toBeInTheDocument();
});
