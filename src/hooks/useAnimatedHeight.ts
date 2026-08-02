import { useEffect, useRef, useState, type CSSProperties } from 'react'

function useAnimatedHeight<T extends HTMLElement>() {
    const ref = useRef<T>(null)
    const [height, setHeight] = useState<number | 'auto'>('auto')

    useEffect(() => {
        const element = ref.current
        if (!element) return

        const resizeObserver = new ResizeObserver(([entry]) => setHeight(entry.contentRect.height))
        resizeObserver.observe(element)

        return () => resizeObserver.disconnect()
    }, [])

    const style: CSSProperties = {
        height,
        overflow: 'hidden' as const,
        transition: 'height 300ms cubic-bezier(0.4, 0, 0.2, 1)'
    }

    return { ref, style }
}

export {
    useAnimatedHeight
}
