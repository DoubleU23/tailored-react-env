'use strict'

import React     from 'react'
import TestUtils from 'react-addons-test-utils'

import Footer    from '../../app/js/components/Footer'

describe('Component: Footer', () => {
    it('should render properly', () => {
        const footer = TestUtils.renderIntoDocument(
            <Footer />
    )

        TestUtils.findRenderedDOMComponentWithTag.bind(null, footer, 'footer').should.not.throw()
    })
})
