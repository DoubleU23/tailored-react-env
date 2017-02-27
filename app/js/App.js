'use strict'
import React              from 'react'

import CurrentUserActions from './actions/CurrentUserActions'
import CurrentUserStore   from './stores/CurrentUserStore'
import Header             from './components/Header'
import Footer             from './components/Footer'

const propTypes = {
  params: React.PropTypes.object,
  query: React.PropTypes.object,
  children: React.PropTypes.oneOfType([
    React.PropTypes.array,
    React.PropTypes.object
  ])
}

class App extends React.Component {

  componentWillMount() {
    console.log('About to mount App')
  }

  renderChildren() {
    return React.cloneElement(this.props.children, {
      params: this.props.params,
      query: this.props.query,
      currentUser: this.state.currentUser
    })
  }

  render() {
    return (
      <div style={{height: '5000px'}}>
        <Header />

        {/* this.renderChildren() */}

        <Footer />

      </div>
    )
  }

}
App.propTypes = propTypes

export default App
