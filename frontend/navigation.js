import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
const Stack = createNativeStackNavigator();
import { View, Text } from "react-native";
import HomeScreen from "./screens/HomeScreen";
import React from "react";
import MainBoardScreen from "./screens/MainBoardScreen";

import LoginScreen from "./screens/LoginScreen";

import GetEmailScreen from "./screens/GetEmailScreen";

import RegisterScreen from "./screens/RegisterScreen";

/*FAQ SCREENS */

import FAQScreen from "./screens/FAQScreens/FAQScreen";
import FisheriesFarmingFAQScreen from "./screens/FAQScreens/FisheriesFarmingFAQScreen";

/*PROFILE SCREENS */

import UserProfileMainScreen from "./screens/UserProfile/UserProfileMainScreen";
import UpdatePasswordScreen from "./screens/UserProfile/UpdatePasswordScreen";
import UpdateUserScreen from "./screens/UserProfile/UpdateUserScreen";
import UpdateProfilePicScreen from "./screens/UserProfile/UpdateProfilePicScreen";

/*EXPORTER */

import AllProcessorsScreen from "./screens/ExporterScreens/AllProcessorsScreen";
import SingleProcessorScreen from "./screens/ExporterScreens/SingleProcessorScreen";

/*DISTRICT AQUACULTURIST */

import AllFarmsScreen from "./screens/AquaculturistScreens/AllFarmsScreen";
import CreateAdsScreen from "./screens/AquaculturistScreens/CreateAdsScreen";

/*FARM SCREENS */

import MainFarmScreen from "./screens/FarmScreens/MainFarmScreen";
import UpdateFarmScreen from "./screens/FarmScreens/UpdateFarmScreen";
import UpdateFarmingScreen from "./screens/FarmScreens/UpdateFarmingScreen";
import ViewFarmingRecordsScreen from "./screens/FarmScreens/ViewFarmingRecordsScreen";
import ViewIndividualFarmingRecScreen from "./screens/FarmScreens/ViewIndividualFarmingRecScreen";

/*KNOWLEDGE CENTER SCREEN */

import KnowledgeCenterScreen from "./screens/KnowledgeCenter/KnowledgeCenterScreen";
import KnowledgeCenterMainScreen from "./screens/KnowledgeCenter/KnowledgeCenterMainScreen";
import KCIndividualSpecies from "./screens/KnowledgeCenter/KCIndividualSpecies";
import ArticlesCategoryScreen from "./screens/KnowledgeCenter/ArticlesCategoryScreen";
import ArticlesScreen from "./screens/KnowledgeCenter/ArticlesScreen";

import ContactUsScreen from "./screens/ContactUsScreen";
// import EnterOptScreen from "./screens/EnterOptScreen";
// import UpdateNewPasswordScreen from "./screens/UpdateNewPasswordScreen";
// import GetAMobileNumberScreen from "./screens/GetAMobileNumberScreen";

/*REGISTRATION SCREEN */

import FarmerRegisterScreen from "./screens/RegistrationScreens/FarmerRegisterScreen";
import ExporterRegisterScreen from "./screens/RegistrationScreens/ExporterRegisterScreen";
import ProcessorRegisterScreen from "./screens/RegistrationScreens/ProcessorRegisterScreen";
import FishermanRegisterScreen from "./screens/RegistrationScreens/FishermenRegisterScreen";

/*TABS INSIDE MAIN BOARD*/

import MainFisheriesScreen from "./screens/MainFisheriesScreen";
import MainAquaFarmScreen from "./screens/MainAquaFarmScreen";

/*NOTIFICATION SCREENS*/

import MainNotificationScreen from "./screens/NotificationScreens/MainNotificationScreen";
import SingleNotificationScreen from "./screens/NotificationScreens/SingleNotificationScreen";

import MainAdvertisementScreen from "./screens/AdvertisementScreens/MainAdvertisementScreen";
import SingleAdvertisementScreen from "./screens/AdvertisementScreens/SingleAdvertisementScreen";

/*NAQDA MANAGEMENT USER SCREENS*/

import FarmRegisterScreen from "./screens/NaqdaMngUserScreens/FarmRegisterScreen";
import EnterSeaCucumberRatesScreen from "./screens/NaqdaMngUserScreens/EnterSeaCucumberRatesScreen";
import EnterSeaCucumberNewsScreen from "./screens/NaqdaMngUserScreens/EnterSeaCucumberNewsScreen";

/*PROCESSOR SCREEN */

import EnterProcessedDataScreen from "./screens/ProcessorScreens/EnterProcessedDataScreen";

import ViewProcessedRecordsScreen from "./screens/ProcessorScreens/ViewProcessedRecordsScreen";
import ViewSingleProcessedRecScreen from "./screens/ProcessorScreens/ViewSingleProcessedRecScreen";

// import EnterFishingDetailsScreen from "./screens/FishermanScreens/EnterFishingDetailsScreen";
// import ViewAllFishingRecordsScreen from "./screens/FishermanScreens/ViewAllFishingRecordsScreen";
// import ViewSingleFishingRecScreen from "./screens/FishermanScreens/ViewSingleFishingRecScreen";

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/*TABS INSIDE MAIN BOARD*/}
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="MainBoard" component={MainBoardScreen} />
        <Stack.Screen name="MainFisheriesScreen" component={MainFisheriesScreen} />
        <Stack.Screen name="MainAquaFarmScreen" component={MainAquaFarmScreen} />

        <Stack.Screen name="Contact" component={ContactUsScreen} />

        <Stack.Screen name="Login" component={LoginScreen} />

        {/*REGISTRATION SCREENS*/}
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="ExporterRegister" component={ExporterRegisterScreen} />
        <Stack.Screen name="FarmerRegister" component={FarmerRegisterScreen} />
        <Stack.Screen name="ProcessorRegisterScreen" component={ProcessorRegisterScreen} />
        <Stack.Screen name="FishermanRegisterScreen" component={FishermanRegisterScreen} />

        <Stack.Screen name="GetEmailScreen" component={GetEmailScreen} />

        {/*KNOWLEDGE CENTER SCREENS*/}
        <Stack.Screen name="KnowledgeMain" component={KnowledgeCenterMainScreen} />
        <Stack.Screen name="Knowledge_species" component={KnowledgeCenterScreen} />
        <Stack.Screen name="KCIndividualSpecies" component={KCIndividualSpecies} />
        <Stack.Screen name="ArticlesCategoryScreen" component={ArticlesCategoryScreen} />
        <Stack.Screen name="ArticlesScreen" component={ArticlesScreen} />

        {/*FAQS SCREENS*/}
        <Stack.Screen name="FAQScreen" component={FAQScreen} />
        <Stack.Screen name="FisheriesFarmingFAQScreen" component={FisheriesFarmingFAQScreen} />

        {/*NOTIFICATION SCREENS*/}

        <Stack.Screen name="MainNotificationScreen" component={MainNotificationScreen} />
        <Stack.Screen name="SingleNotificationScreen" component={SingleNotificationScreen} />

        {/*ADVERTISEMENT SCREENS*/}
        <Stack.Screen name="MainAdvertisementScreen" component={MainAdvertisementScreen} />
        <Stack.Screen name="SingleAdvertisementScreen" component={SingleAdvertisementScreen} />

        {/*USER PROFILE SCREENS*/}
        <Stack.Screen name="UserProfileMainScreen" component={UserProfileMainScreen} />
        <Stack.Screen name="UpdatePasswordScreen" component={UpdatePasswordScreen} />
        <Stack.Screen name="UpdateUserScreen" component={UpdateUserScreen} />
        <Stack.Screen name="UpdateProfilePicScreen" component={UpdateProfilePicScreen} />

        {/*FARM SCREENS*/}
        <Stack.Screen name="MainFarmScreen" component={MainFarmScreen} />
        <Stack.Screen name="UpdateFarmScreen" component={UpdateFarmScreen} />
        <Stack.Screen name="UpdateFarmingScreen" component={UpdateFarmingScreen} />
        <Stack.Screen name="ViewFarmingRecordsScreen" component={ViewFarmingRecordsScreen} />
        <Stack.Screen name="ViewIndividualFarmingRecScreen" component={ViewIndividualFarmingRecScreen} />

        {/*EXPORTER SCREENS*/}
        <Stack.Screen name="SingleProcessorScreen" component={SingleProcessorScreen} />
        <Stack.Screen name="AllProcessorsScreen" component={AllProcessorsScreen} />

        {/*PROCESSOR SCREENS*/}
        <Stack.Screen name="EnterProcessedDataScreen" component={EnterProcessedDataScreen} />
        <Stack.Screen name="ViewProcessedRecordsScreen" component={ViewProcessedRecordsScreen} />
        <Stack.Screen name="ViewSingleProcessedRecScreen" component={ViewSingleProcessedRecScreen} />

        {/*AQUACULTURIST SCREENS*/}
        <Stack.Screen name="AllFarmsScreen" component={AllFarmsScreen} />
        <Stack.Screen name="CreateAdsScreen" component={CreateAdsScreen} />

        {/*NAQDA MANAGEMENT USER SCREENS*/}
        <Stack.Screen name="FarmRegisterScreen" component={FarmRegisterScreen} />
        <Stack.Screen name="EnterSeaCucumberRatesScreen" component={EnterSeaCucumberRatesScreen} />
        <Stack.Screen name="EnterSeaCucumberNewsScreen" component={EnterSeaCucumberNewsScreen} />

        {/*
       
  
       

        <Stack.Screen name="GetANumber" component={GetAMobileNumberScreen} />
      
        <Stack.Screen name="EnterOptScreen" component={EnterOptScreen} />
        <Stack.Screen
          name="UpdatePassword"
          component={UpdateNewPasswordScreen}
        />

      

        <Stack.Screen
          name="EnterProcessedDataScreen"
          component={EnterProcessedDataScreen}
        />

        <Stack.Screen
          name="EnterFishingDetailsScreen"
          component={EnterFishingDetailsScreen}
        />

        <Stack.Screen
          name="ViewAllFishingRecordsScreen"
          component={ViewAllFishingRecordsScreen}
        />

        <Stack.Screen
          name="ViewSingleFishingRecScreen"
          component={ViewSingleFishingRecScreen}
        />

   

      

       
        */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
