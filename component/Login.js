import React, { useState, useEffect, useContext } from "react"
import {
    View, Text, StatusBar,
    StyleSheet, Image, TextInput, TouchableOpacity, ScrollView, ToastAndroid, ActivityIndicator
} from "react-native"
import { App_Colors, App_Size } from "../constant/Theme"
import Images from "../constant/Images"
import Api from "../constant/Api"
import AsyncStorage from "@react-native-async-storage/async-storage"
import axios from "axios"
import NetInfo from '@react-native-community/netinfo';
import { AppContext } from "../context/context"
const Login = ({ navigation, route }) => {
    const { userData } = useContext(AppContext)
    const [check_email, setcheck_email] = React.useState("");
    const [border_color, setborder_color] = React.useState("");
    const [border_color2, setborder_color2] = React.useState("");
    const [check_password, setcheck_password] = React.useState("");
    const [user_data, setuser_data] = useState({})
    const [connection_Status, setconnection_Status] = useState("")
    const [Button_loading, setButton_loading] = useState(false)
    const { setUser } = useContext(AppContext)
    useEffect(() => {
        const unsubscripe = NetInfo.addEventListener(state => {

            if (state.isConnected == true) {
                setconnection_Status("Online")
            } else {
                setconnection_Status("Offline")
            }



        })
        return unsubscripe
        // switchApp()
    }, [])

    // async function switchApp() {
    //     await AsyncStorage.setItem("switch", "Auth")
    // }
    function validate(text) {
        let reg = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/;
        // console.log(reg.test(text))
        if (reg.test(text) === false && text.length > 0) {
            setcheck_email(text);
            // return false;
            setborder_color("#f00")
        } else {
            setcheck_email(text)
            setborder_color("")
            // return true;
        }

    };

    // function check() {
    //     if (check_email.length > 0 && check_email.length < 13) {
    //         setborder_color("#f00")
    //     } else {
    //         setborder_color("")

    //     }
    // }

    function check_password_data(value) {
        if (value.length > 0 && value.length < 3) {
            setborder_color2("#f00")
        } else {
            setborder_color2("")

        }
    }



    async function submit() {


        if (connection_Status == "Offline") {
            ToastAndroid.showWithGravityAndOffset(
                "يجب عليك الاتصال بالانترنت",
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM,
                20,
                20
            );
        } else {
            if (check_email == "" || check_password == "") {
                ToastAndroid.showWithGravityAndOffset(
                    "يجب عليك ادخال البيانات",
                    ToastAndroid.SHORT,
                    ToastAndroid.BOTTOM,
                    20,
                    20
                );
                setborder_color2("#f00")
                setborder_color("#f00")
            } else {
                setborder_color2("")
                setborder_color("")
                let data = {
                    doctor_email: check_email,
                    doctor_pass: check_password
                }
                setButton_loading(true)
                let fetch = await axios.post(Api.Domain + "login.php", data);
                if (fetch.status == 200) {
                    let res = fetch.data
                    if (res == 'user_not_found') {

                        ToastAndroid.showWithGravityAndOffset(
                            "  هذه الداتا غير متاحه و يحب عليك ادخل بيانات صحيحه",
                            ToastAndroid.SHORT,
                            ToastAndroid.BOTTOM,
                            20,
                            20
                        );

                    }

                    else if (res == "error") {
                        ToastAndroid.showWithGravityAndOffset(
                            "حدث خطأ ما",
                            ToastAndroid.SHORT,
                            ToastAndroid.BOTTOM,
                            20,
                            20
                        );
                    }
                    else {


                        await AsyncStorage.setItem("data", JSON.stringify(res))
                        setcheck_email("")
                        setcheck_password("")
                        setUser(true)
                        setButton_loading(false)
                    }
                } else {
                    ToastAndroid.showWithGravityAndOffset(
                        "حدث خطأ ما",
                        ToastAndroid.SHORT,
                        ToastAndroid.BOTTOM,
                        20,
                        20
                    );
                }
            }





        }


    }
    function _renderBody() {
        return (
            <>
                <ScrollView>
                    <View style={style.View_Image}>
                        <Image source={Images.Images.logo} style={style.image} />
                    </View>
                    <View style={style.View_Textinput}>
                        <TextInput style={[style.TextInput_Field, {
                            borderWidth: border_color == "#f00" ? 1 : null,
                            borderColor: border_color,
                            marginVertical: 10
                        }]}
                            placeholder="البريد الالكتروني"
                            placeholderTextColor={"#999"}
                            // keyboardType="numeric"
                            value={check_email}
                            onChangeText={(value) => {
                                // check()
                                validate(value)
                                setcheck_email(value)

                            }} />
                        <TextInput style={[style.TextInput_Field, {
                            borderWidth: border_color2 == "#f00" ? 1 : null,
                            borderColor: border_color2
                        }]}
                            placeholder="كلمه السر"
                            placeholderTextColor={"#999"}
                            keyboardType="numeric"
                            value={check_password}
                            onChangeText={(value) => {
                                check_password_data(value)
                                setcheck_password(value)

                            }} />
                    </View>

                    <View style={style.View_Button_Action}>
                        <TouchableOpacity
                            onPress={() => {
                                submit()
                            }}
                            style={style.button}>


                            {Button_loading == true ?
                                <ActivityIndicator size={25} color={App_Colors.white} />
                                :
                                <Text style={style.button_text}>تأكيد</Text>
                            }

                        </TouchableOpacity>

                    </View>
                </ScrollView>
            </>
        )
    }
    return (
        <View style={style.container}>
            <StatusBar backgroundColor={App_Colors.primary} barStyle="light-content" />
            {_renderBody()}
        </View>
    )
}
const style = StyleSheet.create({
    container: {
        backgroundColor: App_Colors.white,
        flex: 1,
    },
    View_Image: {
        height: App_Size.height / 2,
        padding: 15,
        width: "100%",

        alignItems: "center",
        justifyContent: "center",
        // backgroundColor: "#414"
    },
    image: {
        height: 300,
        width: 200,
        resizeMode: "center",
        // backgroundColor: "#f00"
    },
    View_Textinput: {
        // height: 100,
        padding: 15,
        width: "100%",

        alignItems: "center",
        justifyContent: "center"
    },
    TextInput_Field: {
        padding: 15,
        width: "95%",
        color: App_Colors.black,
        backgroundColor: "#fff",
        elevation: 4,
        borderRadius: 10,

    },
    View_Button_Action: {
        height: App_Size.height / 4,
        width: "100%",
        // backgroundColor: "#785",
        alignItems: "center",
        justifyContent: "center",
        padding: 10
    },
    button: {
        height: 70,
        width: 120,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: App_Colors.primary,
        borderRadius: 10
    },
    button_text: {
        color: App_Colors.white,
        fontSize: 20,
        fontWeight: "bold"
    }


})
export default Login;