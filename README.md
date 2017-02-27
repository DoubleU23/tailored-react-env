# roadmap
* [x] [config hierarchy](#config-hierarchy)  
  * [ ] re-locate config
* [ ] store implementation (mobx?)
* [x] server rendering  
  * [ ] server-side async prefetching
  * [ ] store injection/binding
  * [ ] dynamic template

# gulp tasks
task `lint`: runs eslint with babel-eslint and some extended rules based on the "standard" ruleset

* [x] `gulp lint`
* [ ] webpack
  * [x] start dev-server with HMR
  * [x] production build
     * [ ] starting production server

# config

config.js uses (some vars from) process.env vars injected by gulp (args) which are preset by config-module vars that can be overwritten by command-line/ENV vars (f.e. set by GITLAB CI)  
so... most basic defaults are set in the config module files and will be used in gulp args defaults and in config.js defaults

### config-hierarchy

1. command-line injected env vars
  * highest priority to enable custom start/build scripts and CI builds
  * f.e. `APP_ENV=development gulp`
2. config module files ([node-config](https://www.npmjs.com/package/config) package)
  * can be overwritten by env vars (see `custom-environment-variables.yml`)
  * loading config file corresponding to `NODE_ENV`
  * f.e. /config/production.yml
3. gulp args
    * overwrites config modules vars
    * get injected into apps `process.env`
    * f.e. `gulp --env production`
4. config.js defaults
    * contains app-related config vars that aren't env-dependent - like paths and file extensions
    * uses APP_ENV for isDevelopment switch

# issues
HMR has a known issue with updating the Router which blocks the reloading:  
`Warning: You cannot change <Router history>; it will be ignored`  
see f.e. https://github.com/ReactTraining/react-router/issues/2704

**WORKAROUND**
until this is (officially) fixxed, here is the workaround:
after starting the dev-server you have to save the /app/index.js file ONCE
after that you can happily save childcomponents with a running HMR
