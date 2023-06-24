import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();
import { View, Text } from 'react-native';
import HomeScreen from './screens/HomeScreen';
import React from 'react';
import MainBoardScreen from './screens/MainBoardScreen';

export default function Navigation() {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown:false}}>
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="MainBoard" component={MainBoardScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}