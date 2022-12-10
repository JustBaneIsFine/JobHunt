import React from 'react';

import { render, screen } from '@testing-library/react';
import user from '@testing-library/user-event';
import { server } from '../../mocks/server';
import { rest } from 'msw';
import App from '../../App';
const longText =
  'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx';
const superLongText = 'x';
for (let i = 0; i < 5000; i++) {
  longText.concat('x');
}
const shortText = 'xx';
const wrongDate = '22.22.220';

beforeEach(async () => {
  await renderPage();
});
describe('JobCreation', () => {
  describe('Page renders all input fields and placeholders test:jobcreation', () => {
    test('Page renders main text', async () => {
      const mainText = await screen.findByText('Job creation board');
      expect(mainText).toBeInTheDocument();
    });
    test('Page renders name input placeholder', async () => {
      const placeholder = await screen.findByPlaceholderText('Name of your job');
      expect(placeholder).toBeInTheDocument();
    });
    test('Page renders company input placeholder', async () => {
      const placeholder = await screen.findByPlaceholderText('Name of your company');
      expect(placeholder).toBeInTheDocument();
    });
    test('Page renders price input placeholder', async () => {
      const placeholder = await screen.findByPlaceholderText('Your price');
      expect(placeholder).toBeInTheDocument();
    });
    test('Page renders mainTag input placeholder', async () => {
      const placeholder = await screen.findByPlaceholderText('Best suiting tag');
      expect(placeholder).toBeInTheDocument();
    });
    test('Page renders secondaryTag input placeholder', async () => {
      const placeholder = await screen.findByPlaceholderText('Secondary tag');
      expect(placeholder).toBeInTheDocument();
    });
    test('Page renders description input placeholder', async () => {
      const placeholder = await screen.findByPlaceholderText('Describe your job');
      expect(placeholder).toBeInTheDocument();
    });
    test('Page renders location input placeholder', async () => {
      const placeholder = await screen.findByPlaceholderText('Location of job');
      expect(placeholder).toBeInTheDocument();
    });
    test('Page renders dueDate input placeholder', async () => {
      const placeholder = await screen.findByPlaceholderText('Job due date');
      expect(placeholder).toBeInTheDocument();
    });
  });
  describe('Page renders wrong values', () => {
    //
    describe('Job name', () => {
      test('Empty field: required', async () => {
        //
        inputData();
        const error = await screen.findByPlaceholderText('This field is required');
        expect(error).toBeInTheDocument();
      });

      test('Short name', async () => {
        //
      });

      test('Long name', async () => {
        //
      });
    });
  });
});

async function inputData() {
  user.setup();

  //   await user.click();
  //   await user.paste();
}

async function renderPage() {
  window.history.pushState({}, '', '/createJob');
  render(<App />);
}
