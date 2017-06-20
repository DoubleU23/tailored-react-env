import { extendObservable } from 'mobx'

export default class TestStore {

    constructor(state = {}) {
        extendObservable(this, {
            foo:        'bar',
            bar:        'foo'
        }, state)
    }

    get foo() {
        return 'test'
    }

    set foo(value) {
        this.foo = value
        return true
    }

}
