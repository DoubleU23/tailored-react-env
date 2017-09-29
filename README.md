# Tailored React Environment
[![travis-build](https://api.travis-ci.org/DoubleU23/tailored-react-env.svg?branch=master "travis build")](https://travis-ci.org/DoubleU23/tailored-react-env)

## NPM Scripts

* `start` -> start app in development mode
* `build` -> build app and start production server
* `build:static` -> build static app (html+js+css)
* `lint` -> lint code (app + stack)
* `mocha` -> run unit tests
* `test` -> run integration tests (in karma)

also supports [husky](https://www.npmjs.com/package/husky) git hooks
* `precommit` -> lint code (app + stack)

## Gulp Tasks

* `gulp clean` - cleans `/build` and `/__coverage__`
* `gulp lint`  - lints based on env (isDevelopment ? lint:app)
  * `gulp lint:app` - lints app code only
  * `gulp lint:all` - also lints stack code
* `gulp karma`
  * code-coverage (instanbul-instrumenter)
  * integration tests
      * TEST/TRAVIS/CI - PhantomJs
      * other env - Firefox and Chrome
* webpack
  * __development:__ compile webpack instance, start dev-server, start HMR server
  * __production:__ build app and start server

## Config

all config-vars are loaded from appConfig.js which loads defaults per config-module (based on NODE_ENV)

### Config-Hierarchy - TBC
1. __command-line injected env vars__  
    * highest priority to enable custom start/build scripts and CI builds
      f.e. `APP_ENV=development gulp`  
    * can overwrite config module vars per `custom-environment-variables.yml`  
      enables ENV-Var injections for Continious Integration  

2. __config module files__ ([node-config](https://www.npmjs.com/package/config) package)  
    * loading config file corresponding to `NODE_ENV`  
      f.e. /config/production.yml  
    __HINT:__ running gulp, NODE_ENV can also be set through `--env ENVNAME` before config gets loaded

3. __appConfig.js__
    * isomorphic
        * on server:  
          gets config per `require('config')`
        * on client:  
          gets config per `process.env.CONFIG`  
          which gets injected by `webpack.DefinePlugin` from config-module
    * loads defaults from config-module
    * extends config with app-related vars that aren't env-dependent (paths, file extensions, ...)

## roadmap/todos
* [ ] updrade depreacated packages (tryout "greenkeeper")  
* [ ] add Heroku ProcFile + deployment of boilerplate showcase
* [ ] refactor itemList (+styling)  
* [ ] refactor routes (Routes.js should export object typed route tree)  
* [ ] add mobx-router + routeTransitions (+ loading screen)  
* [ ] HMR injection for stylus changes  
* [ ] setup dynamic import path for webpack (babel)  
  * [ ] /stack/lib(/components) - for reusable Components and react-env related utils (like ConfirmationDialog)  
  * f.e.: `import '/compontents/PATH/FILENAME'`  
    => should search in more paths ['/app/js/components', '/stack/lib/compontents']  
* [ ] Documentation (try [Slate](https://github.com/lord/slate) or similar tools)  
* [ ] fix process.env.BUILD_STATIC and its relation to NODE_ENV  
  * [ ] refactor ConfirmationDiaglog again (canCancel + buttonLabels)  
  * [ ] bundle "UI Components" in ONE Component which is rendered in <App />  
* [ ] ??? sourcemaps for babel-register node-env codes ? require('source-map-support').install() ???  
  * [ ] compare with "klzvtcadmin"
* [ ] LOCALIZATION
  * [ ] translate content for DE/EN
  * [ ] MessageStore: take default language of browser  
* [ ] (maybe) add [mobx-router](https://github.com/kitze/mobx-router)  
* [x] [config hierarchy](#config-hierarchy)  
  * [ ] enhancement, testing, ...
* [ ] fix routing for static build  
* [ ] fix api calls for static build (express.static)  
  * [ ] fix api calls for static build (express.static)  
  * [ ] how to manage calls if no server is Running!? import from 'fixtures'  
  * [ ] fix dynamic fixtures + static app import
* [ ] templating
* [ ] theme-management (cssobjects-loader theme.styl)
* [x] server rendering  
  * [ ] server-side async prefetching
  * [ ] store injection/binding
  * [ ] dynamic templateggit 
* [x] eslint
  * [ ] pattern based settings for *.spec.js and *.test.js files  
  (global it and describe, no arrow-functions, ...)  
  => https://github.com/eslint/eslint/issues/3611
* [x] tests / CI
  * [ ] integrate [Sentry](https://github.com/marketplace/sentry)  
  * [x] setup test-environment
    karma-webpack with mocha, chai and enzyme
    * [x] write first tests
    * [x] fix coverage report
    * [ ] use browserstack API for karma tests
* [ ] include more libaries ( = more features!!! :confetti_ball: )
  * [ ] include [lodashs' webpack plugin](https://github.com/lodash/lodash-webpack-plugin)


## known issues

### ESLINT

__ESLINT - versioning__
babel-eslint >= v7 breaks static property recognition
http://2ality.com/2015/02/es6-classes-final.html#inside_the_body_of_a_class_definition  

__ESLINT - extending eslintrc for filepattern__
extend globals (it, describe, ...) for *.spec.js and *.test.js files  
  => https://github.com/eslint/eslint/issues/3611
