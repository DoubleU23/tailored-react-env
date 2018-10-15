import {autorun} from 'mobx'

export default function({testStore}) {
    // Update document title whenever it changes
    autorun(() => {
        if (testStore) {
            console.log('test')
            document.title = testStore.foo
        }
    })
}
