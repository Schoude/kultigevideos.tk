# kultigevideos.tk

This repo contains the frontend code for kultigevideos.tk.

## Setup

1. Run `npm install`
2. For development run `npm run dev`
3. To test build for production run `npm run build`.
4. You can test the served production code with running `npm run serve`.

## Development

If you use VS Code, install the extension Volar for code completion and Typescript support in Vue components.

## Testing

There are Vue component tests and integration tests set up for this project. The test runner used is [Cypress](https://www.cypress.io/).

New component test files should be placed next to the actual component file with the `.spec.(t|j)s` prefix.

New integration tests files must be placed in `cypress/integration` in order to be found by the test runner.

### Opening the test environments

1. For component tests run `npm run cy:open-ct` to open the interactive test runner. The test can also be run in the console with `npm run cy:run-ct`.

2. For integration tests run `npm run cy:open` to open the interactive test runner. The test can also be run in the console with `npm run cy:run`.

**IMPORTANT: The integration tests test the assets after the production build. Therefore, first build the app with `npm run build` and then serve it with `npm run serve`.**

## Author(s)

[Schoude](https://github.com/Schoude)
