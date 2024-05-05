import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Navigation from "./navigation";

{
  /* IMPORTS TO KEEP THE TOKEN DATA THROUGH OUT THE APP*/
}
import React from "react";
import { AuthProvider } from "./auth/AuthContext";

export default function App() {
  return (
    <AuthProvider>
      <Navigation />
    </AuthProvider>
    // <View className="mt-[107vw] flex-1 justify-center items-center">
    //   <Text className="text-center text-[#000000CC] text-[28px] font-bold">Sea Cucumber</Text>
    // </View>
  );
}
