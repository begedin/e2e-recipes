// eslint-disable-next-line
/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable<Subject> {
    checkoutSandbox: () => void;
    checkinSandbox: () => void;
    create: <T = any>(schema: string, attrs: {}) => Response<T>['body'];
    login: (user: { name: string; password: string }) => Chainable<Response<{ token: string }>>;
  }
}
