import { createContext, useState, type ReactNode } from 'react'
import type { Selection } from '@heroui/react'
import type { Core, CoreContextType } from '../../definitions/types'
import coreService from '../../services/core.service'

const CoreContext = createContext<CoreContextType | null>(null)

function CoreProviderWrapper({ children }: { children: ReactNode }) {
    const [cores, setCores] = useState<Core[]>([])
    const [core, setCore] = useState<Selection>(new Set())

    async function refreshCores() {
        coreService
            .getUserCores()
            .then((res) => setCores(res.data))
            .catch((error) => console.error(error))
    }

    return (
        <CoreContext.Provider value={{ cores, setCores, core, setCore, refreshCores }}>
            {children}
        </CoreContext.Provider>
    )
}

export {
    CoreContext,
    CoreProviderWrapper
}
