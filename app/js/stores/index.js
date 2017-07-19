import BenefitsStore    from './BenefitsStore.class'
import MessageStore     from './MessageStore.class'
import ViewStore        from './ViewStore.class'

import initialState     from './initialState'

export const computeStore = (state = {}) => {
    return {
        messages:   new MessageStore(state.messages).messages,
        benefits:   new BenefitsStore(state.benefits),
        view:       new ViewStore(state.view)
    }
}

// Initialize Stores with initialState
export default computeStore(initialState)
