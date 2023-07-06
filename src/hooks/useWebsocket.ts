import {useFocusEffect} from "@react-navigation/native";
import {useCallback, useState} from "react";
import {useWebsocketRes} from "@/types/hooks/useWebsocket";

export default function useWebsocket(WebSocketsURL: string): useWebsocketRes {
    const [data, setData] = useState<any>({});
    const [errors, setErrors] = useState('')
    const [isLoading, setIsLoading] = useState<boolean>(true)

    useFocusEffect(
        useCallback(() => {
            const ws: WebSocket = openWebsocket();

            return () => {
                ws.close();
            };
        }, [])
    );


    const openWebsocket = () => {
        const ws = new WebSocket(WebSocketsURL);
        ws.onopen = function () {
            // ws.send(JSON.stringify(["markets"]));
            console.log("Connected to WS");
        };

        ws.onmessage = function (m: MessageEvent<any>): void {
            // const [event, response] = JSON.parse(m.data);
            // console.log("onmessage");
            setData(m.data)
            console.log('onmessage', m)
        };

        ws.onclose = function (e: CloseEvent): void {
            console.log("sockets closed", e);
        };

        ws.onerror = function (error: Event): void {
            setErrors(error)
            console.log("Sockets.error: ", error);
            ws.close();
        };

        return ws;
    };

    return {data, isLoading, errors}
}