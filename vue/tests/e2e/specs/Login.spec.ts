describe('Login', () => {
  beforeEach(() => cy.checkoutSandbox());
  afterEach(() => cy.checkinSandbox());

  it('Logs in with proper credentials', () => {
    cy.visit('/');
    cy.url().should('contain', 'login');
    cy.create('user', { name: 'joe', password: 'password1' });
    cy.get('input[type="text"]').clear().type('joe');
    cy.get('input[type="password"]').clear().type('password1');
    cy.get('button').click();
    cy.url().should('not.contain', 'login');
  });

  it('Fails with improper credentials', () => {
    cy.visit('/');
    cy.url().should('contain', 'login');
    cy.get('input[type="text"]').clear().type('joe');
    cy.get('input[type="password"]').clear().type('improperPassword');
    cy.get('button').click();
    cy.url().should('contain', 'login');
  });
});
