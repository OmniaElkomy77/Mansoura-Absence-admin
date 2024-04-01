import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Studing_subject from './Studing_subject';
import Generate_qrcode from './Generate_qrcode';
// import Switch_controle from './component/Swich_controle';
import Lectures from './Lectures';
import Previous_lecture from "./Previous_lecture"
import Absence from './Absence';
import Classes from './Classes';
import Pre_lecture_code from "./Pre_lecture_code"
const Stack = createNativeStackNavigator();
const Home = ({ navigation, route }) => {
    return (

        <Stack.Navigator screenOptions={{
            headerShown: false
        }}
        >
            <Stack.Screen name='Classes' component={Classes} />
            <Stack.Screen name='Lectures' component={Lectures} />

            <Stack.Screen
                name="Studing_subject" component={Studing_subject} />
            <Stack.Screen name="Previous_lecture" component={Previous_lecture} />
            <Stack.Screen name="Absence" component={Absence} />
            <Stack.Screen
                name="Generate_qrcode" component={Generate_qrcode} />
            <Stack.Screen
                name="Pre_lecture_code" component={Pre_lecture_code} />
        </Stack.Navigator>


    )

}
export default Home;


