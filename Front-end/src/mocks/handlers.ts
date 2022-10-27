import { rest } from 'msw';

export const handlers = [
  rest.post('/register', (req, res, ctx) => {
    return res(ctx.status(200, 'you are registered in'));
  }),
  rest.post('/login', (req, res, ctx) => {
    return res(ctx.status(200, 'you are logged in'));
  }),
];
