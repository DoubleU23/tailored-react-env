import { extendObservable } from 'mobx'

export default class TestStore {

    constructor(state = {}) {
        extendObservable(this, {
            foo:        'bar',
            bar:        'foo'
        }, state)
    }

    // get foo() {
    //     return this.foo
    // }

    // set foo(value) {
    //     this.foo = value
    //     return true
    // }

    setFoo(value) {
        this.foo = value
        return true
    }

}
