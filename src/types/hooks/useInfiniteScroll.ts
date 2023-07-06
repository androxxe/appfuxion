import {Dispatch, SetStateAction} from 'react'
import {NativeSyntheticEvent, TextInputSubmitEditingEventData} from 'react-native'

export type InfiniteScrollPayloadType = {
    page: number,
    take: number,
    search: string | undefined,
    [key: string]: any // Index signature for additional keys
}

export type InfiniteScrollPropsType = {
    extendsPayload?: object,
    baseEndpoint: (data: any) => Promise<any>
}

export type InfiniteScrollReturnType = {
    refreshing: boolean,
    payload: object,
    data: any,
    onRefresh: () => void,
    onSubmitEditing: (event: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => void | void,
    onEndReached: () => void,
    setPayload: Dispatch<SetStateAction<InfiniteScrollPayloadType>>,
    search: string | undefined,
    onEditing: (value: string | undefined) => void,
    loading: boolean
}