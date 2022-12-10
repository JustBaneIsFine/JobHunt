import { rest } from 'msw';
import categoriesEx from '../components/categoriesEx.json';
export const handlers = [
  rest.post('/register', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ success: true }));
  }),
  rest.post('/login', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ success: true }));
  }),
  rest.get('/login', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({ loggedIn: true, user: { password: 'hh', username: 'usernameIsGood' } }),
    );
  }),
  rest.get('/logout', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({ loggedIn: false, user: { username: 'unknown', password: 'unknown' } }),
    );
  }),
  rest.get('/categories', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ success: true, categories: categoriesEx.categories }));
  }),
  rest.get('/jobTags', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        //
      }),
    );
  }),
  rest.get('/locations', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        //
      }),
    );
  }),
];
