import {createStackNavigator} from "@react-navigation/stack";
import MainTab from "@/routes/MainTab";
import {NavigationContainer} from "@react-navigation/native";
import StatisticDetail from "@/pages/StatisticDetail";
import {navigationRef} from "@/helpers/navigation";

const MainStack = createStackNavigator();

export default function MainRoute(): JSX.Element {
    return (
        <NavigationContainer ref={navigationRef}>
            <MainStack.Navigator
                screenOptions={{
                    headerShown: false,
                }}
            >
                <MainStack.Screen name="MainTab" component={MainTab}/>
                <MainStack.Screen name="StatisticDetail" component={StatisticDetail}/>
            </MainStack.Navigator>
        </NavigationContainer>
    );
}
