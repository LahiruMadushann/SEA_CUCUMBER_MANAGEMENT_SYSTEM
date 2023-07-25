import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();
import { View, Text } from 'react-native';
import HomeScreen from './screens/HomeScreen';
import React from 'react';
import MainBoardScreen from './screens/MainBoardScreen';
import LoginScreen from './screens/LoginScreen';
import AquacultureScreen from './screens/AquacultureScreen';
import FisheriesStartupScreen from './screens/FisheriesStartupScreen';
import AquacultureStartupScreen from './screens/AquacultureStartupScreen';

import RegisterScreen from './screens/RegisterScreen';
import FishermanRegisterScreen from './screens/FisheriesRegisterScreen';

import UserProfileScreen from './screens/UserProfileScreen';
import PopupScreen from './components/PopupScreen';
import SwitchScreen from './screens/SwitchScreen';
import KnowledgeCenterScreen from './screens/KnowledgeCenterScreen';
import UpdateDataScreen from './screens/UpdateDataScreen';
import ContactUsScreen from './screens/ContactUsScreen';
import NotificationScreen from './screens/NotificationScreen';
import ForgotPasswordScreen from './screens/ForgotPasswordScreen';
import UpdateNewPasswordScreen from './screens/UpdateNewPasswordScreen';
import GetAMobileNumberScreen from './screens/GetAMobileNumberScreen';

{/*REGISTRATION SCREEN */}
import FarmerRegisterScreen from './screens/FarmerRegisterScreen';
import ExporterRegisterScreen from './screens/ExporterRegisterScreen';
import FishProcessorRegisterScreen from './screens/FishProcessorRegisterScreen';


export default function Navigation() {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown:false}}>
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="MainBoard" component={MainBoardScreen} />
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Switch" component={SwitchScreen} />
                <Stack.Screen name="UpdateData" component={UpdateDataScreen} />
                <Stack.Screen name="Contact" component={ContactUsScreen} />
                <Stack.Screen name="UserProfile" component={UserProfileScreen} />
                <Stack.Screen name="Register" component={RegisterScreen} />
                <Stack.Screen name="Knowledge" component={KnowledgeCenterScreen} />
                <Stack.Screen name="AquaStart" component={AquacultureStartupScreen} />
                <Stack.Screen name="Aquaculture" component={AquacultureScreen} />
                <Stack.Screen name="FishStart" component={FisheriesStartupScreen} />

                <Stack.Screen name="FishermanRegister" component={FishermanRegisterScreen} />
                <Stack.Screen name="FarmerRegister" component={FarmerRegisterScreen} />
                <Stack.Screen name="ExporterRegister" component={ExporterRegisterScreen} />
                <Stack.Screen name="FishProcessorRegister" component={FishProcessorRegisterScreen} />

                <Stack.Screen name="Notification" component={NotificationScreen} />
                <Stack.Screen name="GetANumber" component={GetAMobileNumberScreen} />
                <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
                <Stack.Screen name="UpdatePassword" component={UpdateNewPasswordScreen} />

            </Stack.Navigator>
        </NavigationContainer>
    )
}