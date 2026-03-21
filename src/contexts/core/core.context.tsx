import { createContext, useState, type ReactNode } from 'react'
import type { Selection } from '@heroui/react'
import type { CoreContextType } from '../../definitions/types'

const CoreContext = createContext<CoreContextType | null>(null)

function CoreProviderWrapper({ children }: { children: ReactNode }) {
    const [core, setCore] = useState<Selection>(new Set())

    return (
        <CoreContext.Provider value={{ core, setCore }}>
            {children}
        </CoreContext.Provider>
    )
}

export {
    CoreContext,
    CoreProviderWrapper
}
