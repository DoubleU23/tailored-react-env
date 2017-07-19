import objectAssign from '../../../utils/objectAssign'

const getInitialState = () => {
    const clientState = process.env.IS_BROWSER
        // tbd: refactor: localStorage engine + engineKey in appConfig
        ? localStorage.getItem('testLocalStorage')
        // refactor: what to do on serverSide?
        : {}

    const initialState = {
        'initVar1': 'foo',
        'initVar2': 'bar'
    }

    return objectAssign({}, initialState, clientState)
}

export default getInitialState()
