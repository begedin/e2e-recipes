describe('Register', () => {
  beforeEach(() => cy.checkoutSandbox());
  afterEach(() => cy.checkinSandbox());

  it('registers user', () => {
    cy.visit('/register');
    cy.get('input[type=text]').clear().type('newUser');
    cy.get('input[type=password]').clear().type('newPassword');
    cy.get('button').click();
    cy.url().should('not.contain', 'register');
  });
});
