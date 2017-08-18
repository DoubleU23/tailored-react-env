# Tailored React Environment
[![travis-build](https://api.travis-ci.org/DoubleU23/tailored-react-env.svg?branch=master "travis build")](https://travis-ci.org/DoubleU23/tailored-react-env)

## Gulp Tasks

* `gulp clean` - cleans `/build` and `/__coverage__`
* `gulp lint`  - lints based on env (isDevelopment ? lint:app)
  * `gulp lint:app` - lints app code only
  * `gulp lint:all` - also lints env code
* `gulp karma`
  * code-coverage (instanbul-instrumenter)
  * run tests in different Browsers based on env
      * TEST/TRAVIS/CI - PhantomJs
      * other env - Firefox and Chrome
* webpack
  * __development:__ compile webpack instance, start dev-server, start HMR server
  * __production:__ build app and start server

## Config

all config-vars are loaded from appConfig.js which loads defaults per config-module (based on NODE_ENV)

### Config-Hierarchy - TBD
1. __command-line injected env vars__  
    highest priority to enable custom start/build scripts and CI builds
    f.e. `APP_ENV=development gulp`  
    can overwrite config module vars per `custom-environment-variables.yml`  
    enables gitlabCI/Ansible ENV-Var injections  

2. __config module files__ ([node-config](https://www.npmjs.com/package/config) package)  
    loading config file corresponding to `NODE_ENV`  
    f.e. /config/production.yml  
    __HINT:__ running gulp, NODE_ENV can also be set through `--env ENVNAME`

3. __appConfig.js__
    * loads defaults from config-module
    * also contains app-related config vars that aren't env-dependent (paths, file extensions, ...)

## roadmap/todos
* [ ] exclude "clean" dirs (coverage, build, ...) from lint:all
* [ ] npm tasks
* [ ] fix process.env.BUILD_STATIC and its relation to NODE_ENV
* [ ] refactor ConfirmationDiaglog again (canCancel + buttonLabels)  
* [ ] bundle "UI Components" in ONE Component which is rendered in <App />  
* [ ] ??? sourcemaps for babel-register node-env codes ? require('source-map-support').install() ???  
* [ ] MessageStore: take default language ok browser  
* [ ] /stack/lib(/components) - for reusable Components and react-env related utils (like ConfirmationDialog)  

* [x] [config hierarchy](#config-hierarchy)  
* [ ] fix api calls for static build (express.static)  
  * [ ] how to manage calls if no server is Running!? import from 'fixtures'  
  * [ ] fix dynamic fixtures + static app import
* [ ] templating
* [ ] theme-management (cssobjects-loader theme.styl)
* [x] webpack  
    * [x] synchronous production build
* [x] travis integration
  * [x] integrate travis test script for master pushes
* [x] browserSync
  * [x] start browserSync proxy after webpack has built
* [x] MobX store implementation
* [x] Routing (react-router v4)
* [x] server rendering  
  * [ ] server-side async prefetching
  * [ ] store injection/binding
  * [ ] dynamic template
* [x] eslint
  * [ ] pattern based settings for *.spec.js and *.test.js files  
  (global it and describe, no arrow-functions, ...)  
  => https://github.com/eslint/eslint/issues/3611
* [x] tests
  * [x] setup test-environment
    karma-webpack with mocha, chai and enzyme
    * [x] write first tests
    * [x] fix coverage report
    * [ ] use browserstack API for karma tests

## known issues

### ESLINT

__ESLINT - versioning__
babel-eslint >= v7 breaks static property recognition
http://2ality.com/2015/02/es6-classes-final.html#inside_the_body_of_a_class_definition  

__ESLINT - extending eslintrc for filepattern__
extend globals (it, describe, ...) for *.spec.js and *.test.js files  
  => https://github.com/eslint/eslint/issues/3611
