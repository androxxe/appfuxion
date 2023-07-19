import {useEffect, useState} from 'react'
import {
    InfiniteScrollPayloadType,
    InfiniteScrollPropsType,
    InfiniteScrollReturnType
} from '../types/hooks/useInfiniteScroll'
import useGET from "@/hooks/useGET";

const useInfiniteScroll = (props: InfiniteScrollPropsType): InfiniteScrollReturnType => {
    const {extendsPayload, baseEndpoint} = props

    const [refreshing, setRefreshing] = useState<boolean>(false)
    const [search, setSearch] = useState<string | undefined>('')
    const [data, setData] = useState({docs: []})
    const [isEnd, setIsEnd] = useState<boolean>(false)
    const [isRefresh, setIsRefresh] = useState<boolean>(false)

    const [payload, setPayload] = useState<InfiniteScrollPayloadType>({
        page: 1,
        q: '',
        ...extendsPayload
    })

    const {
        data: dataAPI,
        isLoading: isLoadingAPI,
        refetch: refetchAPI,
        error: errorAPI
    }: any = useGET(() => baseEndpoint(payload))

    useEffect(() => {
        if (errorAPI) {
            console.log(JSON.stringify(errorAPI, null, 2))
            alert(JSON.stringify(errorAPI.message))
        }
    }, [errorAPI])

    useEffect(() => {
        if (dataAPI) {
            if (dataAPI.response.docs.length === 0 && payload.page !== 1) {
                setIsEnd(true)
            }
        }
    }, [dataAPI])

    useEffect(() => {
        if (!errorAPI) {
            getData(false)
        }
    }, [payload.page])

    useEffect(() => {
        if (!errorAPI) {
            if (refreshing && payload.page === 1) {
                getData(true)
            } else if (payload.q !== '' || payload.page === 1) {
                getData(true)
            }
        }
    }, [payload.page, payload.q, refreshing])

    useEffect(() => {
        if (isEnd || !dataAPI || isLoadingAPI) {
            return
        }

        if (isRefresh) {
            // console.log('useEffect 2 unexpec', dataAPI)
            setData(dataAPI.response)
        } else {
            // console.log('useEffect', dataAPI)
            setData({...data, ...dataAPI.response, docs: [...data.docs, ...dataAPI.response.docs]})
        }
    }, [dataAPI, isRefresh, isEnd, isLoadingAPI])

    const onEndReached = () => {
        if (isLoadingAPI || isEnd) return true

        setPayload({...payload, page: payload.page + 1})
    }

    const getData = async (refreshing: boolean): Promise<void> => {
        if (isLoadingAPI || isEnd) return Promise.resolve()
        setIsRefresh(refreshing)
        await refetchAPI()
        setRefreshing(false)
        return Promise.resolve()
    }

    const onRefresh = () => {
        setRefreshing(true)
        setIsEnd(false)
        setPayload({
            ...payload,
            page: 1
        })
    }

    const onSubmitEditing = (event: any) => {
        console.log('onSubmitEdditing')
        const {text} = event.nativeEvent
        setSearch(text)
        setIsEnd(false)
        setPayload({...payload, q: text, page: 1})
    }

    const onEditing = (value: string | undefined) => {
        setSearch(value)
    }

    return {
        refreshing,
        payload,
        data,
        onRefresh,
        onSubmitEditing,
        onEndReached,
        setPayload,
        onEditing,
        search,
        isLoading: isLoadingAPI
    }
}

export default useInfiniteScroll