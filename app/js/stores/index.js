import TestStore from './TestStore.class'

export const stores = (state = {}) => {
    return {
        test:     new TestStore(state.test)
    }
}

// Initialize actions and state
export default process.env.BROWSER ? stores(window.__STATE) : {}
