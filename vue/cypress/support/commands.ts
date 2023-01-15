const apiUrl = (path: string) => `http://localhost:4000/api/${path}`;

const checkoutSandbox = () =>
  cy
    .intercept('**/api/**', req => {
      const sandboxId = Cypress.env('sandboxId');
      if (!sandboxId) {
        return;
      }
      req.headers['Sandbox'] = sandboxId;
    })
    .as('apiInterceptor')
    .request('POST', apiUrl('sandbox'))
    .then(response => Cypress.env('sandboxId', response.body));

Cypress.Commands.add('checkoutSandbox', checkoutSandbox);

const checkinSandboxCommand = () =>
  cy.request({
    method: 'DELETE',
    url: apiUrl('sandbox'),
    headers: { Sandbox: Cypress.env('sandboxId') },
  });

Cypress.Commands.add('checkinSandbox', checkinSandboxCommand);

const createRequest = (schema: string, attributes: {}) => ({
  method: 'POST',
  url: apiUrl('factory'),
  body: { schema, attributes },
  headers: { Sandbox: Cypress.env('sandboxId') },
});

const createCommand = (schema: string, attributes: {}) =>
  cy.request(createRequest(schema, attributes)).then(response => response.body);

Cypress.Commands.add('create', createCommand);

const loginCommand = (user: { name: string; password: string }) => {
  cy.visit('/login');
  cy.get('input[type="text"]').clear().type(user.name);
  cy.get('input[type="password"]').clear().type(user.password);
  cy.get('button').click();
};

Cypress.Commands.add('login', loginCommand);
