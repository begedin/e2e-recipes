// eslint-disable-next-line
/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable<Subject> {
    checkoutSandbox: () => void
    checkinSandbox: () => void
    create: (schema: string, attrs: {}) => Response['body']
    login: (user: { name: string, password: string }) => Chainable<Response>
  }
}
