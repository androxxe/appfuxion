import { useEffect, useState } from 'react'

type useGetResponse = {
    data: any
    isLoading: boolean
    error: Error | unknown
    refetch: () => void
}

export default function useGET<T>(
    endpoint: any,
    dependencies: any = [],
    autoStart = true
): useGetResponse {
    const [data, setData] = useState<T | undefined>()
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [error, setError] = useState<Error | null | unknown>(null)

    const fetchData = async () => {
        setIsLoading(true)
        try {
            const res = await endpoint()
            setData(res as T)
            setIsLoading(false)
            setError(null)
        } catch (err) {
            setError(err)
            setIsLoading(false)
        }
    }

    useEffect(() => {
        if (autoStart) {
            fetchData()
        }
    }, dependencies)

    const refetch = () => {
        fetchData()
    }

    return { data, isLoading, error, refetch }
}
