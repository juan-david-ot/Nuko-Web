import { useContext } from 'react'
import { CoreContext } from './core.context'

const useCore = () => {
    const context = useContext(CoreContext)

    if (!context) {
        throw new Error('useTheme must be used inside ThemeProviderWrapper')
    }

    return context
}

export {
    useCore
}
