import React from "react";
import {View, Text, TouchableOpacity, StyleSheet, ActivityIndicator} from "react-native";
import { Entypo } from '@expo/vector-icons';
import Home from "./Home";
import LectureList from "./LectureList";
import dbHandler from "../utils/dbhandler";

const initialCalendar = [
    {id: 1, name: "You don't have any lectures", lecturer:"", location: "", start: "", end:"", isMuted: 0,
        isCanceled: 0, notifDelay: 0},
]

const loadFlatlist = ({setCalendar,setIsLoading}) =>{
    dbHandler.getCalendar()
        .then((response) => {
            setCalendar(response);
            if(setIsLoading != undefined){
                setIsLoading(false)
            }

        })
        .catch(e => console.error(e))
}

const currentDisplayScreen = ({navigation},currentDisplay,calendar,{setCalendar}, {loadFlatlist} ) =>{
    if(currentDisplay == "Home"){
        return(
            <Home navigation={navigation} calendar={calendar}/>
        )
    }else{
        return(
            <LectureList navigation={navigation} calendar={calendar} setCalendar={setCalendar} loadFlatlist={loadFlatlist}/>
        )
    }

}

const MenuBarBottom = ({navigation}) => {
    const [currentDisplay,setCurrentDisplay] = React.useState("Home")
    const [isLoading,setIsLoading] = React.useState(true)
    let [calendar,setCalendar] = React.useState(initialCalendar);

    React.useEffect(()=>
    {
        loadFlatlist({setCalendar,setIsLoading})
        //TMP task init (time: 60000)
        //let check = setInterval(function(){periodicCheck()},6000);
        navigation.addListener('beforeRemove', (e) => {
            e.preventDefault();
        })
    },[navigation])

    return (
        <View style={{flex: 1}} >
            {isLoading && <ActivityIndicator style={styles.loadingIcon} size={100} color="#0000ff"/>}
            {currentDisplayScreen({navigation},currentDisplay,calendar,{setCalendar}, {loadFlatlist})}
        <View style={styles.background}>
            <TouchableOpacity style={{alignItems: "center"}} onPress={() => setCurrentDisplay("Home")}>
                <Entypo name="home" style={currentDisplay == "Home" ? styles.icons_active : styles.icons} />
                <Text style={currentDisplay == "Home" ? styles.text_active : styles.text}>
                    Home
                </Text>
            </TouchableOpacity>
            <TouchableOpacity style={{alignItems: "center"}} onPress={() => setCurrentDisplay("List")}>
                    <Entypo name="list" style={currentDisplay == "List" ? styles.icons_active : styles.icons} />
                    <Text style={currentDisplay == "List" ? styles.text_active : styles.text}>
                        Lectures
                    </Text>
            </TouchableOpacity>
        </View>
        </View>
    )
}

const styles = StyleSheet.create({
    background:{
        width: "100%",
        backgroundColor: "#222229",
        alignItems: "center",
        justifyContent: "space-evenly",
        flexDirection: "row",
        padding:5,
    },
    icons:{
        color: "white",
        fontSize: 33
    },
    icons_active:{
        color: "blue",
        fontSize: 33
    },
    text:{
        color: "white",
        fontSize: 15
    },
    text_active:{
        color: "blue",
        fontSize: 15
    },
    loadingIcon:{
        position:"absolute",
        zIndex:10,
        backgroundColor: "rgba(0,0,0,0.9)",
        width: "100%",
        height: "100%"
    }
})

export default MenuBarBottom