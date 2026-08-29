import { useState, type ReactNode } from 'react'
import type { Selection } from '@heroui/react'
import type { Core } from '../../definitions/types.ts'
import { CoreContext } from './core.context.ts'
import coreService from '../../services/core.service.ts'

function CoreProvider({ children }: { children: ReactNode }) {
    const [cores, setCores] = useState<Core[]>([])
    const [core, setCore] = useState<Selection>(new Set())

    async function refreshCores() {
        return coreService
            .getUserCores()
            .then(({ data }) => setCores(data))
            .catch((error) => console.error(error))
    }

    return (
        <CoreContext value={{ cores, setCores, core, setCore, refreshCores }}>
            {children}
        </CoreContext>
    )
}

export {
    CoreProvider
}
