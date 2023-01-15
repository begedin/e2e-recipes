describe('Todo', () => {
  beforeEach(() => cy.checkoutSandbox());
  afterEach(() => cy.checkinSandbox());

  it('lists todos', () => {
    cy.create('user', {}).then(user => {
      cy.create('todo', { user, title: 'Buy Milk' });
      cy.create('todo', { user, title: 'Write Homework' });
      cy.login(user);
    });

    cy.url().should('not.contain', 'login');

    cy.contains('Buy Milk');
    cy.contains('Write Homework');
  });

  it('creates todos', () => {
    cy.create('user', {}).then(user => cy.login(user));

    cy.url().should('not.contain', 'login');

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

    cy.url().should('not.contain', 'login');

    cy.contains('Buy Milk');
    cy.contains('Write Homework');
    cy.get('.todo:eq(0) button').click();
    cy.get('body').should('not.contain', 'Buy Milk');
    cy.get('.todo:eq(0) button').click();
    cy.get('body').should('not.contain', 'Write Homework');
  });
});
