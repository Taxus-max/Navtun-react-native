import React from "react";
import {
    Text,
    View,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import {FontAwesome,FontAwesome5} from "@expo/vector-icons";
import dateRefactor from "../utils/dateRefactor";
import OpenMap from "react-native-open-map";
import buildings from "../data/buildings.json";
import periodicCheck from "../backgroundProcesses/periodicCheck";


const openMap = (location) =>{
    function getCoordinates(){
        const choppedLocation = location.split(".")[0]
        for(let i = 0;i < buildings.length;i++){
            if(buildings[i].name == choppedLocation){
                return buildings[i].coords
            }
        }
    }

    OpenMap.show(getCoordinates(location))
}

const nextLecture = (calendar) =>{
    if(calendar[1]){
        return(
            <View style={styles.bottomBox}>
                <Text style={{color:"white",fontSize:20}}>Your next lesson:</Text>
                <View style={styles.topBoxInline}>
                    <FontAwesome5 name="book-open" size={20} style={{margin:5}} color="white" />
                    <Text style={styles.bottomBoxText} numberOfLines={3}>{calendar[1].name}</Text>
                </View>
            </View>
        )
    }
}

const Home = ({navigation,calendar}) => {


    return (
        <View style={styles.background}>
            <View style={styles.topBox}>
                <View style={styles.topBoxInline}>
                    <FontAwesome5 name="book-open" size={20} style={{margin:5}} color="white" />
                    <Text style={styles.topBoxText} numberOfLines={3}>{calendar[0].name}</Text>
                </View>
                <View style={styles.topBoxInline}>
                    <FontAwesome5 name="chalkboard-teacher" size={20} style={{margin:5}} color="white" />
                    <Text style={styles.topBoxText} numberOfLines={2}> {calendar[0].lecturer}</Text>
                </View>
                <View style={styles.topBoxInline}>
                    <FontAwesome5 name="clock" size={20} style={{margin:5}} color="white" />
                    <Text style={styles.topBoxText} numberOfLines={1}>  {dateRefactor(calendar[0].start)} - {dateRefactor(calendar[0].end).slice(10)}</Text>
                </View>
                <View style={styles.topBoxInline}>
                    <FontAwesome5 name="building" size={20}  style={{margin:5}} color="white" />
                    <Text style={styles.topBoxText} numberOfLines={1}>  {calendar[0].location}</Text>
                </View>
            </View>
            <View style={styles.boxButton}>
                <TouchableOpacity>
                    <FontAwesome onPress={() => openMap(calendar[0].location)} style={styles.large_icon} name="map"/>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate("Buildings",{location: calendar[0].location})}>
                    <FontAwesome style={styles.large_icon} name="building"/>
                </TouchableOpacity>
            </View>
            {nextLecture(calendar)}
        </View>

    )
}

const styles = StyleSheet.create({
    background: {
        backgroundColor: "#222222",
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
    },
    large_icon: {
        fontSize: 90,
        color: "white",

    },
    topBox: {
        margin: 50,
        padding: 15,
        width: "80%",
        backgroundColor: "rgba(100,100,100,0.3)",
        borderRadius: 10,
        overflow: 'hidden'
    },
    boxButton: {
        width: "80%",
        alignItems: 'center',
        flexDirection: "row",
        justifyContent: "space-evenly",
        flex: 1
    },
    topBoxText: {
        color: "white",
        fontSize: 20,
        margin: 5,
        flex: 1,
    },
    bottomBoxText:{
        color: "white",
        fontSize: 17,
        margin: 5,
        flex: 1,
    },
    topBoxInline:{
        alignItems: 'center',
        flexDirection: "row",
        justifyContent: "flex-start",
    },
    bottomBox:{
        margin: 50,
        padding: 15,
        width: "80%",
        backgroundColor: "rgba(100,100,100,0.3)",
        borderRadius: 10,
        overflow: 'hidden'
    }

})
export default Home
/*
            <TouchableOpacity onPress={()=> navigation.navigate("Settings")}>
                <Text>
                    Settings
                </Text>
            </TouchableOpacity>
 */