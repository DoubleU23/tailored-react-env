import {
    observable,
    extendObservable
    // action
}                     from 'mobx'

import messagesAll    from '../../data/messages'

export default class MessageStore {

    constructor(state = {}) {
        // TBD: fix de lang
        // TBD: integrate lang state (and switchFn)
        const lang = state.lang || 'en'
        const messages = messagesAll[lang]

        extendObservable(this, {
            // TBD: get default lang per browser setting!?
            lang:       lang,
            messages:   observable(messages)
        }, state)
    }
    // TBD: @action changeLang(lang)

}
