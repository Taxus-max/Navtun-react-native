import React from "react";
import {Text, View, Image, StyleSheet,TouchableOpacity,Dimensions} from 'react-native';
import buildings from "../data/buildings.json";
import images from '../data/buildings'
import { Ionicons } from '@expo/vector-icons';
import ReactNativeZoomableView from '@openspacelabs/react-native-zoomable-view/src/ReactNativeZoomableView';

const setInitialMap = (currentLocation) =>{
    if(currentLocation.includes("fsz")){
        return(currentLocation.split(".")[0]+"0")
    }else{
        return(currentLocation.split(".")[0]+currentLocation.split(".")[1])
    }
}

const setInitialMenu = (currentLocation) =>{
    if(currentLocation.includes("fsz")){
        return(0)
    }else{
        return(parseInt(currentLocation.split(".")[1]))
    }
}

const Menu = (isMenuOpen,activeMenuElement,currentLocation,{setActiveMenuElement},{setCurrentMap}) =>{
    let levelNumber = 0;

     for(let i = 0;i < buildings.length;i++){
         if(buildings[i].name == currentLocation.split(".")[0]){
             levelNumber = buildings[i].levels
         }
     }

     if(isMenuOpen){
         return(
             Array.from({ length: levelNumber+1}, (_, i) => (
                 <View key={i} >
                     <TouchableOpacity  onPress={() => navigateMenu(i,currentLocation,{setActiveMenuElement},{setCurrentMap})}>
                         <Text style={activeMenuElement == i ? styles.menuElementActive : styles.menuElement}>
                             {i}
                         </Text>
                     </TouchableOpacity>
                 </View>
             ))
         )
     }

}

const Map = (currentMap) =>{
    let image = require("../assets/maps/notSupported.png")


    for(let i = 0;i < images.length;i++){
        if(images[i][0] == currentMap){
            image = images[i][1]
        }
    }

    return(
        <ReactNativeZoomableView
            maxZoom={3}
            minZoom={1}
            zoomStep={0.5}
            initialZoom={1}
            bindToBorders={true}
            key={image}
        >
            <Image
                style={styles.map}
                source={image}/>
        </ReactNativeZoomableView>

    )
}

const navigateMenu = (id,currentLocation,{setActiveMenuElement},{setCurrentMap}) =>{
    setActiveMenuElement(id);
    setCurrentMap(currentLocation.split(".")[0]+id.toString())
}


const Buildings = ({route,navigation}) =>{
    const [currentLocation,setCurrentLocation] = React.useState(route.params.location);
    const [currentMap,setCurrentMap] = React.useState(setInitialMap(currentLocation));
    const [activeMenuElement,setActiveMenuElement] = React.useState(setInitialMenu(currentLocation));
    const [isMenuOpen,setIsMenuOpen] = React.useState(false);


    return(
        <View style={styles.background}>
            {Map(currentMap)}
            <View style={styles.menuButtonBox}>
                <View>
                    <View style={isMenuOpen ? styles.menuBarBox : null}>
                        {Menu(isMenuOpen,activeMenuElement,currentLocation,{setActiveMenuElement},{setCurrentMap})}
                    </View>
                    <View style={styles.openMenu}>
                        <TouchableOpacity onPress={()=>setIsMenuOpen(!isMenuOpen)}>
                            <Ionicons name="layers" size={40} color="white" />
                        </TouchableOpacity>
                    </View>

                </View>
            </View>
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
    map: {
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width,
        resizeMode: "center"
    },
    menuElement:{
        color:'white',
        fontSize: 22,
    },
    menuElementActive:{
        color:'blue',
        fontSize: 22,
    },
    openMenu:{
        backgroundColor: "rgba(0,0,0,0.5)",
        borderRadius: 100,
        padding: 5,
        margin: 20
    },
    menuButtonBox:{
        width: '100%',
        justifyContent: "flex-end",
        flexDirection: "row",
        position: "absolute",
        bottom: 0,

    },
    menuBarBox:{
        backgroundColor: 'rgba(0,0,0,0.5)',
        alignItems: "center",
        padding: 10,
        margin: 20,
        marginBottom: 0,
        borderRadius: 100,
    }
})
export default Buildings