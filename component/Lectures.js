import React, { useEffect, useState } from "react"
import {
    View, Text, StatusBar, StyleSheet, Image, TouchableOpacity,
    ScrollView,
    ToastAndroid,
    ActivityIndicator
} from "react-native"
import { App_Colors, App_Size } from "../constant/Theme"
import Images from "../constant/Images"
import axios from "axios"
import Api from "../constant/Api"
import NetInfo from '@react-native-community/netinfo';
const Lectures = ({ navigation, route }) => {

    const [lectures_data, setlectures_data] = useState([])
    const [loading, setloading] = useState(false)

    const [connection_Status, setconnection_Status] = useState("")
    useEffect(() => {

        const unsubscripe = NetInfo.addEventListener(state => {

            if (state.isConnected == true) {
                setconnection_Status("Online")
                select_lecture()
            } else {
                setconnection_Status("Offline")
            }
        })
        return unsubscripe



    }, []);

    async function select_lecture() {
        // route.params
        const { subject_data } = route.params
        const { generation_id } = route.params
        let data = {
            generation_id: generation_id,
            subject_id: subject_data.subject_id

        }
        // console.log(data)
        setloading(true)
        let fetch = await axios.post(Api.Domain + "select_lecture.php", data);
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


            } else if (res == "no_lec_yet") {
                setlectures_data([])
                setloading(false)
            }
            else {

                setlectures_data(res)
                setloading(false)
                // console.log(res)
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
                    <Text style={style.header_text}>المحاضرات</Text>
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
                                <View style={{ alignItems: "center", justifyContent: "center", height: App_Size.height }}>
                                    <ActivityIndicator size={30} color={App_Colors.primary} />
                                </View>
                                :



                                lectures_data.length == 0 ?
                                    // <View style={{
                                    //     alignItems: "center",
                                    //     justifyContent: "center",
                                    //     height: App_Size.height
                                    // }}>
                                    //     <Text style={{ fontSize: 20, color: "#777" }}>
                                    //         لا يوجد محاضرات
                                    //     </Text>
                                    // </View>

                                    <View style={style.View_Action}>
                                        <TouchableOpacity
                                            onPress={() => {
                                                // navigation.navigate("Attendance")
                                                navigation.navigate('Generate_qrcode',
                                                    {
                                                        subject_id: route.params.subject_data.subject_id,
                                                        generation_id: route.params.generation_id
                                                    }
                                                )
                                                // console.log(route.params.generation_id)
                                            }}


                                            style={style.button}>
                                            <Image source={Images.Images.new_lecture} style={style.Button_Image} />
                                            <View style={style.Button_View}>
                                                <Text style={style.Button_text}>محاضرات جديدة</Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>








                                    : <>
                                        <View style={style.View_Action}>
                                            <TouchableOpacity
                                                onPress={() => {
                                                    navigation.navigate("Previous_lecture", {
                                                        pre_lecture: lectures_data
                                                    }
                                                    )

                                                }}

                                                style={style.button}>
                                                <Image source={Images.Images.previous_lecture} style={style.Button_Image} />
                                                <View style={style.Button_View}>
                                                    <Text style={style.Button_text}>محاضرات قديمة</Text>
                                                </View>
                                            </TouchableOpacity>
                                        </View>

                                        <View style={style.View_Action}>
                                            <TouchableOpacity
                                                onPress={() => {
                                                    // navigation.navigate("Attendance")
                                                    navigation.navigate('Generate_qrcode',
                                                        {
                                                            subject_id: route.params.subject_data.subject_id,
                                                            generation_id: route.params.generation_id,


                                                        }
                                                    )
                                                }}


                                                style={style.button}>
                                                <Image source={Images.Images.new_lecture} style={style.Button_Image} />
                                                <View style={style.Button_View}>
                                                    <Text style={style.Button_text}>محاضرات جديدة</Text>
                                                </View>
                                            </TouchableOpacity>
                                        </View>


                                    </>



                    }




                </ScrollView>
            </>
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

        padding: 15,
        width: "100%",

        alignItems: "center",
        justifyContent: "center"
    },
    View_Action: {

        padding: 15,
        width: '100%',

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

        height: 50,
        justifyContent: "center"
    },
    Button_text: {
        color: App_Colors.black,
        fontSize: 18,
        fontWeight: "700"
    }
}
)
export default Lectures;














// [{
// "generation_id": "1",
// "lecture_code": "1024526296",
// "lecture_date": "2023-02-27 14:40:59.000000",
// "lecture_id": "9",
// "lecture_name": "محاضره الاولي",
// "locked": "0", "subject_id": "2" },


