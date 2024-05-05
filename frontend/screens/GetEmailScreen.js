import React, { useState } from "react";
import axios from "axios";
import { Alert } from "react-native";
import { View, Text, StyleSheet, StatusBar, TouchableOpacity, TextInput, ScrollView, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import FooterBar from "../components/FooterBar";

import BASE_URL from "../apiConfig/config";

export default function GetEmailScreen() {
  const navigation = useNavigation();
  const [emailAddress, setemailAddress] = useState("");

  const handleEmail = () => {
    if (emailAddress == "") {
      return Alert.alert("Invalid Input", "Please enter your email address");
    }
    const insertData = {
      email: emailAddress,
    };
    const insertUrl = `${BASE_URL}/emailOtpSend`;
    // console.log(emailAddress);

    // Make a PUT or POST request to update the data
    axios
      .post(insertUrl, insertData)
      .then((response) => {
        console.log(response.data.success);
        if (response.data.success) {
          Alert.alert("Successful", response.data.message);
          navigation.navigate("EnterOptScreen", {
            email: response.data.email,
            userId: response.data.userId,
          });
        } else {
          Alert.alert("Unsuccessful", response.data.message);
        }
      })
      .catch((error) => {
        console.error("Error sending Otp:", error);
        Alert.alert("Error", "An error occurred while sending Otp");
      });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }} className="flex-grow bg-white ">
      <View style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="bg-[#fff]">
          <View className="absolute w-[162vw] h-[50vh] left-[-32vw] top-[-20vh] bg-[#0013C0]  rounded-b-full ">
            <View className="flex-row">
              <View className="ml-[42vw] mt-[26vh]">
                <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                  <View className="flex m-[auto] ">
                    <Image source={require("../assets/main_board/arrow.png")} className=" w-[10.09216px] h-[15.62988px] " />
                  </View>
                </TouchableOpacity>
              </View>
            </View>

            <View>
              <Text className="text-center text-[22px] text-[#ffff] font-bold mt-[12vw]">Forgot Password</Text>
            </View>
          </View>

          <View className="mt-[40vh]">
            <View>
              <Text className="text-[14px] text-center text-gray-600">You have a Problem?</Text>
              <Text className="text-[22px] font-bold text-center text-gray-600">Don’t Worry!</Text>
            </View>

            <View className="mx-[auto] mt-[5vh]">
              <TextInput
                className="text-[18px] border-b border-gray-400 text-gray-700 w-[70vw] p-[0.5px]"
                value={emailAddress}
                onChangeText={setemailAddress}
                placeholderTextColor="#808080"
                placeholder="Enter Email Here"
                required
              />
            </View>

            <TouchableOpacity
              className=" w-[275px] bg-[#0013C0] rounded-[15px] mx-auto justify-center py-[10px] items-center mt-[6vh]"
              activeOpacity={0.8}
              onPress={handleEmail}
            >
              <Text className="text-[#fff] text-[18px] font-bold text-center">Continue</Text>
            </TouchableOpacity>
            <View className="flex-row mt-[4vh] mx-auto">
              <Text className="text-[16px] text-gray-500">No Problem? </Text>
              <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                <Text className="text-[16px] font-bold text-gray-600">Sign In</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
        <View style={{ marginBottom: 5 }}>
          <FooterBar />
        </View>
      </View>
    </SafeAreaView>
  );
}
