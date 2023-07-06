import Home from "@/pages/Home";
import Profile from "@/pages/Profile";
import Statistics from "@/pages/Statistics";
import {t} from "i18next";
import {createStackNavigator} from "@react-navigation/stack";

const Stack = createStackNavigator();

export default function MainTab() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={Home} options={{
                lazy: true,
                title: t('navigation.home')
            }}/>
            <Stack.Screen name="Statistics" component={Statistics} options={{
                title: t('navigation.statistics')
            }}/>
            <Stack.Screen name="Profile" component={Profile} options={{
                title: t('navigation.profile')
            }}/>
        </Stack.Navigator>
    );
}
