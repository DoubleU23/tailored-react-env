import BenefitsStore from './BenefitsStore.class'
import MessageStore  from './MessageStore.class'

import initialState  from './initialState'

export const computeStore = (state = {}) => {
    return {
        messages: new MessageStore(state.messages).messages,
        benefits: new BenefitsStore(state.benefits)
    }
}

// Initialize actions and state
export default computeStore(initialState)
