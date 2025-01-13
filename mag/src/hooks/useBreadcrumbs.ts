import { useMemo } from "react"
import { UIMatch, useMatches } from "react-router-dom"

interface Crumb extends UIMatch {
	crumb: (data: UIMatch | unknown) => React.ReactNode
}

export const useBreadcrumbs = (blockOneCrumb: boolean) => {
	const matches = useMatches()
    const crumbs = useMemo(() => {
		return matches
			.filter(match => Boolean((match.handle as Crumb)?.crumb))
			.map(match => (match.handle as Crumb)?.crumb(match.data))
	}, [matches])
    if(matches.length === 1 && blockOneCrumb) return null
    return crumbs as unknown as React.ReactNode[]
}