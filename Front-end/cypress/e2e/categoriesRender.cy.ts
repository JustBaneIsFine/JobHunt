import cypress from 'cypress';
import categoriesEx from '../../src/components/categoriesEx.json';

describe('user successfully logs in and out ', () => {
  it('registers the user and logs him out', () => {
    cy.visit('localhost:3001');
    cy.intercept('GET', '/categories', { success: true, categories: categoriesEx.categories });
    cy.contains(/Administracija/i);
  });
});
