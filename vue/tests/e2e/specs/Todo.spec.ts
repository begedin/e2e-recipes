describe('Login', () => {
  beforeEach(() => cy.checkoutSandbox());
  afterEach(() => cy.checkinSandbox());

  it('lists todos', () => {
    cy.create('user', {}).then(user => {
      cy.create('todo', { user, title: 'Buy Milk' });
      cy.create('todo', { user, title: 'Write Homework' });
      cy.login(user);
    });

    cy.contains('Buy Milk');
    cy.contains('Write Homework');
  });

  it('creates todos', () => {
    cy.create('user', {}).then(user => {
      cy.login(user);
    });

    cy.get('input[type=text]').clear().type('Go run!');
    cy.get('button[type=submit]').click();
    cy.contains('Go run!');

    cy.get('input[type=text]').clear().type('Finish talk!');
    cy.get('button[type=submit]').click();
    cy.contains('Finish talk!');

    // check after reload
    cy.visit('/');
    cy.contains('Go run!');
  });

  it('deletes todos', () => {
    cy.create('user', {}).then(user => {
      cy.create('todo', { user, title: 'Buy Milk' });
      cy.create('todo', { user, title: 'Write Homework' });
      cy.login(user);
    });
    cy.contains('Buy Milk');
    cy.contains('Write Homework');
    cy.get('button:eq(0)').click();
    cy.get('body').should('not.contain', 'Buy Milk');
    cy.get('button:eq(0)').click();
    cy.get('body').should('not.contain', 'Write Homework');
  });
});
