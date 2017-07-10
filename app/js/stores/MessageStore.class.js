import axiosWrapped   from '../../../utils/axiosWrapped'
import {TimeoutError} from '../../../utils/Exceptions'

import {
    observable,
    extendObservable,
    action
}                     from 'mobx'

import appConfig      from '../../../config/appConfig'

import messagesAll    from '../../data/messages'

const {
    api: {base: apiBase, endpoints: {benefits: benefitsEndpoint}}
} = appConfig

export default class MessageStore {

    constructor(state = {}) {
        const lang = state.lang || 'de'
        const messages = messagesAll[lang]

        extendObservable(this, {
            // TBD: get default lang per browser setting!?
            lang:       lang,
            messages:   observable(messages)
        }, state)
    }

}
