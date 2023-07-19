import {View} from 'react-native'
import React from 'react'
import Select from "@/components/Select";
import {availableLanguages} from "../../translations/i18n";
import i18n, {TFunction} from "i18next";

const Profile = () => {
    return (
        <View className={"p-5"}>
            <Select
                label={"Choose Language"} buttonPlaceholder={"Choose Language"}
                data={Object.keys(availableLanguages).map((lang: string) => availableLanguages[lang])}
                onSelect={(data: string): void => {
                    i18n.changeLanguage(Object.entries(availableLanguages)
                        .find(([key, value]: [string, string]) => value === data)[0], (err, t: TFunction): void => {
                        if (err) {
                            alert(JSON.stringify(err))
                        }
                    });
                }}
            />
        </View>
    )
}

export default Profile