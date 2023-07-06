import {View} from 'react-native'
import React from 'react'
import Button from "@/components/Button";
import {navigate} from "@/helpers/navigation";

const Statistics = () => {
    return (
        <View className={"p-5"}>
            <Button onPress={() => navigate('StatisticDetail')}>Statistic Detail</Button>
        </View>
    )
}

export default Statistics