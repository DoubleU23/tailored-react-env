import ItemsStore       from './ItemsStore.class'
import MessageStore     from './MessageStore.class'
import ViewStore        from './ViewStore.class'

import initialState     from './initialState'

export const computeStore = (state = {}) => {
    return {
        messages:   new MessageStore(state.messages).messages,
        items:      new ItemsStore(state.items),
        view:       new ViewStore(state.view)
    }
}

// Initialize Stores with initialState
export default computeStore(initialState)
