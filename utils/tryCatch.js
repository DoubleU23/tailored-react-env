export default function tryCatch(tryFn, catchFn) {
    try {
        tryFn.call()
    }
    catch (err) {
        if (typeof catchFn === 'function') {
            catchFn.call(err)
        }
    }
}
