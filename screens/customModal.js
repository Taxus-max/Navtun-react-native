import React from "react";
import {Text, View, TouchableOpacity, TextInput, StyleSheet, Modal} from 'react-native';
import {FontAwesome, MaterialCommunityIcons} from "@expo/vector-icons";

const saveSettings = (id, timeValue,{setTimeValue}) => {
    //Call dbmager save notifDealy here
    setTimeValue(undefined);
}

const settings = (ModalValue,status,{setSettingsStatus}) =>{
    let [timeValue,setTimeValue] = React.useState(undefined)

    if(status == true) {
        console.log(timeValue)
        return(
            <View style={styles.elementContainer}>
                <View style={styles.labelContainer}>
                    <Text>Delay time (minutes):</Text>
                </View>
                <View style={styles.infoContainer}>
                    <TextInput
                        keyboardType="numeric"
                        maxLegth={4}
                        value={timeValue}
                        defaultValue={ModalValue.notifDelay.toString()}
                        onChangeText={(text) => {timeValue = setTimeValue(text)}}
                    />
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={() => {saveSettings(ModalValue.id,timeValue,{setTimeValue});setSettingsStatus(false)}}>
                        <FontAwesome name="save" size={24} color="black" />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}


const customModal = (modalVisible,{setModalVisible},ModalValue) =>{
    const [settingsStatus, setSettingsStatus] = React.useState(false);

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
                    <TouchableOpacity onPress={()=>setSettingsStatus(!settingsStatus)}>
                        <FontAwesome color={"black"} size={30} name="cog"/>
                    </TouchableOpacity>
                    {settings(ModalValue,settingsStatus,{setSettingsStatus})}
                    <View style={styles.elementContainer}>
                        <View>
                            <View style={styles.labelContainer}>
                                <Text>Name:</Text>
                            </View>
                            <View style={styles.infoContainer}>
                                <Text>{ModalValue.lecturer}</Text>
                            </View>
                        </View>
                        <View style={styles.elementContainer}>
                            <View style={styles.labelContainer}>
                                <Text>Lecturer:</Text>
                            </View>
                            <View style={styles.infoContainer}>
                                <Text>{ModalValue.location}</Text>
                            </View>
                        </View>
                        <View style={styles.elementContainer}>
                            <View style={styles.labelContainer}>
                                <Text>Location:</Text>
                            </View>
                            <View style={styles.infoContainer}>
                                <Text>{ModalValue.name}</Text>
                            </View>
                        </View>
                        <View style={styles.elementContainer}>
                            <View style={styles.labelContainer}>
                                <Text>Start:</Text>
                            </View>
                            <View style={styles.infoContainer}>
                                <Text>{ModalValue.start}</Text>
                            </View>
                        </View>
                        <View style={styles.elementContainer}>
                            <View style={styles.labelContainer}>
                                <Text>End:</Text>
                            </View>
                            <View style={styles.infoContainer}>
                                <Text>{ModalValue.end}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity onPress={()=> {setModalVisible(!modalVisible);setSettingsStatus(false)}}>
                            <MaterialCommunityIcons color={"black"} size={40} name="close"/>
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
        backgroundColor: "#41b0ac",
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
        backgroundColor: "#41b0ac",
        alignSelf: "flex-start",
        paddingHorizontal: 3,
        marginStart: 10,
        zIndex: 1,
        elevation: 1,
        shadowColor: "#41b0ac",
        position: "absolute",
        top: -12
    },
    infoContainer: {
        borderWidth: 1,
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
})

export default customModal