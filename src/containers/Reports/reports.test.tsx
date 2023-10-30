import React from 'react';

import { render, screen, waitFor } from '@testing-library/react';
import Reports from '@containers/Reports';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import store from '@features/app/store';

test('render Reports component', async () => {
  render(
    <Provider store={store}>
      <MemoryRouter>
        <Reports />
      </MemoryRouter>
    </Provider>,
  );

  await waitFor(() => {
    expect(screen.getByRole('heading', { name: /Reports/i })).toBeInTheDocument();
  });
});
