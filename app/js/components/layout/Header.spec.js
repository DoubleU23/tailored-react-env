/* global it:false, describe:false */
'use strict'

import React            from 'react'
import {shallow}        from 'enzyme'
import {expect}         from 'chai'

import MessageStore     from '../../stores/MessageStore.class'
import Header           from './Header'

import AppBar    from 'material-ui/AppBar'

const messageStore = new MessageStore()

describe('[SPEC] Component: Header', () => {
    it('should render properly', () => {
        const wrapper = shallow(<Header messages={messageStore.messages} />)

        expect(wrapper.find(Header)).to.exist

        expect(wrapper.find('header')).to.exist
        expect(wrapper.find(AppBar)).to.exist
    })
})
