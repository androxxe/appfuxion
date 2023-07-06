import React, {Text, View} from "react-native";
import useWebsocket from "@/hooks/useWebsocket";
import {websockets} from "@/services/websockets";

const Home = () => {
    const {data: tradernet, isLoading: isLoadingTradernet} = useWebsocket(websockets.tradernet)
    const {data: cryptofacilities, isLoading: isLoadingCryptofacilities} = useWebsocket(websockets.cryptofacilities)

    return (
        <View className="p-5 space-y-4">
            <View className={"bg-white shadow-sm rounded-lg px-4 py-3"}>
                <Text className={"font-bold mb-2"}>
                    Connection 1:
                </Text>
                <Text>{JSON.stringify(cryptofacilities)}</Text>
            </View>


            <View className={"bg-white shadow-sm rounded-lg px-4 py-3"}>
                <Text className={"font-bold mb-2"}>
                    Connection 2:
                </Text>
                <Text>{JSON.stringify(tradernet)}</Text>
            </View>
        </View>
    );
};

export default Home;
