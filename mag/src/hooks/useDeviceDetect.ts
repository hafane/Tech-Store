import { useEffect, useMemo, useState } from "react"

type ReturnType = {
    isMobile: boolean
}

export const useDeviceDetect = (): ReturnType => {
    const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth <= 768)

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 768)
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    return useMemo(() => ({
        isMobile
    }), [isMobile])
}

export default useDeviceDetect