import Home from "@/pages/Home";
import Profile from "@/pages/Profile";
import Statistics from "@/pages/Statistics";
import {BottomTabHeaderProps, createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {Entypo, Feather, Ionicons} from "@expo/vector-icons";
import colors from 'tailwindcss/colors'
import {Header} from "@androxxe/andrio-ui";
import News from "@/pages/News";
import {useTranslation} from "react-i18next";

type RootBottomTabParamList = {
    Home: undefined;
    Statistics: undefined;
    News: undefined;
    Profile: undefined;
};
const Tab = createBottomTabNavigator<RootBottomTabParamList>();

export default function MainTab() {
    const {t} = useTranslation()
    return (
        <Tab.Navigator screenOptions={{
            header: ({options}: BottomTabHeaderProps) => <Header title={options.title} showGoBack={false}/>
        }}>
            <Tab.Screen name="Home" component={Home} options={{
                lazy: true,
                title: t('navigation.home'),
                tabBarIcon: ({focused, color}) => (
                    <Feather
                        name="home"
                        size={22}
                        color={focused ? colors.blue[600] : colors.slate[500]}
                    />
                ),
            }}/>
            <Tab.Screen name="Statistics" component={Statistics} options={{
                title: t('navigation.statistics'),
                tabBarIcon: ({focused, color}) => (
                    <Ionicons
                        name="stats-chart"
                        size={22}
                        color={focused ? colors.blue[600] : colors.slate[500]}
                    />
                ),
            }}/>
            <Tab.Screen name="News" component={News} options={{
                title: t('navigation.news'),
                tabBarIcon: ({focused, color}) => (
                    <Entypo
                        name="news"
                        size={22}
                        color={focused ? colors.blue[600] : colors.slate[500]}
                    />
                ),
            }}/>
            <Tab.Screen name="Profile" component={Profile} options={{
                title: t('navigation.profile'),
                tabBarIcon: ({focused, color}) => (
                    <Feather
                        name="user"
                        size={22}
                        color={focused ? colors.blue[600] : colors.slate[500]}
                    />
                ),
            }}/>
        </Tab.Navigator>
    );
}
