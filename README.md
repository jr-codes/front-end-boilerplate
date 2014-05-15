# Front-End Boilerplate

Boilerplate project for front-end development.

## What It Does

- Compiles [Sass](http://sass-lang.com/) to CSS
- Adds vendor prefixes with [Autoprefixer](https://github.com/ai/autoprefixer)
- Bundles CommonJS modules using [Browserify](http://browserify.org/)
- Validates JS with [JSHint](http://jshint.com/)
- Starts static web server and opens browser to build directory
- Watches files and re-compiles/refreshes browser on file change.

## Future To Do

- Unit testing with [Karma](http://karma-runner.github.io/) and [Jasmine](http://jasmine.github.io/)
- Faster dev compiling with [watchify](https://github.com/substack/watchify)
- Service mocking with [connect middleware](http://www.senchalabs.org/connect/), [express](http://expressjs.com/), or [restify](http://mcavage.me/node-restify/)
- Other tool considerations ([Plato](https://github.com/es-analysis/plato), [Istanbul](https://github.com/es-analysis/plato))

## Setup

### 1. Install Node

Make sure you have the [latest version](http://nodejs.org/). Check the version by typing this in a command prompt (or [WebStorm](http://www.jetbrains.com/webstorm/) terminal):

    node -v

**Windows Users Only**: [Uninstall Node first](http://stackoverflow.com/questions/20711240/how-to-completely-remove-node-js-from-windows) before installing the new version.


### 2. Install gulp

    npm install -g gulp

### 3. Install Node modules

Navigate to the project folder before entering this command. Modules are defined in `package.json`.

    npm install

Make sure to run `npm update` anytime package.json is updated.

## Development

[Gulp](http://gulpjs.com/) is used for automating build tasks. Tasks are defined in `gulpfile.js`.

To get started, type this command:

    gulp

Install new development-related modules (e.g., gulp plugins) via `npm install --save-dev module-name`. Install front-end modules (e.g., jquery) via `npm install --save module-name`.

## Maintenance

Use [npm-check-updates](https://github.com/tjunnone/npm-check-updates) for updating dependencies in package.json.

## Getting Started Resources

- [npm registry](https://www.npmjs.org/)
- [npm docs](https://www.npmjs.org/doc/)
- [package.json docs](https://www.npmjs.org/doc/json.html)
- [package.json cheatsheet](http://package.json.nodejitsu.com/)