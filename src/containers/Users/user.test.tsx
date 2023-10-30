import React from 'react';

import { render, screen, waitFor } from '@testing-library/react';
import Users from '@containers/Users';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import store from '@features/app/store';

test('render Users component', async () => {
  render(
    <Provider store={store}>
      <MemoryRouter>
        <Users />
      </MemoryRouter>
    </Provider>,
  );

  await waitFor(() => {
    expect(screen.getByRole('heading', { name: /Users/i })).toBeInTheDocument();
  });
});
