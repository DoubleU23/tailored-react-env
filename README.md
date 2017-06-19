# Tailored React Environment
[![travis-build](https://api.travis-ci.org/DoubleU23/tailored-react-env.svg?branch=master "travis build")](https://travis-ci.org/DoubleU23/tailored-react-env)

## Gulp Tasks
task `lint`: runs eslint with babel-eslint and some extended rules based on the "standard" ruleset

* [x] `gulp clean` - cleans `/build` and `/__coverage__`
* [x] `gulp lint`  - lints based on env (isDevelopment ? lint:app)
  * [x] `gulp lint:app` - lints app code only
  * [x] `gulp lint:all` - also lints env code
* [x] `gulp karma`
  * [x] code-coverage
  * [x] run tests in different Browsers based on env
      * [x] TEST/TRAVIS/CI - PhantomJs
      * [x] other env - Firefox and Chrome
* [ ] webpack
  * [x] start dev-server with HMR
  * [x] production build
     * [ ] starting production server
* [ ] `gulp imagemin`

## Config

all config-vars are loaded from appConfig.js which loads defaults per config-module (based on NODE_ENV)

### Config-Hierarchy
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
* [ ]  inject React into scope per webpack (react/react-in-jsx-scope)  
    and remove React imports in all Components

* [x] [config hierarchy](#config-hierarchy)  
  * [x] extended use of config module  
  * [ ] move webpack/constants.js into appConfig
* [x] webpack
    * [x] make hotserverBuild synchronous (use gulp-nodemon)  
      * [ ] wait until nodemon script is finished (.on('start') is too early)  
      see: https://github.com/DoubleU23/tailored-react-env/blob/master/gulp/tasks/webpack.js#L37
    * [x] synchronous production build
* [ ] travis integration
  * [x] integrate travis test script for master pushes
  * [ ] integrate NODE_ENV "test" or "CI"
* [x] browserSync
  * [x] start browserSync proxy after webpack has built
* [ ] store implementation (mobx?)
* [x] server rendering  
  * [ ] server-side async prefetching
  * [ ] store injection/binding
  * [ ] dynamic template
* [ ] sublime enhancements
    * [x] ESLint-Formatter
    * [x] setup/enhance align plugin and run it on pre_save on the whole file
      [ ] fix colon alignments
* [ ] eslint
  * [ ] set special function rules for __test__ to preserver this context (no arrow-functions)
  * [ ] extend globals for *.spec.js and *.test.js files  
  => https://github.com/eslint/eslint/issues/3611
* [ ] tests
  * [ ] setup test-environment
    karma-webpack with mocha, chai and enzyme
    * [ ] learn enzyme/chai-entyme expect syntax
    * [x] write first tests
    * [ ] use browserstack API for karma tests
* [ ] styles
  do we need a gulp task or just webpack plugins!?

## known issues

### ESLINT

__react/prefer-stateless-function__
shows warning/error for my Components, although they are "pure"  

__ESLINT - indent__
> [MemberExpression](http://eslint.org/docs/rules/indent#memberexpression) rule is ignored on assignments
"// Any indentation is permitted in variable declarations and assignments."
> right indent on return statements

__ESLINT - versioning__
babel-eslint >= v7 breaks static property recognition
http://2ality.com/2015/02/es6-classes-final.html#inside_the_body_of_a_class_definition  

__ESLINT - func-style__
> enforcing by ESLint-Formatter is broken in __test__ dir...  
maybe it's intended like this to reserve the context?

__ESLINT - extending eslintrc for filepattern__
extend globals (it, describe, ...) for *.spec.js and *.test.js files  
  => https://github.com/eslint/eslint/issues/3611
