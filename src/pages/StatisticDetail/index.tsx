import {Text, View} from 'react-native'
import React from 'react'
import Header from "@/components/Header";
import {t} from "i18next";

const Statistics = () => {
    return (
        <View>
            <Header title={t('navigation.statisticsDetail')}/>
            <Text>Statistics Detail</Text>
        </View>
    )
}

export default Statistics