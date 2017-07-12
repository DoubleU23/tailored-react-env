import axios     from 'axios'

import timeout   from './timeout'
import appConfig from '../config/appConfig'

const {
    timings: {timeout: requestTimeout}
} = appConfig

// Add a request interceptor
axios.interceptors.request.use(function(config) {
    // Do something before request is sent
    return config
}, function(error) {
    if (process.env.DEBUG) {
        console.log('[axios.interceptors.request.use] ', error)
    }
    // Do something with request error
    return Promise.reject(error)
})

// Add a response interceptor
axios.interceptors.response.use(function(response) {
    // Do something with response data
    return response
}, function(error) {
    if (process.env.DEBUG) {
        console.log('[axios.interceptors.response.use] ', error)
    }
    // Do something with response error
    return Promise.reject(error)
})

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
                return error
            })
            .then(response => {
                if (process.env.DEBUG) {
                    console.log('[axios.apply->then(response)]', response)
                }
                // throw to timeout.catch
                return response
            })
    )
        .catch(responseOrError => {
            if (process.env.DEBUG) {
                console.log('[axiosWrapped->catch(responseOrError)] ', responseOrError)
            }
            return responseOrError
        })
}

export default axiosWrapped
