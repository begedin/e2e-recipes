# Running

## Backend

* To start phoenix backend, run `npm run start:phoenix` from root
* To run phoenix unit tests, run `npm run test:phoenix` from root

For additional actions, move into `/phoenix`

  * Install dependencies with `mix deps.get`
  * Create and migrate your database with `mix ecto.setup`
  * Install Node.js dependencies with `cd assets && npm install`
  * Start Phoenix endpoint in E2E mode with `MIX_ENV=e2e mix phx.server`

## Angular

Run e2e tests from root path with `npm run test:e2e:angular` or `npm run test:e2e:ci:angular`
Run app with in development with  `npm run start:angular`. Phoenix backend needs to run to.


## Vue2

Run e2e tests from root path with `npm run test:e2e:vue2` or `npm run test:e2e:ci:vue2`
Run app with in development with  `npm run start:vue2`. Phoenix backend needs to run to.

For additional actions, move into `/vue2`

  * Install dependencies with `npm install`
  * Compile and hot-reload for dev with `npm run serve`
  * Compile and minify for production with `npm run build`
  * Run unit tests with `npm run test:unit`
  * Lint and auto-fix with `npm run lint`

## React

Run e2e tests from root path with `npm run test:e2e:react` or `npm run test:e2e:ci:react`
Run app with in development with  `npm run start:react`. Phoenix backend needs to run to.

For additional actions, move into `/react`

  * Install dependencies with `npm install`
  * Compile and hot-reload for dev with `npm start`
