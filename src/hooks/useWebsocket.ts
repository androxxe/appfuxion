import {useFocusEffect} from "@react-navigation/native";
import {useCallback, useState} from "react";
import {useWebsocketRes} from "@/types/hooks/useWebsocket";

export default function useWebsocket(WebSocketsURL: string, sendData: any): useWebsocketRes {
    const [data, setData] = useState<any>({});
    const [errors, setErrors] = useState('')
    const [isOpen, setIsOpen] = useState(false)

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
            if (sendData) {
                ws.send(JSON.stringify(sendData));
            }
            setIsOpen(true)
            console.log("Connected to WS");
        };

        ws.onmessage = function (m: MessageEvent<any>): void {
            setData(m.data)
            console.log('onmessage')
        };

        ws.onclose = function (e: CloseEvent): void {
            setIsOpen(false)
            console.log("sockets closed", e);
        };

        ws.onerror = function (error: Event): void {
            setIsOpen(false)
            setErrors(error as any)
            console.log("Sockets.error: ", error);
            ws.close();
        };

        return ws;
    };

    return {data, errors, isOpen}
}