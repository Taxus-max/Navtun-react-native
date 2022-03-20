import React from "react";
import { View, StyleSheet , ActivityIndicator} from "react-native";
import { TouchableOpacity } from "react-native";


const Loading = ({navigation}) => {
    React.useEffect(() =>{
        //check here if user credentials are saved and db is not empty
        var TMP = false
        if(TMP == true){
            navigation.navigate("Home")
        }else{
            navigation.navigate("Login")
        }
    }, [navigation] )

    return (
        <View style={styles.background}>
            <TouchableOpacity
                onPress={() => navigation.navigate("Login")}>
                <ActivityIndicator size={100} color="#0000ff"/>
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
    }
})

export default Loading