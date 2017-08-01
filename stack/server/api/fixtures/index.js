import fs    from 'fs'
import path  from 'path'

import appPaths from '../../../../config/paths'

const fixtures = {}

fs.readdirSync(appPaths.fixtures)
    .filter(filename => ~filename.indexOf('.js') && filename !== 'index.js')
    .forEach(filename => {
        const filePath = path.resolve(path.join(appPaths.api, 'fixtures'), filename)
        console.log('filePath', filePath)

        fixtures[filename.split('.')[0]] = require(filePath).default
    })

export default fixtures
