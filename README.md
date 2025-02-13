# academy_cdr

# creation des aventures

## choose your configs in /src/store/modules/config.js :

- local config, useful for developments : config_path: '../../data/first_aventure/',
- revisions on github : config_path:'https://raw.githubusercontent.com/scenaristeur/academy_cdr/refs/heads/main/src/data/first_aventure/',
- shared on Solid : config_path: 'https://academy-cdr.solidcommunity.net/public/aventures/first_aventure/',

update :

- Solid : https://academy-cdr.solidcommunity.net/public/cdr_academie/
- academy-cdr

# tools

- json validator https://jsonlint.com/

---

# bootstrap

- https://stackoverflow.com/questions/65547199/using-bootstrap-5-with-vue-3

# Solid get values

- https://docs.inrupt.com/developer-tools/javascript/client-libraries/tutorial/read-write-data/#read-data-attribute-of-a-thing

---

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Run End-to-End Tests with [Playwright](https://playwright.dev)

```sh
# Install browsers for the first run
npx playwright install

# When testing on CI, must build the project first
npm run build

# Runs the end-to-end tests
npm run test:e2e
# Runs the tests only on Chromium
npm run test:e2e -- --project=chromium
# Runs the tests of a specific file
npm run test:e2e -- tests/example.spec.ts
# Runs the tests in debug mode
npm run test:e2e -- --debug
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
