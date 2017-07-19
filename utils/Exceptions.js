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

// TBD: APIError

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
    }

}
