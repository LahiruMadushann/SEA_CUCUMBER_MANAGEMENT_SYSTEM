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
  );
}
