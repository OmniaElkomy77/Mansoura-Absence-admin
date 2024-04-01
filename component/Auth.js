import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from './Login';
const Stack = createNativeStackNavigator();
const Auth = ({ navigation, route }) => {
    return (

        <Stack.Navigator screenOptions={{
            headerShown: false
        }}
        >
            <Stack.Screen name='Login' component={Login} />

        </Stack.Navigator>


    )

}
export default Auth;


