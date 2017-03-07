'use strict'

import React     from 'react'
import TestUtils from 'react-addons-test-utils'

import Header    from '../../app/js/components/Header'

describe('Component: Header', () => {
    it('should render properly', () => {
        const header = TestUtils.renderIntoDocument(
            <Header />
    )

        TestUtils.findRenderedDOMComponentWithTag.bind(null, header, 'header').should.not.throw()
    })
})
