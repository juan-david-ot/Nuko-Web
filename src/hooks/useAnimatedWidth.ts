import { useEffect, useRef, useState, type CSSProperties } from 'react'

function useAnimatedWidth<T extends HTMLElement>() {
    const ref = useRef<T>(null)
    const [width, setWidth] = useState<number | 'auto'>('auto')

    useEffect(() => {
        const element = ref.current
        if (!element) return

        const resizeObserver = new ResizeObserver(([entry]) => setWidth(entry.contentRect.width))
        resizeObserver.observe(element)

        return () => resizeObserver.disconnect()
    }, [])

    const style: CSSProperties = {
        width,
        overflow: 'hidden' as const,
        transition: 'width 300ms cubic-bezier(0.4, 0, 0.2, 1)'
    }

    const contentStyle: CSSProperties = {
        display: 'inline-block',
        width: 'max-content'
    }

    return { ref, style, contentStyle }
}

export {
    useAnimatedWidth
}
