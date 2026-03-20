import { useEffect, useState } from 'react'

function useMediaQuery(query: string) {
    const [matches, setMatches] = useState(() => window.matchMedia(query).matches)

    useEffect(() => {
        const media = window.matchMedia('(min-width: 64rem)')

        const listener = (e: MediaQueryListEvent) => setMatches(e.matches)
        media.addEventListener('change', listener)

        return () => media.removeEventListener('change', listener)
    }, [])

    return matches
}

export {
    useMediaQuery
}
