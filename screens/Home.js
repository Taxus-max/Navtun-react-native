import React from "react";
import {Text, View, Image, TextInput, TouchableOpacity, StyleSheet, FlatList, Pressable, Modal} from 'react-native';
import {FontAwesome} from "@expo/vector-icons";
import customModal from "./customModal";

const showModal = (item, {setModalVisible},{setModalValue}) => {
    setModalVisible(true);
    setModalValue(item);
}

const muteLecture = (id) => {
    console.log("muted", id)
}
const unMuteLecture = (id) => {
    console.log("unmuted", id)
}

const renderList = (item,{setModalVisible},{setModalValue}) => {
    const renderButton = () => {
        if (item.isMuted == 0) {
            return (
                <TouchableOpacity onPress={() => muteLecture(item.id)}>
                    <FontAwesome color={"white"} size={20} name="bell"/>
                </TouchableOpacity>
            )
        } else {
            return (
                <TouchableOpacity onPress={() => unMuteLecture(item.id)}>
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

    return (
        <View style={styles.background}>
            {customModal(modalVisible,{setModalVisible},ModalValue)}
            <View style={styles.topBox}>
                <Text style={styles.topBoxText} numberOfLines={2}>Time,Location</Text>
                <Text style={styles.topBoxText} numberOfLines={2}>Lecture Lecturer</Text>
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
                    data={[
                        {id: 1, name: "Lesson1", lecturer:"Dr.Test", location: "I.0.1", start: "2022.02.10 11:00", end:"2022.02.10 12:00", isMuted: 0, isCanceled: 0, notifDelay: 120},
                        {id: 2, name: "Lesson2", lecturer:"Dr.Test", location: "I.0.1", start: "2022.02.10 11:00", end:"2022.02.10 12:00", isMuted: 1, isCanceled: 0, notifDelay: 120},
                        {id: 3, name: "Lesson3", lecturer:"Dr.Test", location: "I.0.1", start: "2022.02.10 11:00", end:"2022.02.10 12:00", isMuted: 0, isCanceled: 0, notifDelay: 120},
                        {id: 4, name: "Lesson4", lecturer:"Dr.Test", location: "I.0.1", start: "2022.02.10 11:00", end:"2022.02.10 12:00", isMuted: 1, isCanceled: 1, notifDelay: 120},
                        {id: 5, name: "Lesson5", lecturer:"Dr.Test", location: "I.0.1", start: "2022.02.10 11:00", end:"2022.02.10 12:00", isMuted: 1, isCanceled: 0, notifDelay: 120},
                        {id: 6, name: "Lesson6", lecturer:"Dr.Test", location: "I.0.1", start: "2022.02.10 11:00", end:"2022.02.10 12:00", isMuted: 1, isCanceled: 0, notifDelay: 120},

                    ]}
                    renderItem={({item}) => renderList(item,{setModalVisible},{setModalValue})}
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
        fontSize: 70,
        color: "white",
        margin: 10,
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
        borderRadius: 10
    },
    topBoxButton: {
        marginTop: 45,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
    },
    topBoxText: {
        color: "white",
        fontSize: 18,
        margin: 5,
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

})
export default Home