# Tailored React Environment
![travis-build](https://api.travis-ci.org/DoubleU23/tailored-react-env.svg?branch=master "travis build")  

## Gulp Tasks
task `lint`: runs eslint with babel-eslint and some extended rules based on the "standard" ruleset

* [x] `gulp clean` - cleans `/build` and `/__coverage__`
* `gulp lint`
    `gulp lint:app` - lints app code only
    `gulp lint:all` - also lints env code
    `gulp lint` - lints based on env (isDevelopment)
* [ ] webpack
  * [x] start dev-server with HMR
  * [x] production build
     * [ ] starting production server
* [x] `gulp karma`
* [ ] `gulp imagemin`

## Config

all config-vars are loaded from appConfig.js which loads defaults per config-module (based on NODE_ENV)

### Config-Hierarchy
git
1. command-line injected env vars
  * highest priority to enable custom start/build scripts and CI builds
    f.e. `APP_ENV=development gulp`  
    can overwrite config module vars per `custom-environment-variables.yml`  
    enables gitlabCI/Ansible ENV-Var injections
2. config module files ([node-config](https://www.npmjs.com/package/config) package)  
  * loading config file corresponding to `NODE_ENV`  
    f.e. /config/production.yml
  * NODE_ENV can also be set through `--env ENVNAME` before config-module loads
3. appConfig.js
    * loads defaults from config-module
    * also contains app-related config vars that aren't env-dependent - like paths and file extensions

### Sublime Text

__auto format__ according to your rules defined in .eslintrc:
> * use [ESLint-Formatter](https://packagecontrol.io/packages/ESLint-Formatter) to format by shortcut `[Ctrl + Shift + H]`
> * use [Sublime-Hooks](https://github.com/twolfson/sublime-hooks) to format on pre-save  
just add the following setting to your user-setting file:  
`"on_pre_save_async_user": [{"command": "format_eslint"}] // has to be async`  
bug: has problems with react/jsx-indent for "hardcoded" plaintext in JSX structure
(no problem if you use `{varname}`)

## roadmap/todos
* [x] [config hierarchy](#config-hierarchy)  
  * [x] extended use of config module  
  * [ ] move webpack/constants.js into appConfig
* [x] webpack
    * [x] make hotserverBuild synchronous (use gulp-nodemon)  
      * [ ] wait until nodemon script is finished (.on('start') is too early)  
      see: https://github.com/DoubleU23/gulp-webpack-react-env/blob/master/gulp/tasks/webpack.js#L37
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

## Issues

## Packages
**deprecated phantomjs@2.1.7:** Package renamed to phantomjs-prebuilt. Please update 'phantomjs' package references to 'phantomjs-prebuilt'
**phantomjs2-ext@0.2.2:** Please use latest version of phantomjs

### App

__HMR/Router Bug__

> HMR has a known issue with updating the Router which blocks the reloading:  
`Warning: You cannot change <Router history>; it will be ignored`  
see f.e. https://github.com/ReactTraining/react-router/issues/2704

> **WORKAROUND**
until this is (officially) fixxed, here is the workaround:
after starting the dev-server you have to save the /app/index.js file ONCE
after that you can happily save childcomponents with a running HMR

### Env

__ESLINT - indent__
> [MemberExpression](http://eslint.org/docs/rules/indent#memberexpression) rule is ignored on assignments
"// Any indentation is permitted in variable declarations and assignments."
> right indent on return statements

__ESLINT - func-style__
> enforcing by ESLint-Formatter is broken in __test__ dir...  
maybe it's intended like this to reserve the context?

__ESLINT - extending eslintrc for filepattern__
extend globals (it, describe, ...) for *.spec.js and *.test.js files  
  => https://github.com/eslint/eslint/issues/3611
