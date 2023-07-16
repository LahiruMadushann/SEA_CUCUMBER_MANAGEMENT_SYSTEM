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
import AquacultureRegisterScreen from './screens/AquacultureRegisterScreen';
import FisheriesRegisterScreen from './screens/FisheriesRegisterScreen';
import UserRegisterScreen from './screens/UserRegisterScreen';
import UserProfileScreen from './screens/UserProfileScreen';
import PopupScreen from './components/PopupScreen';
import SwitchScreen from './screens/SwitchScreen';
import KnowledgeCenterScreen from './screens/KnowledgeCenterScreen';

export default function Navigation() {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown:false}}>
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="MainBoard" component={MainBoardScreen} />
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Switch" component={SwitchScreen} />
                <Stack.Screen name="UserProfile" component={UserProfileScreen} />
                <Stack.Screen name="Register" component={RegisterScreen} />
                <Stack.Screen name="Knowledge" component={KnowledgeCenterScreen} />
                <Stack.Screen name="AquaStart" component={AquacultureStartupScreen} />
                <Stack.Screen name="Aquaculture" component={AquacultureScreen} />
                <Stack.Screen name="FishStart" component={FisheriesStartupScreen} />
                <Stack.Screen name="AquaRegister" component={AquacultureRegisterScreen} />
                <Stack.Screen name="FishRegister" component={FisheriesRegisterScreen} />
                <Stack.Screen name="UserRegister" component={UserRegisterScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}