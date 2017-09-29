import Home          from './pages/Home'
import Items         from './pages/Items'

import TestComponent from './components/TestComponent'

const routeTree = {
    home: {
        order:      0,
        title:      'Home',
        route:      '/',
        component:  Home,
        subRoutes:  {}
    },
    items: {
        order:      1,
        title:      'Items',
        route:      '/items',
        component:  Items,
        subRoutes:  {}
    }
}

if (process.env.NODE_ENV !== 'production') {
    routeTree.test = {
        key:        'test',
        route:      '/test',
        title:      'Test Components',
        component:  TestComponent,
        subRoutes:  {}
    }
}

const getRoutesSorted = () => {
    let key, route, routes = []
    for (key in routeTree) {
        route     = routeTree[key]
        route.key = key

        routes.push(route)
        // TBD recursive (+ sorting by order!)
    }

    return routes
}

export const routes = getRoutesSorted() // sorted array

export default routeTree
