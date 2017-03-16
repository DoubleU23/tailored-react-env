// let sum = require('./sum.js').default
import React from 'react'

// import {mount, render, shallow} from 'enzyme'

import sum from './sum.js'
import scriptFilter from '../../gulp/util/script-filter.helper.js'

// import TestUtils from 'react-addons-test-utils'

import Footer from '../../app/js/components/Footer.js'
// let test = require('../../gulp/util/script-filter.js')

describe('"firstTest.test.js"', function() {
    it('adds 1 + 2 to equal 3', function() {
        expect(sum(1, 2)).to.equal(3)
    })
    // it('use second if-branch (c === "test")', function() {
    //     expect(sum(1, 2, 'test')).to.equal(1)
    // })
    it('returnValue of sum should be a "number"', function() {
        expect(sum(1, 2)).to.be.a('number')
    })
})

describe('try to render Footer.js', function() {
    it('should render without error', function() {
        const wrapper = mount(<Footer testProp={{foo: 'foo'}} />)
        console.log('wrapper.props()', wrapper.props())
        expect(wrapper.props()).to.be.a('object')
        console.log('wrapper.html()', wrapper.html())

        expect(wrapper.find('span')).to.have.className('testClassName')
    })
})
