'use strict'

import APIUtils    from '../../app/js/utils/APIUtils'
import AuthAPI     from '../../app/js/utils/AuthAPI'
import TestHelpers from '../../utils/testHelpers'

describe('Util: AuthAPI', () => {
    const user = TestHelpers.fixtures.user

    it('should make a request to check a user\'s login status', done => {
        let path = 'auth/check'

        sandbox.mock(APIUtils).expects('get').withArgs(path)

        AuthAPI.checkLoginStatus()

        done()
    })

    it('should make a request to login a user', done => {
        let path = 'auth/login'

        sandbox.mock(APIUtils).expects('post').withArgs(path, user)

        AuthAPI.login(user)

        done()
    })

    it('should make a request to log a user out', done => {
        let path = 'auth/logout'

        sandbox.mock(APIUtils).expects('post').withArgs(path)

        AuthAPI.logout()

        done()
    })
})
