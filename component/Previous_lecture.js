import React, { useEffect, useState } from "react"
import { View, Text, StatusBar, StyleSheet, Image, TouchableOpacity, ScrollView, FlatList } from "react-native"
import { App_Colors, App_Size } from "../constant/Theme"
import Images from "../constant/Images"
import NetInfo from '@react-native-community/netinfo';
import ModalHome from 'react-native-modalbox';
const Previous_lecture = ({ navigation, route }) => {
    const [lectures, setlectures] = useState([])
    const [connection_Status, setconnection_Status] = useState("")
    const [modalVisible, setmodalVisible] = useState(false)
    const [generation_id, setgeneration_id] = useState("")
    const [lecture_id, setlecture_id] = useState("")
    const [lecture_code, setlecture_code] = useState("")
    useEffect(() => {
        const unsubscripe = NetInfo.addEventListener(state => {

            if (state.isConnected == true) {
                setconnection_Status("Online")

                pre_lecture()
            } else {
                setconnection_Status("Offline")
            }
        })
        return unsubscripe

    }, []);

    function pre_lecture() {
        const { pre_lecture } = route.params
        setlectures(pre_lecture)

    }

    function _renderHeader() {
        return (
            <>
                <StatusBar backgroundColor={App_Colors.primary} barStyle="light-content" />
                <View style={style.header}>
                    <Text style={style.header_text}>المحاضرات القديمة</Text>
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



                        <FlatList data={lectures}
                            renderItem={({ index, item }) => (
                                <View style={style.View_Action}>
                                    <TouchableOpacity
                                        onPress={() => {
                                            // navigation.navigate("Absence", {
                                            //     genration_id: item.generation_id,
                                            //     lecture_id: item.lecture_id
                                            // })
                                            setgeneration_id(item.generation_id)
                                            setlecture_id(item.lecture_id)
                                            setlecture_code(item.lecture_code)
                                            setmodalVisible(true)

                                            // console.log(item)
                                            // { "generation_id": "1", "lecture_code": "488058274", "lecture_date": "2023-03-12 04:37:37.037399", "lecture_id": "11", "lecture_name": "المحاضره التمهيديه"
                                            // , "locked": "0", "subject_id": "2"}
                                        }}

                                        style={style.button}>
                                        <Image source={Images.Images.old_lecture} style={style.Button_Image} />
                                        <View style={style.Button_View}>
                                            <Text style={style.Button_text}>{item.lecture_name}</Text>
                                        </View>
                                        <View>
                                            <Text style={style.date}>{item.lecture_date.slice(0, 10)}</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>

                            )} />
                }






            </>
        )
    }




    function modalVisible_bottom() {
        return (
            <ModalHome
                onRequestClose={() => {
                    setmodalVisible(false)
                }}
                style={{
                    height: (App_Size.height) / 4,

                    backgroundColor: '#fff',

                }}
                backButtonClose={true}
                backdropPressToClose={true}
                isOpen={modalVisible}
                backdrop={true}

                onClosed={() => {
                    setmodalVisible(false)
                }}
                swipeArea={50}

                position="bottom"
                useNativeDriver={true}>
                <TouchableOpacity
                    style={{

                        height: 100,

                        alignItems: 'flex-end',
                        justifyContent: 'center',
                        borderBottomWidth: 1,
                        borderColor: '#777',
                        paddingRight: 15,
                    }}
                    onPress={() => {
                        navigation.navigate("Absence", {
                            genration_id: generation_id,
                            lecture_id: lecture_id
                        })
                    }}>
                    <Text style={{ fontSize: 20, color: App_Colors.black }}> الطلاب</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{

                        height: 100,

                        alignItems: 'flex-end',
                        justifyContent: 'center',
                        paddingRight: 15,
                        // borderBottomWidth: 1,
                        // borderColor: '#777',
                    }}
                    onPress={() => {
                        navigation.navigate("Pre_lecture_code", {
                            lecture_code: lecture_code,
                            lecture_id: lecture_id
                        })
                        // setmodalVisible(false)
                    }}>
                    <Text style={{ fontSize: 20, color: App_Colors.black }}>كود المحاضره</Text>
                </TouchableOpacity>




            </ModalHome>
        )
    }














    return (
        <View style={style.container}>
            {
                _renderHeader()
            }
            {
                _renderBody()
            }
            {
                modalVisible_bottom()
            }
        </View>
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
    View_Image: {
        // height: 150,
        padding: 15,
        width: "100%",

        alignItems: "center",
        justifyContent: "center"
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
        width: "50%",
        // backgroundColor: "#525",
        height: 50,
        justifyContent: "center"
    },
    Button_text: {
        color: App_Colors.black,
        fontSize: 18,
        fontWeight: "700"
    },
    date: {
        color: "#999",
        fontSize: 15
    }
}
)
export default Previous_lecture;
