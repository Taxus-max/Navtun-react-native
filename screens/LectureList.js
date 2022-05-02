import React, {useRef} from "react";
import {View, StyleSheet, Text, FlatList, TouchableOpacity, Pressable,TextInput,Animated} from "react-native";
import customModal from "./customModal";
import {FontAwesome} from "@expo/vector-icons";
import dateRefactor from "../utils/dateRefactor";
import dbHandler from "../utils/dbhandler";
import Swipeable from 'react-native-gesture-handler/Swipeable';
import {GestureHandlerRootView } from 'react-native-gesture-handler';
import customSettingsModal from "./customSettingsModal";


const showModal = (item, {setModalVisible},{setModalValue}) => {
    setModalVisible(true);
    setModalValue(item);
}

const showSettingsModal = (item, {setSettingsModalVisible}, {setModalValue}) =>{
    setSettingsModalVisible(true);
    setModalValue(item);
}

const muteLecture = (id,{setCalendar},{loadFlatlist}) => {
    dbHandler.changeMuteStatus(id,1)
    loadFlatlist({setCalendar})
}
const unMuteLecture = (id,{setCalendar},{loadFlatlist}) => {
    dbHandler.changeMuteStatus(id,0)
    loadFlatlist({setCalendar})
}

const filterChanges = (term,{setFilter}) =>{
    setFilter(term.toLowerCase());
}

const  renderHeader = ({setFilter}) =>{
    return(
        <View>
            <TextInput
                autoCapitalize='none'
                autoCorrect={false}
                onChangeText={(term) => filterChanges(term,{setFilter})}
                placeholder='Search'
                style={styles.searchBar}
            />
        </View>
    )
}
const closeSwipeable = (row) =>{
    row.forEach(s => {if (s){
            s.close()
        }
    })
}

const renderLeftActions = (progress, dragX) => {

    const trans = dragX.interpolate({
        inputRange: [0, 50, 100, 130],
        outputRange: [-1, 0, 0, 1],
    });
    return (
         <Animated.View
             style={
                 {
                     width: "100%",
                     backgroundColor: "teal",
                     borderRadius: 15,
                     margin: 5,
                     marginRight:0,
                     justifyContent: "center",
                     paddingLeft: 30,
                     transform: [{translateX: trans}],
                 }
             }>
             <FontAwesome name="info" size={32} color="white" />
         </Animated.View>
    );
}

const renderRightActions = (progress, dragX, item,{setCalendar},{loadFlatlist},{setSettingsModalVisible},{setModalValue},row) => {
    const trans = dragX.interpolate({
        inputRange: [0, 50, 100, 101],
        outputRange: [-1, 0, 0, 1],
    });
    return (
        <Animated.View
            style={
            {
                alignItems: 'center',
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                width: "35%",
                borderRadius: 15,
                margin: 5,
                marginLeft:0,
                backgroundColor: "grey",
                transform: [{translateX: trans}],
            }}
        >
            <TouchableOpacity onPress={() => {showSettingsModal(item,{setSettingsModalVisible},{setModalValue});closeSwipeable(row)}}>
                <Text>
                    <FontAwesome color={"white"} size={32} name="cog"/>
                </Text>
            </TouchableOpacity>
            {item.isMuted === 0 &&
            <TouchableOpacity onPress={() => {muteLecture(item.id,{setCalendar},{loadFlatlist});closeSwipeable(row)}}>
                <Text>
                    <FontAwesome color={"white"} size={32} name="bell"/>
                </Text>
            </TouchableOpacity>}
            {item.isMuted !== 0 &&
                <TouchableOpacity onPress={() => {unMuteLecture(item.id,{setCalendar},{loadFlatlist});closeSwipeable(row)}}>
                    <Text>
                        <FontAwesome color={"white"} size={32} name="bell-slash"/>
                    </Text>
                </TouchableOpacity>}

        </Animated.View>
    );
}

const renderList = (item,{setModalVisible},{setModalValue},{setCalendar},{loadFlatlist},filter,{setSettingsModalVisible}) => {
    let row= [];

    const renderButton = () => {
        if (item.isMuted === 0) {
            return (
                <TouchableOpacity>
                    <FontAwesome color={"white"} size={20} name="bell"/>
                </TouchableOpacity>
            )
        } else {
            return (
                <TouchableOpacity>
                    <FontAwesome color={"white"} size={20} name="bell-slash"/>
                </TouchableOpacity>
            )
        }
    }

    if((item.name.split("(")[0].toLowerCase()).includes(filter) || (dateRefactor(item.start).includes(filter)) ){
        return (
            <GestureHandlerRootView>
                <Swipeable
                    ref={ref => row.push(ref)}
                    renderLeftActions={renderLeftActions}
                    renderRightActions={(progress,dragX)=>renderRightActions(progress,dragX,item,{setCalendar},{loadFlatlist},{setSettingsModalVisible},{setModalValue},row)}
                    leftThreshold={50}
                    rightThreshold={20}
                    overshootFriction={8}
                    friction={2}
                    onSwipeableLeftOpen={() => {showModal(item,{setModalVisible},{setModalValue});closeSwipeable(row)}}
                >
                    <View style={styles.listElement}>
                        <Text style={item.isCanceled == 0 ? styles.listElementText : styles.listElementTextCancelled}>{item.name.split("(")[0]} {'\n'}{'\n'}{dateRefactor(item.start)}</Text>
                        {renderButton()}
                    </View>
                </Swipeable>
            </GestureHandlerRootView>
        )
    }
}

const LectureList = ({navigation,calendar,setCalendar,loadFlatlist}) => {
    const [modalVisible, setModalVisible] = React.useState(false);
    const [settingsModalVisible,setSettingsModalVisible] = React.useState(false);
    const [ModalValue, setModalValue] = React.useState("");
    const [filter,setFilter] = React.useState("");
    return (
        <View style={styles.background}>
            <View style={styles.box}>
                {customSettingsModal(settingsModalVisible,{setSettingsModalVisible},ModalValue,{loadFlatlist,setCalendar})}
                {customModal(modalVisible,{setModalVisible},ModalValue,{loadFlatlist,setCalendar})}

                <FlatList
                    ListHeaderComponent={renderHeader({setFilter})}
                    stickyHeaderIndices={[0]}
                    maxToRenderPerBatch={8}
                    style={{height: "100%"}}
                    data={calendar}
                    renderItem={({item}) => renderList(item,{setModalVisible},{setModalValue},
                        {setCalendar}, {loadFlatlist}, filter,{setSettingsModalVisible})}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    background:{
        backgroundColor: "#222222",
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
    },
    box: {
        marginTop: 50,
        padding: 10,
        width: "100%",
    },
    listElement: {
        backgroundColor: 'rgba(100,100,100,1)',
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
    searchBar:{
        borderRadius: 25,
        borderColor: '#333',
        backgroundColor: '#fff',
        padding: 5
    }
})

export default LectureList