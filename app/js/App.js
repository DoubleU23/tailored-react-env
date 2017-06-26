'use strict'

import React, {PropTypes} from 'react'
import Component          from 'react-pure-render/component'

import Header             from './components/Header'
import Footer             from './components/Footer'

import { observer, inject } from 'mobx-react'

/**
 * to be clarified:
 *     - inject
 *         only on first lvl component (App.js) and pass through {...this.props} like in redux
 *         OR inject for each component that needs access to the store(s)
 *     => seems to make no difference!?
 *
 */
class Test extends Component {

    static propTypes = {
        store: PropTypes.object.isRequired
    }

    componentWillMount() {
        // console.log('[TEST->componentWillMount] this', this)
    }

    componentWillReceiveProps(nextProps) {
        // console.log('[Test->componentWillReceiveProps] nextProps', nextProps)
    }

    componentWillReact() {
        // console.log('[Test->componentWillReact] !!!')
    }

    render() {
        console.log('[Test->render()] !!!')
        return <div>TestStore.foo in childComponent: {this.props.store.test.foo}</div>
    }

}
const TestObserved = observer(Test)
// const TestWrapped = inject('store')(TestObserved)
const TestWrapped = TestObserved

class App extends Component {

    static propTypes = {
        params:     PropTypes.object.isRequired,
        query:      PropTypes.object.isRequired,
        children:   PropTypes.oneOfType([
            PropTypes.array,
            PropTypes.object
        ]).isRequired,
        // store
        store: PropTypes.object.isRequired
    };

    componentWillMount() {
        console.log('About to mount App...')
    }

    componentDidMount() {
        const {test} = this.props.store

        window.test = test
        // test.foo('test')
        //
        this.testFn({foo: 'foo', bar: 'bar'})
    }

    componentWillReceiveProps(nextProps) {
        console.log('[App->componentWillReceiveProps] nextProps', nextProps)
    }

    componentWillReact() {
        console.log('[App->componentWillReact] !!!')
    }

    testFn({foo, bar}) {
        console.log(foo, bar)
    }

    render() {
        return (
            <div style={{height: '5000px'}} id="app">
                <Header />
                <TestWrapped {...this.props} />
                <br />
                <div>
                    TestStore.foo in App.js: {this.props.store.test.foo}
                    <br />
                    <br />
                    <a
                        style={{
                            cursor: 'pointer',
                            textDecoration: 'underline'
                        }}
                        onClick={() => {
                            this.props.store.test.foo =
                                this.props.store.test.foo === 'bar'
                                    ? 'foo'
                                    : 'bar'
                        }}
                    >
                        toggle TestStore.foo!
                    </a>
                    <br />
                    <br />
                </div>
                <Footer />
            </div>
        )
    }

}

const AppObserved = observer(App)
export default inject('store')(AppObserved)
