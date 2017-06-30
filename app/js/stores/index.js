import BenefitsStore from './BenefitsStore'
import initialState  from './initialState'

export const computeStore = (state = {}) => {
    return {
        benefits: new BenefitsStore(state.test)
    }
}

// Initialize actions and state
export default computeStore(initialState)
