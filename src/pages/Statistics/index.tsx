import {View} from 'react-native'
import React from 'react'
import {navigate} from "@/helpers/navigation";
import {Button} from '@androxxe/andrio-ui'

const Statistics = () => {
    return (
        <View className={"p-5"}>
            <Button onPress={() => navigate('StatisticDetail')}>Statistic Detail</Button>
        </View>
    )
}

export default Statistics