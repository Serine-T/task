import React from 'react';

import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '@features/app/store';

import Users from '.';

test('displays users fetched from the API', async () => {
  render(
    <Provider store={store}>
      <Users />
    </Provider>,
  );

  await waitFor(() => expect(screen.getByText('SampleUserName')).toBeInTheDocument());
});
