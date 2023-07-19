import {Text, View} from 'react-native'
import React from 'react'
import Header from "@/components/Header";
import {useTranslation} from "react-i18next";
import {TFunction} from "i18next";

const Statistics = () => {
    const {t}: { t: TFunction<'translation', undefined> } = useTranslation()

    return (
        <View>
            <Header title={t('navigation.statisticsDetail')}/>
            <Text>Statistics Detail</Text>
        </View>
    )
}

export default Statistics