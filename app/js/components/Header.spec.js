/* global it:false, describe:false */
// refactor: pls give me da feature!!! https://github.com/eslint/eslint/issues/3611
'use strict'

import React     from 'react'
import Header    from './Header'

describe('[SPEC] Component: Header', () => {
    it('should render properly', () => {
        const wrapper = global.mount(<Header />)

        global.expect(wrapper.find(Header)).to.exist
    })
})
