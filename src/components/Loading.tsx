import { Spinner } from '@heroui/react'

function Loading() {
    return (
        <div className="w-full h-full flex items-center justify-center">
            <Spinner size="xl" />
        </div>
    )
}

export default Loading
