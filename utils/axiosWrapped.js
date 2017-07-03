import axios     from 'axios'

import timeout   from './timeout'
import appConfig from '../config/appConfig'

const {
    timings: {timeout: requestTimeout}
} = appConfig

const axiosWrapped = (method, url, options) => {
    // TBD: use wrap axios with timeout
    return timeout(requestTimeout,
        axios
            .apply(method, [url, options])
            // catch first to only get REAL errors
            // (we throw respone in underneath THEN)
            .catch(error => {
                if (process.env.DEBUG) {
                    console.log('[axios.apply->catch(error)] ', error)
                }
                error.error = true
                // throw to timeout.catch
                throw error
            })
            .then(response => {
                if (process.env.DEBUG) {
                    console.log('[axios.apply->then(response)]', response)
                }
                // throw to timeout.catch
                throw response
            })
    )
        .catch(response => {
            if (process.env.DEBUG) {
                console.log('[axiosWrapped->catch(response)] ', response)
            }
            return response
        })
}

export default axiosWrapped
