import {
    observable,
    extendObservable,
    action
} from 'mobx'

import axios from 'axios'

export default class BenefitsStore {

    constructor(state = {}) {
        extendObservable(this, {
            foo:        'bar',
            bar:        'foo',
            status:     'inactive',
            error:      false,
            data:       observable([])
        }, state)

        // show status "inactive" for one second
        setTimeout(() => {
            this.fetch()
        }, 1000)
    }

    @action
    async fetch() {
        this.status = 'pending'

        const response = await axios.get('http://localhost:8001/api/benefits.json', {
            responseType: 'json'
        })

        if (response.status === 200) {
            // simulate server delay
            setTimeout(() => {
                this.data = response.data
                this.status = 'success'
            }, 1000)
        }
        else {
            // TBD: handle error
        }
    }

    get foo() {
        return this.foo
    }

    set foo(value) {
        this.foo = value
        return true
    }

}
