import cypress from 'cypress';

const userName = 'UsernameIsGood';
const userPass = 'PasswordIsGood';
describe('user successfully logs in and out ', () => {
  it('registers the user and logs him out', () => {
    cy.visit('localhost:3001');
    cy.contains('Register').click();
    cy.get('[data-testid="inputUser"]').type(userName);
    cy.get('[data-testid="inputPass"]').type(userPass);
    cy.get('[type="submit"]').click();
    cy.contains(userName);
    cy.contains('Log out').click();
    cy.get('h1').contains(userName).should('not.exist');
  });

  it('logs the user in then logs out', () => {
    cy.visit('localhost:3001');
    cy.contains('Log in').click();
    cy.get('[data-testid="inputUser"]').type(userName);
    cy.get('[data-testid="inputPass"]').type(userPass);
    cy.get('[type="submit"]').click();
    cy.contains(userName);
    cy.get('[href="/user"] > p').click();
    cy.get(':nth-child(2) > [href="/home"]').click();
    cy.get('h1').contains(userName).should('not.exist');
  });
});
