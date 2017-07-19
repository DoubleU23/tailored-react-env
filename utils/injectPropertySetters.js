// refactor: shove into npm package!
//
// defineSubSetters(objectKey) {
//     const that              = this
//     this[objectKey]         = {}
//     const objectKeyReal     = '_' + objectKey
//     const objectReal        = this[objectKeyReal]

//     Object.keys(objectReal).forEach(propertyKey => {
//         Object.defineProperty(this[objectKey], propertyKey, {
//             get: function() {
//                 if (process.env.DEBUG) {
//                     console.log('[ViewStore->get objectKey.' + propertyKey + '] returns', that[objectKeyReal][propertyKey])
//                 }
//                 return that[objectKeyReal][propertyKey]
//             },
//             set: function(value) {
//                 if (process.env.DEBUG) {
//                     console.log('[ViewStore->set objectKey.' + propertyKey + '] value', value)
//                 }
//                 that[objectKeyReal][propertyKey] = value
//             }
//         })
//     })
// }
