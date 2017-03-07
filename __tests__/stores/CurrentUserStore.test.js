'use strict'

import when               from 'when'

import TestHelpers        from '../../utils/testHelpers'
import CurrentUserStore   from '../../app/js/stores/CurrentUserStore'
import CurrentUserActions from '../../app/js/actions/CurrentUserActions'
import AuthAPI            from '../../app/js/utils/AuthAPI'

describe('Store: CurrentUser', () => {
    const user = TestHelpers.fixtures.user

    it('#setUser should set this.user and trigger the store', () => {
        sandbox.mock(CurrentUserStore).expects('trigger').withArgs(null, user).once()
        CurrentUserStore.setUser(user)
    })

    it('#throwError should trigger the store', () => {
        const err = { message: 'Test error' }

        sandbox.mock(CurrentUserStore).expects('trigger').withArgs(err).once()
        CurrentUserStore.throwError(err)
    })

    it('#checkLoginStatus should check user\'s login status on action', () => {
        sandbox.mock(AuthAPI).expects('checkLoginStatus').returns(when(user))
        sandbox.mock(CurrentUserStore).expects('setUser').withArgs(user).once()

        CurrentUserActions.checkLoginStatus()
    })

    it('#loginUser should log user in on action if API response is successful', () => {
        sandbox.mock(AuthAPI).expects('login').withArgs(user).returns(when(user))
        sandbox.mock(CurrentUserStore).expects('setUser').withArgs(user).once()

        CurrentUserActions.login(user)
    })

    it('#logoutUser should log user out on action', () => {
        sandbox.mock(AuthAPI).expects('logout').once().returns(when())
        sandbox.mock(CurrentUserStore).expects('setUser').withArgs(null).once()

        CurrentUserActions.logout()
    })
})
