import { useEffect, useState, type ReactNode } from 'react'
import type { Selection } from '@heroui/react'
import type { Core } from '../../definitions/types.ts'
import { CoreContext } from './core.context.ts'
import coreService from '../../services/core.service.ts'

function CoreProvider({ children }: { children: ReactNode }) {
    const [cores, setCores] = useState<Core[]>([])
    const [coreId, setCoreId] = useState<Selection>(new Set())
    const [core, setCore] = useState<Core>()

    async function refreshCores() {
        return coreService
            .getUserCores()
            .then(({ data }) => setCores(data))
            .catch((error) => console.error(error))
    }

    useEffect(() => {
        const selectedCoreId = Array.from(coreId)[0]
        const selectedCore = cores.find((core: Core) => core.id === String(selectedCoreId))
        setCore(selectedCore)

        if (selectedCoreId !== undefined && selectedCoreId !== 'all' && !selectedCore) {
            setCoreId(new Set())
        }
    }, [cores, coreId])

    return (
        <CoreContext value={{ cores, setCores, coreId, setCoreId, core, refreshCores }}>
            {children}
        </CoreContext>
    )
}

export {
    CoreProvider
}
