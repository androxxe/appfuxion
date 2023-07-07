import React, {ScrollView, Text, View} from "react-native";
import useWebsocket from "@/hooks/useWebsocket";
import {websockets} from "@/services/websockets";

const Home = () => {
    const {data: cryptofacilities, isOpen: isOpenCryptofacilities} = useWebsocket(websockets.cryptofacilities, {
        "event": "subscribe",
        "feed": "trade",
        "product_ids": ["PI_XBTUSD"]
    })
    const {data: tradernet, isOpen: isOpenTradernet} = useWebsocket(websockets.tradernet, ["markets"])

    return (
        <ScrollView className="p-5 space-y-4">
            <View className={"bg-white shadow-sm rounded-lg px-4 py-3"}>
                <Text className={"font-bold mb-2"}>
                    Connection 1:
                </Text>
                <Text className={"text-xs"}>{JSON.stringify(cryptofacilities)}</Text>
            </View>

            <View className={"bg-white shadow-sm rounded-lg px-4 py-3"}>
                <Text className={"font-bold mb-2"}>
                    Connection 2:
                </Text>
                <Text className={"text-xs"}>{JSON.stringify(tradernet)}</Text>
            </View>
        </ScrollView>
    );
};

export default Home;
