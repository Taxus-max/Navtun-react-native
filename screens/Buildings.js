import React from "react";
import {Text, View, Image, StyleSheet} from 'react-native';

const Buildings = () =>{
    return(
        <View style={styles.background}>
            <Text>Menu</Text>
            <Image
                style={styles.map}
                source={require("../assets/logo.png")}/>
        </View>
    )
}

const styles = StyleSheet.create({
    background: {
        backgroundColor: "#48d1cc",
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
    },
    map: {
    }
})
export default Buildings