import path from 'path'

const rootDir       = path.join(__dirname, '..')
const paths = {
    ROOT:           rootDir,
    stack:          path.normalize(path.join(rootDir, 'stack')),
    server:         path.normalize(path.join(rootDir, 'stack', 'server')),
    testServer:     path.normalize(path.join(rootDir, 'stack', 'server', 'test')),
    api:            path.normalize(path.join(rootDir, 'stack', 'server', 'api')),
    fixtures:       path.normalize(path.join(rootDir, 'stack', 'server', 'api', 'fixtures')),
    app:            path.normalize(path.join(rootDir, 'app')),
    data:           path.normalize(path.join(rootDir, 'app', 'data')),
    src:            path.normalize(path.join(rootDir, 'app', 'js')),
    configs:        path.normalize(path.join(rootDir, 'config')),
    build:          path.normalize(path.join(rootDir, 'build')),
    tests:          path.normalize(path.join(rootDir, '__tests__')),
    coverage:       path.normalize(path.join(rootDir, '__coverage__')),
    nodeModules:    path.normalize(path.join(rootDir, 'node_modules'))
}

export default paths
