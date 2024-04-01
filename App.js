import React, { useContext } from 'react';
// import Login from "./component/Login"
// import Studing_subject from './component/Studing_subject';
// import Generate_qrcode from './component/Generate_qrcode';
import Switch_controle from './component/Swich_controle';
// import Lectures from './component/Lectures';
// import Previous_lecture from "./component/Previous_lecture"
// import Absence from './component/Absence';
// import Classes from './component/Classes';
import Auth from './component/Auth';
import Home from './component/Home';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppContext } from './context/context';
const Stack = createNativeStackNavigator();
const App = () => {
  const { login } = useContext(AppContext)

  return (
    <NavigationContainer>

      <Stack.Navigator screenOptions={{
        headerShown: false
      }}
      >

        {
          login ? (
            <Stack.Screen
              name="Home" component={Home} />
          ) : (

            <Stack.Screen
              name="Auth" component={Auth} />
          )
        }




      </Stack.Navigator>



    </NavigationContainer>
  )
}





export default App;

