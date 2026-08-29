import { createContext } from 'react'
import type { CoreContextType } from '../../definitions/types.ts'

const CoreContext = createContext<CoreContextType | null>(null)

export {
    CoreContext
}
