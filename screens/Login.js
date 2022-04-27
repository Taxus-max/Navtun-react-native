import React from 'react';
import { Text, View, Image, TextInput, TouchableOpacity, StyleSheet, Alert} from 'react-native';
import getSchedule from '../utils/NeptunCommunicator';

const login = (creds,navigation) => {
    //*Debug section*
    //console.log(creds.id, creds.password)

    if ((creds.id == "" || creds.password == "")) {
        Alert.alert(
            "Login error",
            "Make sure to fill out every field",
            [
                { text: "OK" }
            ]
        );
    } else {
        let schedule = getSchedule(creds);
        Promise.resolve(schedule).then(result => {
            if (result == true) {
                navigation.navigate("Home")
            }
            else {
                Alert.alert(
                    "Invalid credentials",
                    "Please check if your credentails are valid!",
                    [
                        { text: "OK" }
                    ]
                )
            }
        })
    }
}


const Login = ({navigation}) => {

    const [id, onChangeId] = React.useState('')
    const [password, onChangePassword] = React.useState('')

    return (
        <View style={styles.background}>
            <View style={styles.titleBox}>
                <Image
                    style={styles.logo}
                    source={require("../assets/logo2.png")}
                />
                <Text style={styles.title}>Navtun</Text>
            </View>
            <View>
                <TextInput
                    style={styles.inputField}
                    maxLength={6}
                    autoCapitalize="characters"
                    value={id}
                    onChangeText={text => onChangeId(text)}
                    placeholder='Neptun id' />
                <TextInput
                    style={styles.inputField}
                    placeholder='Neptun password'
                    value={password}
                    onChangeText={text => onChangePassword(text)}
                    secureTextEntry={true} />
                <TouchableOpacity
                    style={styles.loginBtn}
                    onPress={() => login({ id, password },navigation)}>
                    <Text style={styles.loginTxt}>Login</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    background: {
        backgroundColor: "#48d1cc",
        alignItems: "center",
        justifyContent: "flex-start",
        flex: 1,
    },
    titleBox: {
        flexDirection: "row",
        justifyContent: "center",
        margin: 20,
        paddingTop:20,
      },
    logo: {
        width: 115,
        height: 150,
        marginBottom: 40,
    },
    title: {
        color: "black",
        fontSize: 50,
        textAlignVertical: "bottom",
        marginBottom: 40,

    },
    loginBtn: {
        backgroundColor: "rgba(0, 0, 255, 0.418)",
        alignItems: "center",
        padding: 10,
        borderRadius: 10,
        alignSelf: "center"
    },
    loginTxt: {
        fontSize: 22,
        minWidth: "30%",
        maxWidth: "30%",
        textAlign: "center"
    },
    inputField: {
        fontSize: 20,
        borderColor: "grey",
        borderWidth: 1,
        borderRadius: 20,
        padding: 10,
        minWidth: "60%",
        maxWidth: "60%",
        margin: 12
    }
})

export default Login