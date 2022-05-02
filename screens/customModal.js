import React from "react";
import {Text, View, TouchableOpacity, TextInput, StyleSheet, Modal} from 'react-native';
import {FontAwesome, MaterialCommunityIcons} from "@expo/vector-icons";
import dateRefactor from "../utils/dateRefactor";

const customModal = (modalVisible,{setModalVisible},ModalValue,{loadFlatlist,setCalendar} ) =>{

    return(
        <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                setModalVisible(!modalVisible);
            }}
        >
            <View style={styles.centeredView} >
                <View style={styles.modalView}>
                    <View style={styles.elementContainer}>
                        <View>
                            <View style={styles.labelContainer}>
                                <Text style={styles.fontDesign}>Name:</Text>
                            </View>
                            <View style={styles.infoContainer}>
                                <Text style={styles.fontDesign}>{ModalValue.name}</Text>
                            </View>
                        </View>
                        <View style={styles.elementContainer}>
                            <View style={styles.labelContainer}>
                                <Text style={styles.fontDesign}>Lecturer:</Text>
                            </View>
                            <View style={styles.infoContainer}>
                                <Text style={styles.fontDesign}>{ModalValue.lecturer}</Text>
                            </View>
                        </View>
                        <View style={styles.elementContainer}>
                            <View style={styles.labelContainer}>
                                <Text style={styles.fontDesign}>Location:</Text>
                            </View>
                            <View style={styles.infoContainer}>
                                <Text style={styles.fontDesign}>{ModalValue.location}</Text>
                            </View>
                        </View>
                        <View style={styles.elementContainer}>
                            <View style={styles.labelContainer}>
                                <Text style={styles.fontDesign}>Start:</Text>
                            </View>
                            <View style={styles.infoContainer}>
                                <Text style={styles.fontDesign}>{dateRefactor(ModalValue.start)}</Text>
                            </View>
                        </View>
                        <View style={styles.elementContainer}>
                            <View style={styles.labelContainer}>
                                <Text style={styles.fontDesign}>End:</Text>
                            </View>
                            <View style={styles.infoContainer}>
                                <Text style={styles.fontDesign}>{dateRefactor(ModalValue.end)}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            onPress={()=> {
                                setModalVisible(!modalVisible);
                            }}>
                            <MaterialCommunityIcons color={"rgb(220,220,220)"} size={40} name="close"/>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    )
}
const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
    },
    modalView: {
        width: "70%",
        margin: 20,
        backgroundColor: "rgb(90,80,80)",
        borderRadius: 20,
        padding: 35,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    labelContainer:{
        backgroundColor: "rgb(90,80,80)",
        alignSelf: "flex-start",
        paddingHorizontal: 3,
        marginStart: 10,
        zIndex: 1,
        elevation: 1,
        shadowColor: "rgb(90,80,80)",
        position: "absolute",
        top: -12
    },
    infoContainer: {
        borderWidth: 1,
        borderColor: "rgb(220,220,220)",
        borderRadius: 8,
        padding: 8,
        zIndex: 0,
    },
    elementContainer:{
        marginTop: 20,
    },
    buttonContainer:{
        marginTop: 20,
        alignItems: "center"
    },
    fontDesign:{
        color: "rgb(220,220,220)"
    }
})

export default customModal