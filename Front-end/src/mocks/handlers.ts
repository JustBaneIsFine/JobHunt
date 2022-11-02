import { rest } from 'msw';

export const handlers = [
  rest.post('/register', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ success: true }));
  }),
  rest.post('/login', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ success: true }));
  }),
];
