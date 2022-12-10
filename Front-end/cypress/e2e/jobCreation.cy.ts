import cypress from 'cypress';
import categoriesEx from '../../src/components/categoriesEx.json';

describe('Test render ', () => {
  it('test', () => {
    cy.visit('localhost:3001/');
    cy.intercept('GET', '/locations', {});
    cy.intercept('GET', '/jobTags', {});

    //cy.contains(/Administracija/i);
  });
});
