'use strict'

import ReactDOM    from 'react-dom'
import TestUtils   from 'react-addons-test-utils'

import TestHelpers from '../../utils/testHelpers'
import HomePage    from '../../app/js/pages/HomePage'

describe('Page: Home', () => {
    this.timeout(5000)

    beforeEach(done => {
        this.container = document.createElement('div')

        TestHelpers.testRouteHandler('/', {}, {}, {}, HomePage, this.container, component => {
            this.page = component
            sandbox.restore()
            done()
        })
    })

    it('should render properly', () => {
        TestUtils.findRenderedDOMComponentWithClass.bind(null, this.page, 'home-page').should.not.throw()
    })

    afterEach(() => {
        if (this.container) { ReactDOM.unmountComponentAtNode(this.container) }
    })
})
