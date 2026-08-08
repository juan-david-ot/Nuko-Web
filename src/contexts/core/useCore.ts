import { useContext } from 'react'
import { CoreContext } from './core.context.tsx'

function useCore() {
    const context = useContext(CoreContext)

    if (!context) {
        throw new Error('useCore must be used inside CoreProviderWrapper')
    }

    return context
}

export {
    useCore
}
