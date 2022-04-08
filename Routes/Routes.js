import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from "../screens/Login"
import Home from "../screens/Home"
import Loading from "../screens/Loading"
import Buildings from "../screens/Buildings";

const Stack = createNativeStackNavigator();

const Routes = () =>(
    <NavigationContainer>
        <Stack.Navigator
            screenOptions = {{
            headerShown: false
            
            }}
        >
            <Stack.Screen name="Buildings" component={Buildings}/>
            <Stack.Screen name="Home" component={Home}/>
            <Stack.Screen name="Loading" component={Loading}/>
            <Stack.Screen name="Login" component={Login}/>




            

      </Stack.Navigator>
    </NavigationContainer>
)

export default Routes