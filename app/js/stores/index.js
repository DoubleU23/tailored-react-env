import TestStore    from './TestStore.class'
import initialState from './initialState'

export const stores = (state = {}) => {
    return {
        test:     new TestStore(state.test)
    }
}

// Initialize actions and state
export default stores(initialState)
