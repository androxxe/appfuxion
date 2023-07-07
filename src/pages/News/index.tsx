import {ActivityIndicator, FlatList, Text, View} from "react-native";
import {Input} from "@androxxe/andrio-ui";
import {useEffect} from "react";
import {getNewsAPI} from "@/services/endpoints/news";
import {NewsPayload} from "@/types/news";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import {Feather} from "@expo/vector-icons";
import colors from "tailwindcss/colors";

const Card = ({data}) => {
    const {item} = data
    return (
        <View className={"mb-3 px-3 py-3 bg-white rounded-lg shadow space-y-1"}>
            <Text className={"font-bold"}>Abstract</Text>
            <Text className={"mb-2"}>{item.abstract}</Text>
            <Text className={"font-bold"}>Snippet</Text>
            <Text className={"mb-2"}>{item.snippet}</Text>
            <Text className={"font-bold"}>Keywords</Text>
            <View className={"flex-row flex-wrap gap-x-2 gap-y-2"}>
                {
                    item.keywords.map((keyword: any) => (
                        <View className={"bg-orange-500 rounded-full"}>
                            <Text className={"text-xs font-slate-500 text-white px-3 py-1"}>{keyword.value}</Text>
                        </View>
                    ))
                }
            </View>
        </View>
    )
}
export default function News(): JSX.Element {
    const payload: NewsPayload = {
        facet_fields: "day_of_week",
        facet_filter: "true",
        fl: "abstract,web_url,snippet,lead_paragraph,source,word_count,keywords,headline",
        "api-key": "Ivb0pYFlx6ZI551ukQ809H0zQpHUdYA2"
    }

    const {data, isLoading, error, isEnd, onSubmitEditing, onEditing, search, onEndReached} = useInfiniteScroll({
        extendsPayload: payload,
        baseEndpoint: getNewsAPI
    })

    useEffect(() => {
        if (error) {
            alert(JSON.stringify(error))
        }
    }, [error])

    return (
        <View>
            <FlatList
                ListHeaderComponent={
                    <View>
                        <View className={"p-5 bg-white mb-3"}>
                            <Text className={"mb-3"}>This is Open API From https://api.nytimes.com</Text>
                            <Input
                                placeholder='Search'
                                value={search}
                                onChangeText={onEditing}
                                onSubmitEditing={onSubmitEditing}
                                leftIcon={<Feather name='search' size={20} color='#87878B'/>}
                            />
                        </View>
                    </View>
                }
                data={data.docs}
                renderItem={(data: any) => <Card data={data}/>}
                keyExtractor={(item, index) => `${item.web_url}_${Date.now()}_${index}`}
                onEndReached={onEndReached}
                onEndReachedThreshold={0.5}
                ListFooterComponent={<View>
                    {isLoading &&
                        <ActivityIndicator className={"my-3"} size={"large"} color={colors.blue[500]}/>
                    }
                    {isEnd && (
                        <Text className='text-sm text-center text-slate-500 mb-3'>This is end of data</Text>
                    )}
                </View>}
            />
        </View>
    )
}