import React, { useEffect, useState } from "react"
import {
    View, Text, StatusBar, StyleSheet, Image,
    TouchableOpacity,
    FlatList,
    ToastAndroid,
    ActivityIndicator
} from "react-native"
import { App_Colors, App_Size } from "../constant/Theme"
import Images from "../constant/Images"
import axios from "axios"
import Api from "../constant/Api"
import NetInfo from '@react-native-community/netinfo';
const Absence = ({ navigation, route }) => {
    const [Student_data, setStudent_data] = useState([])
    const [loading, setloading] = useState(false)
    const [connection_Status, setconnection_Status] = useState("")
    useEffect(() => {
        const unsubscripe = NetInfo.addEventListener(state => {

            if (state.isConnected == true) {
                setconnection_Status("Online")

                student()
            } else {
                setconnection_Status("Offline")
            }
        })
        return unsubscripe


    }, []);
    async function student() {
        // route.params
        const { genration_id } = route.params
        const { lecture_id } = route.params
        let data = {
            generation_id: genration_id,
            lecture_id: lecture_id

        }
        // console.log(data)
        setloading(true)
        let fetch = await axios.post(Api.Domain + "select_absence_lecture.php", data);
        if (fetch.status == 200) {
            let res = fetch.data
            // console.log(res)
            if (res == "error") {
                ToastAndroid.showWithGravityAndOffset(
                    "حدث خطأ ما",
                    ToastAndroid.SHORT,
                    ToastAndroid.BOTTOM,
                    20,
                    20
                );


            }
            else {

                setStudent_data(res)
                // console.log(res)
                setloading(false)


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



    // [{"absence": 1, "genration_id": "3", "student_code": "12214", "student_id": "1", "student_name": "سيف زيدان", "student_national_id": "30121454789452"}, {"absence": 0, "genration_id": "3", "student_code": "114741", "student_id": "2", "student_name": "ثروت فرج", "student_national_id": "3201214544125"}]










    function _renderHeader() {
        return (
            <>
                <StatusBar backgroundColor={App_Colors.primary} barStyle="light-content" />
                <View style={style.header}>
                    <Text style={style.header_text}>غياب الطلاب</Text>
                </View>
            </>
        )
    }
    function _renderBody() {
        return (
            <View>
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
                                data={Student_data}
                                renderItem={({ index, item }) => (
                                    <View style={style.Day_absence}>
                                        <View style={[style.markType, {
                                            backgroundColor: item.absence == 0 ? App_Colors.red : App_Colors.primary,
                                        }]}>

                                        </View>
                                        <View style={style.View_student_name}>
                                            <Text style={style.Text_student_name}>{item.student_name}</Text>
                                        </View>
                                    </View>
                                )
                                }
                                ListEmptyComponent={() => (
                                    <View style={{ alignItems: "center", justifyContent: "center", height: App_Size.height }}>
                                        <Text style={{ color: "#999", fontSize: 20 }}>لايوجد  طلاب</Text>
                                    </View>
                                )}


                            />
                }
            </View>
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
    Day_absence: {
        height: 70,
        width: "95%",
        backgroundColor: "#fff",
        alignSelf: "center",
        marginVertical: 10,
        borderRadius: 10,
        elevation: 5,
        flexDirection: "row"

    },
    markType: {
        width: 20,
        height: "100%",

        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10

    },
    View_student_name: {
        // width: "80%",
        // backgroundColor: "#145",
        padding: 10,
        alignItems: "flex-start",
        justifyContent: "center"
    },
    Text_student_name: {
        fontSize: 18,
        // fontWeight: "bold",
        color: App_Colors.black
    }
})
export default Absence;