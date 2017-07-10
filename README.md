# KLZ - Vorteilsclub Admin
[based on "tailored-react-boilerplate"](https://github.com/DoubleU23/tailored-react-env)

## Gulp Tasks

* [x] `gulp clean` - cleans `/build` and `/__coverage__`
* [x] `gulp lint`  - lints based on env (isDevelopment ? lint:app)  
    task `lint`: runs eslint with babel-eslint and some extended rules based on the "standard" ruleset
  * [x] `gulp lint:app` - lints app code only
  * [x] `gulp lint:all` - also lints env code
* [x] `gulp karma`
  * [x] code-coverage
  * [x] run tests in different Browsers based on env
      * [x] TEST/TRAVIS/CI - PhantomJs
      * [x] other env - Firefox and Chrome
* [x] webpack
  * [x] __development:__ compile webpack instance, start dev-server, start HMR server
  * [x] __production:__ build app and start server
* [ ] `gulp imagemin`
