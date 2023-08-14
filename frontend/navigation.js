import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
const Stack = createNativeStackNavigator();
import { View, Text } from "react-native";
import HomeScreen from "./screens/HomeScreen";
import React from "react";
import MainBoardScreen from "./screens/MainBoardScreen";
import MainBoardScreenAfterLogin from "./screens/MainBoardScreenAfterLogin";

import LoginScreen from "./screens/LoginScreen";
import AquacultureScreen from "./screens/AquacultureScreen";
import FisheriesStartupScreen from "./screens/FisheriesStartupScreen";
import AquacultureStartupScreen from "./screens/AquacultureStartupScreen";

import RegisterScreen from "./screens/RegisterScreen";
import FishermanRegisterScreen from "./screens/FisheriesRegisterScreen";

import UserProfileScreen from "./screens/UserProfileScreen";
import PopupScreen from "./components/PopupScreen";
import SwitchScreen from "./screens/SwitchScreen";

import UserProfileMainScreen from "./screens/UserProfile/UserProfileMainScreen";
import UpdatePasswordScreen from "./screens/UserProfile/UpdatePasswordScreen";
import UpdateUserScreen from "./screens/UserProfile/UpdateUserScreen";
import UpdateProfilePicScreen from "./screens/UserProfile/UpdateProfilePicScreen";

{
  /*FARM SCREENS */
}
import MainFarmScreen from "./screens/FarmScreens/MainFarmScreen";
import UpdateFarmScreen from "./screens/FarmScreens/UpdateFarmScreen";
import UpdateFarmingScreen from "./screens/FarmScreens/UpdateFarmingScreen";
import ViewFarmingRecordsScreen from "./screens/FarmScreens/ViewFarmingRecordsScreen";
import ViewIndividualFarmingRecScreen from "./screens/FarmScreens/ViewIndividualFarmingRecScreen";

{
  /*KNOWLEDGE CENTER SCREEN */
}
import KnowledgeCenterScreen from "./screens/KnowledgeCenter/KnowledgeCenterScreen";
import KnowledgeCenterMainScreen from "./screens/KnowledgeCenter/KnowledgeCenterMainScreen";
import KCIndividualSpecies from "./screens/KnowledgeCenter/KCIndividualSpecies";

import UpdateDataScreen from "./screens/UpdateDataScreen";
import ContactUsScreen from "./screens/ContactUsScreen";
import NotificationScreen from "./screens/NotificationScreen";
import ForgotPasswordScreen from "./screens/ForgotPasswordScreen";
import UpdateNewPasswordScreen from "./screens/UpdateNewPasswordScreen";
import GetAMobileNumberScreen from "./screens/GetAMobileNumberScreen";

{
  /*REGISTRATION SCREEN */
}
import FarmerRegisterScreen from "./screens/FarmerRegisterScreen";
import ExporterRegisterScreen from "./screens/ExporterRegisterScreen";
import FishProcessorRegisterScreen from "./screens/FishProcessorRegisterScreen";

{
  /*TABS INSIDE MAIN BOARD*/
}
import MainFisheriesScreen from "./screens/MainFisheriesScreen";
import MainAquaFarmScreen from "./screens/MainAquaFarmScreen";

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/*TABS INSIDE MAIN BOARD*/}

        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="MainBoard" component={MainBoardScreen} />
        <Stack.Screen
          name="MainBoardScreenAfterLogin"
          component={MainBoardScreenAfterLogin}
        />

        <Stack.Screen
          name="MainFisheriesScreen"
          component={MainFisheriesScreen}
        />

        <Stack.Screen
          name="MainAquaFarmScreen"
          component={MainAquaFarmScreen}
        />

        <Stack.Screen name="MainFarmScreen" component={MainFarmScreen} />
        <Stack.Screen name="UpdateFarmScreen" component={UpdateFarmScreen} />
        <Stack.Screen
          name="UpdateFarmingScreen"
          component={UpdateFarmingScreen}
        />
        <Stack.Screen
          name="ViewFarmingRecordsScreen"
          component={ViewFarmingRecordsScreen}
        />

        <Stack.Screen
          name="ViewIndividualFarmingRecScreen"
          component={ViewIndividualFarmingRecScreen}
        />

        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Switch" component={SwitchScreen} />
        <Stack.Screen name="UpdateData" component={UpdateDataScreen} />
        <Stack.Screen name="Contact" component={ContactUsScreen} />
        <Stack.Screen name="UserProfile" component={UserProfileScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />

        {/*USER PROFILE SCREENS*/}
        <Stack.Screen
          name="UserProfileMainScreen"
          component={UserProfileMainScreen}
        />

        <Stack.Screen
          name="UpdatePasswordScreen"
          component={UpdatePasswordScreen}
        />
        <Stack.Screen name="UpdateUserScreen" component={UpdateUserScreen} />

        <Stack.Screen
          name="UpdateProfilePicScreen"
          component={UpdateProfilePicScreen}
        />

        <Stack.Screen
          name="KnowledgeMain"
          component={KnowledgeCenterMainScreen}
        />
        <Stack.Screen
          name="Knowledge_species"
          component={KnowledgeCenterScreen}
        />
        <Stack.Screen
          name="KCIndividualSpecies"
          component={KCIndividualSpecies}
        />

        <Stack.Screen name="AquaStart" component={AquacultureStartupScreen} />
        <Stack.Screen name="Aquaculture" component={AquacultureScreen} />
        <Stack.Screen name="FishStart" component={FisheriesStartupScreen} />

        <Stack.Screen
          name="FishermanRegister"
          component={FishermanRegisterScreen}
        />
        <Stack.Screen name="FarmerRegister" component={FarmerRegisterScreen} />
        <Stack.Screen
          name="ExporterRegister"
          component={ExporterRegisterScreen}
        />
        <Stack.Screen
          name="FishProcessorRegister"
          component={FishProcessorRegisterScreen}
        />

        <Stack.Screen name="Notification" component={NotificationScreen} />
        <Stack.Screen name="GetANumber" component={GetAMobileNumberScreen} />
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
        <Stack.Screen
          name="UpdatePassword"
          component={UpdateNewPasswordScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
