import { autorun } from 'mobx'

export default function({ test }) {
    // Update document title whenever it changes
    autorun(() => {
        if (test) {
            console.log('test')
            document.title = test
        }
    })
}
