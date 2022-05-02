import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from "../screens/Login"
import Loading from "../screens/Loading"
import Buildings from "../screens/Buildings";
import Settings from "../screens/Settings";
import MenuBarBottom from "../screens/MenuBarBottom";

const Stack = createNativeStackNavigator();


const Routes = () =>(
    <NavigationContainer>
        <Stack.Navigator
            screenOptions = {{
            headerShown: false,
            
            }}
        >
            <Stack.Screen name="Loading" component={Loading}/>
            <Stack.Screen name="Login" component={Login}/>
            <Stack.Screen name="Buildings" component={Buildings} options={{animation: "fade_from_bottom"}}/>
            <Stack.Screen name="Settings" component={Settings} options={{animation: "fade_from_bottom"}}/>
            <Stack.Screen name="MenuBarBottom" component={MenuBarBottom} options={{animation: "fade"}}/>

      </Stack.Navigator>
    </NavigationContainer>
)

export default Routes