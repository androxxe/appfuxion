import {View} from 'react-native'
import React from 'react'
import Select from "@/components/Select";
import i18n, {availableLanguages} from "@/translations/i18n";

const Profile = () => {
    return (
        <View className={"p-5"}>
            <Select
                label={"Choose Language"} buttonPlaceholder={"Choose Language"}
                data={Object.keys(availableLanguages).map((lang: string) => availableLanguages[lang])}
                onSelect={(data: string) => {
                    i18n.changeLanguage('id')
                    // i18n.changeLanguage(Object.entries(availableLanguages)
                    //     .find(([key, value]) => value === data)[0]);
                }}
            />
        </View>
    )
}

export default Profile