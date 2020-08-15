# E2E

For the phoenix backend, move into /phoenix

  * Install dependencies with `mix deps.get`
  * Create and migrate your database with `mix ecto.setup`
  * Install Node.js dependencies with `cd assets && npm install`
  * Start Phoenix endpoint in E2E mode with `MIX_ENV=e2e mix phx.server`

# Vue

Run e2e tests from root path with `npm run test:e2e:vue` or `npm run test:e2e:ci:vue`

For additional actions, move into /vue

  * Install dependencies with `npm install`
  * Compile and hot-reload for dev with `npm run serve`
  * Compile and minify for production with `npm run build`
  * Run unit tests with `npm run test:unit`
  * Lint and auto-fix with `npm run lint`
  
# React

Run e2e tests from root path with `npm run test:e2e:react` or `npm run test:e2e:ci:react`

For additional actions, move into /react

  * Install dependencies with `npm install`
  * Compile and hot-reload for dev with `npm start`
