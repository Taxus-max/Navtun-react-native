import React from "react";
import {View, Text, TouchableOpacity, StyleSheet} from "react-native";
import dbhandler from "../utils/dbhandler";
import * as SecureStore from 'expo-secure-store';

const logout = ({navigation}) =>{
    SecureStore.deleteItemAsync("NavtunId");
    SecureStore.deleteItemAsync("NavtunPass");
    dbhandler.dropTable();
    navigation.navigate("Home");
    navigation.navigate("Login");
}

const Settings = ({navigation}) => {
    return (
        <View style={styles.background}>
            <TouchableOpacity style={styles.logout} onPress={()=> logout({navigation})}>
                <Text style={{fontSize: 20}}>
                    Logout
                </Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    background:{
        backgroundColor: "#48d1cc",
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
    },
    logout:{
        backgroundColor: "red",
        padding: 10,
        borderRadius: 3,
    }
})

export default Settings