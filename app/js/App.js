'use strict'
import React              from 'react'

// import CurrentUserActions from './actions/CurrentUserActions'
// import CurrentUserStore   from './stores/CurrentUserStore'
import Header             from './components/Header'
import Footer             from './components/Footer'

class App extends React.Component {

    static propTypes = {
        params:     React.PropTypes.object,
        query:      React.PropTypes.object,
        children:   React.PropTypes.oneOfType([
            React.PropTypes.array,
            React.PropTypes.object
        ])
    }

    componentWillMount() {
        console.log('About to mount App')
        let test = 1
        test++

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

export default App
