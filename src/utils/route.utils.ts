function getActiveTab(pathname: string) {
    if (pathname.startsWith('/home')) return '/home'
    if (pathname.startsWith('/calendario')) return '/calendario'
    if (pathname.startsWith('/finanzas')) return '/finanzas'
    if (pathname.startsWith('/tareas')) return '/tareas'
    if (pathname.startsWith('/ajustes')) return '/ajustes'

    return pathname
}

export {
    getActiveTab
}
