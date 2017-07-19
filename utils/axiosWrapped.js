import axios     from 'axios'

import timeout   from './timeout'
import appConfig from '../config/appConfig'

const {
    timings: {timeout: requestTimeout}
} = appConfig

const axiosWrapped = (method, url, options) => {
    return timeout(requestTimeout,

        (!!method && !!url
            ? axios.apply(method, [url, options])
            : axios(options)
        )
            .catch(networkError => {
                // TBD: special handling of network errors
                if (process.env.DEBUG) {
                    // console.log('[axios.apply->catch(error)] ', networkError)
                }

                // pass networkError to "catch(timeoutOrNetworkError)""
                throw networkError
            })
            .then(successedRequestResponse => {
                if (process.env.DEBUG) {
                    // console.log('[axios.apply->then(successedRequestResponse)]', successedRequestResponse)
                }

                return successedRequestResponse
            })
    )
        .catch(timeoutOrNetworkError => {
            if (process.env.DEBUG) {
                // console.log('[axiosWrapped->catch(timeoutOrNetworkError)] ', timeoutOrNetworkError)
            }
            return timeoutOrNetworkError
        })
}

export default axiosWrapped
