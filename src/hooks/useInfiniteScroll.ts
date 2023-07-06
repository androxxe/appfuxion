import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import {
    InfiniteScrollPayloadType,
    InfiniteScrollPropsType,
    InfiniteScrollReturnType
} from '../types/hooks/useInfiniteScroll'
import useGET from "@/hooks/useGET";

const useInfiniteScroll = (props: InfiniteScrollPropsType): InfiniteScrollReturnType => {
    const { extendsPayload, baseEndpoint } = props

    const [refreshing, setRefreshing] = useState(false)
    const [search, setSearch] = useState<string | undefined>('')
    const [data, setData] = useState({ data: [] })
    const [isEnd, setIsEnd] = useState(false)
    const [isRefresh, setIsRefresh] = useState(false)


    const [payload, setPayload] = useState<InfiniteScrollPayloadType>({
        page: 1,
        take: 10,
        search: '',
        ...extendsPayload
    })

    const {
        data: dataAPI,
        loading: loadingAPI,
        refetch: refetchAPI,
        error: errorAPI
    }: any = useGET(() => baseEndpoint(payload))

    useEffect(() => {
        if (dataAPI) {
            if (dataAPI.data.length === 0 && payload.page !== 1) {
                setIsEnd(true)
            }
        }
    }, [dataAPI])

    useEffect(() => {
        if (!errorAPI) {
            getBookingData(false)
        }
    }, [payload])
    // }, [payload.timeFrom, payload.timeTill, payload.page])


    useEffect(() => {

        if (!errorAPI) {
            if (refreshing && payload.page === 1) {

                getBookingData(true)
            } else if (payload.search !== '' || payload.page === 1) {

                getBookingData(true)
            }
        }
    }, [payload.page, payload.search, refreshing])

    useEffect(() => {
        if (isEnd || !dataAPI || loadingAPI) {
            return
        }

        if (isRefresh) {
            setData(dataAPI)
        } else {
            setData({ ...data, ...dataAPI, data: [...data.data, ...dataAPI.data] })
        }
    }, [dataAPI, isRefresh, isEnd, loadingAPI])

    const onEndReached = () => {
        if (loadingAPI || isEnd) return true

        setPayload({ ...payload, page: payload.page + 1 })
    }

    const getBookingData = async (refreshing: boolean): Promise<void> => {
        if (loadingAPI || isEnd) return Promise.resolve()
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
        const { text } = event.nativeEvent
        setSearch(text)
        setIsEnd(false)
        setPayload({ ...payload, search: text, page: 1 })
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
        loading: loadingAPI
    }
}

export default useInfiniteScroll