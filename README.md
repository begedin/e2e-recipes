# E2E

For the phoenix backend, move into /phoenix

  * Install dependencies with `mix deps.get`
  * Create and migrate your database with `mix ecto.setup`
  * Install Node.js dependencies with `cd assets && npm install`
  * Start Phoenix endpoint in E2E mode with `MIX_ENV=e2e mix phx.server`

# Vue

For the Vue app, move into /vue

  * Install dependencies with `npm install`
  * Compile and hot-reload for dev with `npm run serve`
  * Compile and minify for production with `npm run build`
  * Run unit tests with `npm run test:unit`
  * Run e2e tests with `npm run test:e2e`
  * Lint and auto-fix with `npm run lint`
  
# React

For the React app, move into /react

  * Install dependencies with `npm install`
  * Compile and hot-reload for dev with `npm start`
  * In a separate tab, run e2e tests with `npx testcafe e2e/fixtures`
