import axios     from 'axios'

import timeout   from './timeout'
import appConfig from '../config/appConfig'

const {
    timings: {timeout: requestTimeout}
} = appConfig

const axiosWrapped = (method, url, options) => {
    return timeout(requestTimeout,

        // refactor: avoid axiosWrapped(false, false, {
        (!!method && !!url
            ? axios.apply(method, [url, options])
            : axios(options)
        )
            // TBD: special handling of network errors
            .catch(networkError => {
                // pass networkError to "catch(timeoutOrNetworkError)""
                throw networkError
            })
            // no NetworkError => return value to await receiver
            .then(successedRequestResponse => successedRequestResponse)
    )
        // return timeoutOrNetworkError to await receiver
        // tbd: handle errors globally!?
        .catch(timeoutOrNetworkError => timeoutOrNetworkError)
}

export default axiosWrapped
