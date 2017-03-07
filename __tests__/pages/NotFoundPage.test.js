'use strict'

import ReactDOM     from 'react-dom'
import TestUtils    from 'react-addons-test-utils'

import TestHelpers  from '../testHelpers'
import NotFoundPage from '../../app/js/pages/NotFoundPage'

describe('Page: Not Found', function() {
    this.timeout(5000)

    beforeEach(done => {
        this.container = document.createElement('div')

        TestHelpers.testRouteHandler('/', {}, {}, {}, NotFoundPage, this.container, component => {
            this.page = component
            sandbox.restore()
            done()
        })
    })

    it('should render properly', () => {
        TestUtils.findRenderedDOMComponentWithClass.bind(null, this.page, 'not-found-page').should.not.throw()
    })

    afterEach(() => {
        if (this.container) { ReactDOM.unmountComponentAtNode(this.container) }
    })
})
