import React from "react";
import { View, StyleSheet , ActivityIndicator} from "react-native";
import * as SecureStore from 'expo-secure-store';

async function getCreds() {
    let id = await SecureStore.getItemAsync("NavtunId");
    let password = await SecureStore.getItemAsync("NavtunPass");
    if (id && password) {
        return true
    } else {
        return false
    }
}

const Loading = ({navigation}) => {
    React.useEffect(() =>{
        getCreds().then(response => {
            let TMP = response
            if(TMP == true){
                navigation.navigate("Home")
            }else{
                navigation.navigate("Login")
            }
        });
    }, [navigation] )

    return (
        <View style={styles.background}>
            <ActivityIndicator size={100} color="#0000ff"/>
        </View>
    )
}

const styles = StyleSheet.create({
    background:{
        backgroundColor: "#48d1cc",
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
    }
})

export default Loading