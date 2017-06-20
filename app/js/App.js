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
        test: PropTypes.object.isRequired
    }

    componentWillMount() {
        console.log('[TEST->componentWillMount] this', this)
    }

    render() {
        return <div>{this.props.test.foo}</div>
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
    }

    componentWillReact() {
        console.log('componentWillReact!!!')
    }

    renderChildren() {
        return (
            <a
                style={{
                    cursor: 'pointer',
                    textDecoration: 'underline'
                }}
                onClick={() => this.props.store.test.setFoo(
                    'test'
                    // this.props.store.test.foo === 'bar'
                    //     ? 'foo'
                    //     : 'bar'
                )}
            >
                {/* this.props.store.test.foo */}
                mjiohopö
            </a>
        )
        // return React.cloneElement(this.props.children, {
        //     params:         this.props.params,
        //     query:          this.props.query
        //     // currentUser:    this.state.currentUser
        // })
    }

    render() {
        this.renderChildren.bind(this)

        return (
            <div style={{height: '5000px'}}>
                <Header />
                <TestWrapped test={this.props.store.test} />
                <br />
                {this.renderChildren()}
                <Footer />
            </div>
        )
    }

}

const AppObserved = observer(App)
export default inject('store')(AppObserved)
