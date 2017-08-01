// refactor: use readdir-loader!?!?!?!?
// see ./dynamic_fixtures_BAK.js (fails because karma runs in webpack => no 'fs' module)
import items from './items'

const fixtures = {
    items
}

export default fixtures
