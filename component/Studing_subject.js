import React, { useState, useEffect } from "react"
import {
    View, Text, StatusBar, StyleSheet, FlatList, Image,
    TouchableOpacity,
    ToastAndroid,
    ActivityIndicator
} from "react-native"
import { App_Colors, App_Size } from "../constant/Theme"
import Images from "../constant/Images"
import Api from "../constant/Api"
import axios from "axios"
import NetInfo from '@react-native-community/netinfo';
const Studing_subject = ({ navigation, route }) => {
    const [Subject_data, setSubject_data] = useState([])
    const [loading, setloading] = useState(false)
    const [connection_Status, setconnection_Status] = useState("")
    useEffect(() => {
        const unsubscripe = NetInfo.addEventListener(state => {

            if (state.isConnected == true) {
                setconnection_Status("Online")
                select_Subject()
            } else {
                setconnection_Status("Offline")
            }
        })
        return unsubscripe




    }, []);

    async function select_Subject() {
        // route.params
        const { generation_id } = route.params
        let data = {
            generation_id: generation_id
        }
        setloading(true)
        let fetch = await axios.post(Api.Domain + "select_subject.php", data);
        if (fetch.status == 200) {
            let res = fetch.data
            if (res == "error") {
                ToastAndroid.showWithGravityAndOffset(
                    "حدث خطأ ما",
                    ToastAndroid.SHORT,
                    ToastAndroid.BOTTOM,
                    20,
                    20
                );
            } else {

                setSubject_data(res)
                // console.log(res)
                setloading(false)
                // [{"generation_id": "1", "subject_description": "لاشي", "subject_id": "2", "subject_img": null, "subject_name": "فيزياء"}]

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








    function _renderHeader() {
        return (
            <>
                <StatusBar backgroundColor={App_Colors.primary} barStyle="light-content" />
                <View style={style.header}>
                    <Text style={style.header_text}>المواد الدراسية</Text>
                </View>
            </>
        )
    }

    function _renderBody() {
        return (
            <>
                {
                    connection_Status == "Offline" ?
                        <View style={{ alignItems: "center", justifyContent: "center", height: App_Size.height }}>
                            <Text style={{ color: "#999", fontSize: 20 }}> يجب عليك الاتصال بالانترنت</Text>
                        </View>
                        :
                        loading == true ?
                            <View style={{ alignItems: "center", justifyContent: "center", height: App_Size.height }}>
                                <ActivityIndicator size={30} color={App_Colors.primary} />
                            </View>
                            :
                            <FlatList
                                data={Subject_data}
                                renderItem={({ index, item }) => (
                                    <View style={style.View_Action}>
                                        <TouchableOpacity
                                            onPress={() => {
                                                navigation.navigate("Lectures",
                                                    {
                                                        subject_data: item,
                                                        generation_id: route.params.generation_id
                                                    })
                                                // console.log(route.params.generation_id)
                                            }}

                                            style={style.button}>
                                            <Image source={Images.Images.subject} style={style.Button_Image} />
                                            <View style={style.Button_View}>
                                                <Text style={style.Button_text}>{item.subject_name}</Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                )}

                                ListEmptyComponent={() => (
                                    <View style={{ alignItems: "center", justifyContent: "center", height: App_Size.height }}>
                                        <Text style={{ color: "#999", fontSize: 20 }}>لايوجد مواد</Text>
                                    </View>
                                )}
                            />
                }

            </>
        )
    }


    return (
        <>
            <View style={style.container}>

                {_renderHeader()}
                {_renderBody()}
            </View>
        </>
    )
}
const style = StyleSheet.create({
    container: {
        backgroundColor: App_Colors.white,
        flex: 1,
    },
    header: {
        backgroundColor: App_Colors.white,
        elevation: 5,
        height: 70,
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
    },
    header_text: {
        color: App_Colors.black,
        fontSize: 25,
        fontWeight: "bold"
    },
    View_Action: {
        // height: 200,
        padding: 15,
        width: '100%',
        // backgroundColor: "#514",
        alignItems: "center",
        justifyContent: "space-around"
    },
    button: {
        // height: 100,
        padding: 10,
        width: "95%",
        backgroundColor: "#fff",
        elevation: 7,
        borderRadius: 10,
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center"

    },
    Button_Image: {
        resizeMode: "center",
        height: 70,
        width: 70,

    },
    Button_View:
    {
        width: "75%",
        // backgroundColor: "#525",
        height: 50,
        justifyContent: "center"
    },
    Button_text: {
        color: App_Colors.black,
        fontSize: 18,
        fontWeight: "700"
    }
})

export default Studing_subject;