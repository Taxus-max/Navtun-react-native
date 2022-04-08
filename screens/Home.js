import React from "react";
import {Text, View, Image, TextInput, TouchableOpacity, StyleSheet, FlatList, Pressable, Modal} from 'react-native';
import {FontAwesome,FontAwesome5} from "@expo/vector-icons";
import customModal from "./customModal";
import dateRefactor from "../utils/dateRefactor";
import dbHandler from "../utils/dbhandler";

const initialCalendar = [
        {id: 1, name: "You don't have any lectures", lecturer:"", location: "", start: "", end:"", isMuted: 0, isCanceled: 0, notifDelay: 0},
]

const loadFlatlist = ({setCalendar}) =>{
    dbHandler.getCalendar()
        .then((response) => setCalendar(response))
        .catch(e => console.error(e))
}

const showModal = (item, {setModalVisible},{setModalValue}) => {
    setModalVisible(true);
    setModalValue(item);
}

const muteLecture = (id,{setCalendar}) => {
    dbHandler.changeMuteStatus(id,1)
    loadFlatlist({setCalendar})
}
const unMuteLecture = (id,{setCalendar}) => {
    dbHandler.changeMuteStatus(id,0)
    loadFlatlist({setCalendar})
}
const renderList = (item,{setModalVisible},{setModalValue},{setCalendar}) => {
    const renderButton = () => {
        if (item.isMuted == 0) {
            return (
                <TouchableOpacity onPress={() => muteLecture(item.id,{setCalendar})}>
                    <FontAwesome color={"white"} size={20} name="bell"/>
                </TouchableOpacity>
            )
        } else {
            return (
                <TouchableOpacity onPress={() => unMuteLecture(item.id,{setCalendar})}>
                    <FontAwesome color={"white"} size={20} name="bell-slash"/>
                </TouchableOpacity>
            )
        }
    }

    return (
        <Pressable onLongPress={() => showModal(item,{setModalVisible},{setModalValue})}>
            <View style={styles.listElement}>
                <Text style={item.isCanceled == 0 ? styles.listElementText : styles.listElementTextCancelled}>{item.name}</Text>
                {renderButton()}
            </View>
        </Pressable>
    )
}

const Home = () => {
    const [modalVisible, setModalVisible] = React.useState(false);
    const [ModalValue, setModalValue] = React.useState("");
    let [calendar,setCalendar] = React.useState(initialCalendar);

    React.useEffect(()=>
    {
        loadFlatlist({setCalendar})
    },[])

    return (
        <View style={styles.background}>
            {customModal(modalVisible,{setModalVisible},ModalValue)}
            <View style={styles.topBox}>
                <View style={styles.topBoxInline}>
                    <FontAwesome5 name="book-open" size={20} style={{margin:5}} color="white" />
                    <Text style={styles.topBoxText} numberOfLines={2}>{calendar[0].name}</Text>
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
                <View style={styles.topBoxButton}>
                    <TouchableOpacity>
                        <FontAwesome style={styles.large_icon} name="map"/>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <FontAwesome style={styles.large_icon} name="building"/>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.bottomBox}>
                <FlatList
                    data={calendar}
                    renderItem={({item}) => renderList(item,{setModalVisible},{setModalValue},{setCalendar})}
                />
            </View>
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
    large_icon: {
        fontSize: 60,
        color: "white",

    },
    list: {
        backgroundColor: "red",
        borderRadius: 10,
        width: "100%"
    },
    topBox: {
        margin: 20,
        height: "40%",
        padding: 10,
        width: "80%",
        backgroundColor: "rgba(50,50,50,0.3)",
        borderRadius: 10,
        overflow: 'hidden'
    },
    topBoxButton: {
        alignItems: 'center',
        marginTop:5,
        flexDirection: "row",
        justifyContent: "space-evenly",
        flex: 1
    },
    topBoxText: {
        color: "white",
        fontSize: 18,
        margin: 5,
        flex: 1,
    },
    bottomBox: {
        margin: 20,
        height: "43%",
        padding: 10,
        width: "80%",
        backgroundColor: "rgba(50,50,50,0.3)",
        borderRadius: 10,
    },
    listElement: {
        backgroundColor: 'rgba(50,50,50,0.5)',
        color: 'white',
        margin: 5,
        fontSize: 17,
        padding: 10,
        borderRadius: 15,
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    listElementText: {
        color: 'white',
        fontSize: 18,
        margin: 5,
        maxWidth: 190,
    },
    listElementTextCancelled:{
        textDecorationLine: 'line-through',
        color: 'grey',
        fontSize: 18,
        margin: 5,
        maxWidth: 190,
    },
    topBoxInline:{
        alignItems: 'center',
        flexDirection: "row",
        justifyContent: "flex-start",
    }

})
export default Home