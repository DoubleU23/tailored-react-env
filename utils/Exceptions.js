// extension preset
class ExtendableError extends Error {

    constructor(message) {
        super(message)
        this.name = this.constructor.name
        // This will print the custom error in the stack, and not the generic Error
        this.message = message
        // Capture the current stacktrace and remove 'ExtendableError' from the stacktrace
        // Read More: https://code.google.com/p/v8-wiki/wiki/JavaScriptStackTraceApi#Stack_trace_collection_for_custom_exceptions
        if (typeof Error.captureStackTrace === 'function') { // keep it isomorphic
            Error.captureStackTrace(this, this.constructor.name)
        }
        else {
            this.stack = (new Error(message)).stack
        }
    }

}

/**
 *  Class APIError
 *  to throw an Error for bad API Responses (not 200)
 *  gets error msg from 'intl' with backup to Responses statusText
 *
 *  @dependecy {function} getState (got it from the action)
 *  @usedBy async API
 */
export class APIError extends ExtendableError {

    /**
     * APIError::constructor
     * @param  {Response}   Response - a Response Object (status)
     * @param  {function}   getState (got it from the action)
     */
    constructor(message, additionalData) {
        super(message)

        this.message = message
        this.type = additionalData.type || 'API'
        this.name = 'APIError'
        this.error = true
        additionalData.forEach((data, index) => {
            this[index] = data
        })
    }

}

/**
 *  class TimeoutError
 *   gets thrown in '/common/lib/timeout' to indicate ServerTimeout
 */
export class TimeoutError extends ExtendableError {

    /**
     * TimeoutError::constructor
     * @param  {string} message - error message
     */
    constructor(message) {
        let msg    = message || 'Request Timed out'
        super(msg)
        this.name  = 'TimeoutError'
        this.type  = 'timeout'
        this.error = true
    }

}

// CUSTOM ERROR for custom "fetchAPI"
// will be used as blueprint for network Error
/*
export const throwAPIError = (response, getState, type = 'API') => {
    // type = 'API' || 'session'

    // typeError?
    if (response instanceof Error) {
        console.log('[throwAPIError] response instanceof Error',  response)

        throw response
    }

    // preset msg
    let message
    if (typeof getState === 'function') {
        let state    = getState(),
            {intl}   = state,
            messages = intl instanceof Record
                            ? intl.get('messages')[intl.get('selectedLanguage')]
                     : intl.messages[intl.selectedLanguage] // not needed anymore // kept as fallback

        console.log('messages', messages)

        message      = messages.forms.errors[type][response.status]
                        || response.statusText
    }
    else {
        message      = response.statusText || 'API call failed.'
    }

    const error      = new APIError(message, {response, type})

    console.log('Error: ', error)

    throw error
}
*/
