import React, { useState, useEffect } from "react"
import {
    View, Text, StatusBar, TouchableOpacity, StyleSheet, ScrollView, ToastAndroid,
    Modal, TouchableWithoutFeedback, TextInput, ActivityIndicator
} from "react-native"
import { App_Colors, App_Size } from "../constant/Theme"
import QRCode from 'react-native-qrcode-svg';
import Api from "../constant/Api";
import axios from "axios"
import NetInfo from '@react-native-community/netinfo';
const Pre_lecture_code = ({ navigation, route }) => {
    const [show_qr, setshow_qr] = React.useState(false)
    const [lectures_data, setlectures_data] = useState("")
    const [Modal_add_lecture, setModal_add_lecture] = React.useState(false);
    const [lecture_name, setlecture_name] = React.useState("")
    const [loading, setloading] = useState(false)
    // const [open_lecture, setopen_lecture] = React.useState(false)
    // const [lecture_id, setlecture_id] = React.useState("")
    const [lecture_status, setlecture_status] = React.useState(false)
    const [locked_val, setlocked_val] = React.useState(0)
    const [connection_Status, setconnection_Status] = useState("")

    useEffect(() => {
        const unsubscripe = NetInfo.addEventListener(state => {

            if (state.isConnected == true) {
                setconnection_Status("Online")


            } else {
                setconnection_Status("Offline")
            }
        })
        return unsubscripe


    }, []);






    // async function Add_lecture() {
    //     // route.params
    //     const { subject_id } = route.params
    //     const { generation_id } = route.params
    //     let data = {

    //         generation_id: generation_id,
    //         subject_id: subject_id,
    //         lecture_name: lecture_name

    //     }
    //     // console.log(data)
    //     // {"lecture_id": 30, "roundom_code": 2135792091}
    //     let fetch = await axios.post(Api.Domain + "add_lecture.php", data);
    //     if (fetch.status == 200) {
    //         // console.log(fetch.data)
    //         let res = fetch.data
    //         if (res == "error") {
    //             ToastAndroid.showWithGravityAndOffset(
    //                 "حدث خطأ ما",
    //                 ToastAndroid.SHORT,
    //                 ToastAndroid.BOTTOM,
    //                 20,
    //                 20
    //             );


    //         } else if (res == "lecture_found") {
    //             ToastAndroid.showWithGravityAndOffset(
    //                 " يوجد محاضره بذلك الاسم مسبقاً",
    //                 ToastAndroid.SHORT,
    //                 ToastAndroid.BOTTOM,
    //                 20,
    //                 20
    //             );
    //         }
    //         else {
    //             setlectures_data(res.roundom_code + "")
    //             // console.log(res)
    //             setlecture_id(res.lecture_id)
    //             setTimeout(() => {
    //                 setshow_qr(true)
    //                 setloading(false)
    //                 // setopen_lecture(true)
    //             }, 200);
    //         }
    //     } else {
    //         ToastAndroid.showWithGravityAndOffset(
    //             "حدث خطأ ما",
    //             ToastAndroid.SHORT,
    //             ToastAndroid.BOTTOM,
    //             20,
    //             20
    //         );
    //     }


    // }



    async function Cancel_lecture() {
        // route.params
        const { lecture_id } = route.params

        let data = {
            lecture_id: lecture_id,
            locked_val: !locked_val
        }
        // console.log(data)
        let fetch = await axios.post(Api.Domain + "update_lecture_lock.php", data);
        if (fetch.status == 200) {
            console.log(fetch.data)
            let res = fetch.data
            if (res == "error") {
                ToastAndroid.showWithGravityAndOffset(
                    "حدث خطأ ما",
                    ToastAndroid.SHORT,
                    ToastAndroid.BOTTOM,
                    20,
                    20
                );


            } else if (res == "success") {
                ToastAndroid.showWithGravityAndOffset(
                    "تم تغير وضع المحاضره",
                    ToastAndroid.SHORT,
                    ToastAndroid.BOTTOM,
                    20,
                    20
                );
                if (lecture_status == true) {
                    setlecture_status(false)
                    setlocked_val(0)
                } else {
                    setlecture_status(true)
                    setlocked_val(1)
                }

            }
            else {
                ToastAndroid.showWithGravityAndOffset(
                    "حدث خطأ ما",
                    ToastAndroid.SHORT,
                    ToastAndroid.BOTTOM,
                    20,
                    20
                );
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
                    <Text style={style.header_text}>كود المحاضرة</Text>
                </View>
            </>
        )
    }

    function _renderBody() {
        return (
            <>
                <ScrollView>

                    {

                        connection_Status == "Offline" ?
                            <View style={{ alignItems: "center", justifyContent: "center", height: App_Size.height }}>
                                <Text style={{ color: "#999", fontSize: 20 }}> يجب عليك الاتصال بالانترنت</Text>
                            </View>
                            :

                            loading == true ?
                                <View style={{ height: App_Size.height / 2, alignItems: "center", justifyContent: "center" }}>
                                    <ActivityIndicator size={30} color={App_Colors.primary} />

                                </View>
                                :
                                <>

                                    <View style={style.Qrcode_generate}>
                                        <QRCode
                                            value={route.params.lecture_code}
                                            size={300}
                                        />
                                    </View>


                                    <View style={style.View_Qr_code_num}>
                                        <Text style={style.Text_Qr_code_num}>{route.params.lecture_code}</Text>
                                    </View>



                                </>
                    }




                    <View style={style.View_Action}>

                        <TouchableOpacity
                            onPress={() => {
                                // setshow_qr(false)


                                if (connection_Status == "Offline") {
                                    ToastAndroid.showWithGravityAndOffset(
                                        "يجب عليك الاتصال بالانترنت",
                                        ToastAndroid.SHORT,
                                        ToastAndroid.BOTTOM,
                                        20,
                                        20
                                    );
                                } else {
                                    Cancel_lecture()
                                }

                            }}

                            style={[style.button, {
                                backgroundColor: App_Colors.primary
                            }]}>

                            <Text style={style.button_text}>{lecture_status == false ? "فتح" : "الغاء"}</Text>

                        </TouchableOpacity>

                        {/* {show_qr == true ? null : <TouchableOpacity
                            onPress={() => {
                                // setshow_qr(true)
                                // Add_lecture()
                                if (connection_Status == "Offline") {
                                    ToastAndroid.showWithGravityAndOffset(
                                        "يجب عليك الاتصال بالانترنت",
                                        ToastAndroid.SHORT,
                                        ToastAndroid.BOTTOM,
                                        20,
                                        20
                                    );
                                } else {
                                    setModal_add_lecture(true)
                                }
                            }}
                            style={[style.button, {
                                backgroundColor: App_Colors.red
                            }]}>
                            <Text style={style.button_text}>انشاء محاضره</Text>

                        </TouchableOpacity>} */}

                    </View>
                </ScrollView>
            </>
        )
    }

    function _modal() {
        return (
            <Modal
                visible={Modal_add_lecture}
                onRequestClose={() => {
                    setModal_add_lecture(false)
                }}
                animationType="slide"
                // presentationStyle="formSheet"s
                transparent={true}>
                <View
                    style={{
                        // opacity:0.7,
                        backgroundColor: 'rgba(0,0,0,0.6)',
                        flex: 1,
                        justifyContent: 'flex-end',
                    }}>
                    <TouchableWithoutFeedback
                        style={{ flex: 1 }}
                        onPress={() => {
                            setModal_add_lecture(false)
                        }}>
                        <View
                            style={{
                                position: 'absolute',
                                height: '100%',
                                width: '100%',
                            }}
                        />
                    </TouchableWithoutFeedback>
                    <View
                        style={{
                            height: App_Size.height,
                            // width: width,
                            flex: 1,
                            // alignContent: 'center',
                            justifyContent: 'space-around',
                        }}>
                        <View
                            style={{
                                // height:height,
                                alignSelf: 'center',
                                justifyContent: 'space-around',
                                width: '90%',
                                backgroundColor: App_Colors.white,
                                borderRadius: 10,
                                elevation: 5,
                                paddingVertical: 15,
                                marginBottom: 10,
                            }}>

                            <View
                                style={{
                                    // height: 50,
                                    // width: '100%',
                                    // backgroundColor: "#858",
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}>
                                <Text
                                    style={{ color: App_Colors.black, fontWeight: 'bold', fontSize: 20 }}>
                                    إضافه محاضره
                                </Text>
                            </View>


                            <View style={{
                                // height: "40%",
                                // backgroundColor: "#125",
                                alignItems: 'center',
                                justifyContent: "center"

                            }}>
                                <TextInput style={{
                                    padding: 15,

                                    width: "95%", backgroundColor: "#eee",
                                    color: App_Colors.black,
                                    borderRadius: 10,
                                    marginTop: 20
                                }}
                                    placeholder="أدخل اسم المحاضره"
                                    placeholderTextColor={"#999"}
                                    value={lecture_name}
                                    onChangeText={(value) => {
                                        setlecture_name(value)
                                    }}

                                />


                            </View>
                            <View
                                style={{
                                    height: 100,
                                    width: '100%',
                                    flexDirection: 'row',
                                    justifyContent: 'space-around',
                                    // backgroundColor: "#eee",
                                    alignItems: 'center',
                                }}>
                                <TouchableOpacity
                                    onPress={() => {

                                        setModal_add_lecture(false)
                                        Add_lecture()
                                        setloading(true)
                                    }}
                                    style={{
                                        height: 50,
                                        width: 100,
                                        backgroundColor: App_Colors.primary,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        borderRadius: 10,
                                    }}>
                                    <Text
                                        style={{ color: '#fff', fontWeight: 'bold', fontSize: 18 }}>
                                        تأكيد
                                    </Text>
                                </TouchableOpacity>

                            </View>
                        </View>
                    </View>
                    <TouchableWithoutFeedback
                        style={{ flex: 1 }}
                        onPress={() => {
                            setModal_add_lecture(false)
                        }}>
                        <View
                            style={{
                                width: '100%',
                            }}
                        />
                    </TouchableWithoutFeedback>
                </View>
            </Modal>

        )
    }



    return (
        <>
            <View style={style.container}>

                {_renderHeader()}
                {_renderBody()}
                {_modal()}
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
    Qrcode_generate: {
        height: App_Size.height / 2,
        // backgroundColor: "#010",
        alignItems: "center",
        justifyContent: "center"
    },
    View_Action: {
        height: 100,
        width: "100%",
        // backgroundColor: "#852",
        alignItems: "center",
        justifyContent: "space-around",
        flexDirection: "row"

    }, button: {
        height: 70,

        width: 150,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center"
    },
    button_text: {
        fontSize: 18,
        fontWeight: "bold",
        color: App_Colors.white
    },
    Qr_text: {
        fontSize: 25,
        fontWeight: "bold",
        color: "#777"
    },
    View_Qr_code_num: {
        height: 100,
        width: "95%",
        alignSelf: "center",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10,
        backgroundColor: "#eee"
    },
    Text_Qr_code_num: {
        fontSize: 30,
        fontWeight: "bold",
        color: App_Colors.black
    }

})

export default Pre_lecture_code;