import cypress from 'cypress';

const userName = 'UsernameIsGood';
const userPass = 'PasswordIsGood';
const userEmail = 'x@x.x';

describe('user successfully logs in and out ', () => {
  it('registers the user and logs him out', () => {
    cy.visit('localhost:3001');
    cy.contains('Register').click();
    cy.get('[data-testid="inputUser"]').type(userName);
    cy.get('[data-testid="inputEmail"]').type(userEmail);
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
    cy.get('[data-testid="inputEmail"]').type(userEmail);
    cy.get('[data-testid="inputPass"]').type(userPass);

    cy.get('[type="submit"]').click();
    //should be logged in
    cy.contains(userName);
    cy.get('[href="/user"] > p').click();
    cy.get('#logOut').click();
    // should be logged out
    cy.get('h1').contains(userName).should('not.exist');
  });

  it('logs the user in and deletes the user', () => {
    cy.visit('localhost:3001');
    cy.contains('Log in').click();
    cy.get('[data-testid="inputUser"]').type(userName);
    cy.get('[data-testid="inputEmail"]').type(userEmail);
    cy.get('[data-testid="inputPass"]').type(userPass);

    cy.get('[type="submit"]').click();
    //should be logged in
    cy.contains(userName);
    cy.get('[href="/user"] > p').click();
    cy.get('.App > :nth-child(2) > :nth-child(3)').click();
    // should be logged out
    cy.get('h1').contains(userName).should('not.exist');
  });

  it('tries to log in but the user is deleted', () => {
    cy.visit('localhost:3001');
    cy.contains('Log in').click();
    cy.get('[data-testid="inputUser"]').type(userName);
    cy.get('[data-testid="inputEmail"]').type(userEmail);
    cy.get('[data-testid="inputPass"]').type(userPass);

    cy.get('[type="submit"]').click();
    //should fail logging in
    cy.get('[data-testid="inputUser"]').should(
      'have.attr',
      'placeholder',
      'username/password combination is wrong',
    );
  });
});
