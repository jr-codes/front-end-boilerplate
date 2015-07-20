# Front-End Boilerplate

Boilerplate project for front-end development built using [gulp](http://gulpjs.com/).

## Tools

- [Sass](http://sass-lang.com/) + [Autoprefixer](https://github.com/ai/autoprefixer): CSS
- [Browserify](http://browserify.org/) + [JSHint](http://jshint.com/) + [JSCS](http://jscs.info/): JavaScript
- [Watchify](https://github.com/substack/watchify): Faster Browserify builds
- [BrowserSync](http://www.browsersync.io/): Live reload static web server

## Setup

### 1. Install Node

Make sure you have [the latest version](http://nodejs.org/). Type this in a command prompt (or [WebStorm](http://www.jetbrains.com/webstorm/) terminal):

    node -v

### 2. Install gulp

    npm install -g gulp

### 3. Install Node modules

Navigate to the project folder before entering this command. Modules are defined in `package.json`.

    npm install

## Development

[Gulp](http://gulpjs.com/) is used for automating build tasks. Tasks are defined in `gulpfile.js`.

To get started, type this command:

    gulp

Install new development-related modules (e.g., gulp plugins) via `npm install --save-dev module-name`. Install front-end modules (e.g., jquery) via `npm install --save module-name`.

## Maintenance

Use [npm-check-updates](https://github.com/tjunnone/npm-check-updates) for updating dependencies in package.json. Make sure to run `npm update` any time package.json is updated.

## Getting Started Resources

- [npm registry](https://www.npmjs.org/)
- [npm docs](https://www.npmjs.org/doc/)
- [package.json docs](https://www.npmjs.org/doc/json.html)
- [package.json cheatsheet](http://package.json.nodejitsu.com/)
