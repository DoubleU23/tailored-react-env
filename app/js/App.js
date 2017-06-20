'use strict'

import React, {PropTypes} from 'react'
import Component          from 'react-pure-render/component'

import Header             from './components/Header'
import Footer             from './components/Footer'


export default class App extends Component {

    static propTypes = {
        params:     PropTypes.object,
        query:      PropTypes.object,
        children:   PropTypes.oneOfType([
            PropTypes.array,
            PropTypes.object
        ])
    }

    componentWillMount() {
        console.log('About to mount App...')
    }

    renderChildren() {
        return <div>renderChildren</div>
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
