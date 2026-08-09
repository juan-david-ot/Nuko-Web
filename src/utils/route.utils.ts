import { NAV_TABS } from '../definitions/consts'

function getActiveTab(pathname: string) {
    // if (pathname.startsWith('/home')) return '/home'
    // if (pathname.startsWith('/calendario')) return '/calendario'
    // if (pathname.startsWith('/finanzas')) return '/finanzas'
    // if (pathname.startsWith('/tareas')) return '/tareas'
    // if (pathname.startsWith('/ajustes')) return '/ajustes'

    // return pathname
    return NAV_TABS.find(tab => pathname.startsWith(tab)) ?? pathname
}

export {
    getActiveTab
}
