import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import App from '../../App';
import user from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';

describe('Categories successfully render ', () => {
  test('categories render successfully', async () => {
    user.setup();

    render(<App />);
    const categoryText = await screen.findByText(/Administracija/i, undefined, { timeout: 5000 });
    expect(categoryText).toBeInTheDocument();
  });
});
