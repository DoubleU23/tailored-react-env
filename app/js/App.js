'use strict'

import React, {PropTypes} from 'react'
import Component          from 'react-pure-render/component'

import Header             from './components/Header'
import Footer             from './components/Footer'

import { observer } from 'mobx-react'

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
    }

    constructor(props) {
        super(props)

        console.log('props', props)
    }

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
        return <div>{this.props.store.test.foo}</div>
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
                {this.renderChildren()}
                <Footer />
            </div>
        )
    }

}

export default observer(App)
