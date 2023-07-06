import {Platform, Text, TouchableOpacity, View} from "react-native";
import React from "react";
import {Feather} from "@expo/vector-icons";
import {goBack} from "@/helpers/navigation";
import Constants from "expo-constants";

type HeaderPropsType = {
    title: string;
    showGoBack?: boolean;
    showProfile?: boolean;
    showNotification?: boolean;
    handleGoBack?: any;
};

const Header = (props: HeaderPropsType) => {
    const {
        title,
        showGoBack = true,
        handleGoBack = () => goBack(),
    } = props;

    return (
        <View
            style={{
                paddingTop: Platform.OS === "ios" ? Constants.statusBarHeight : 0,
            }}
            className="bg-indigo-600"
        >
            <View className="bg-indigo-600 py-4 px-4 flex flex-row space-x-4 items-center justify-between">
                <View className="flex flex-1 flex-row items-center space-x-2">
                    {showGoBack && (
                        <TouchableOpacity onPress={handleGoBack}>
                            <Feather name="arrow-left" size={24} color="white"/>
                        </TouchableOpacity>
                    )}
                    <Text className="text-white text-lg font-bold">{title}</Text>
                </View>
            </View>
        </View>
    );
};

export default Header;
