import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import PopupScreen from "../components/PopupScreen";
import FooterBar from "../components/FooterBar";
import axios from "axios";
import { Alert } from "react-native";

import BASE_URL from "../apiConfig/config";

export default function UpdateNewPasswordScreen() {
  const navigation = useNavigation();
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const route = useRoute(); // Get the route object
  const userId = route.params?.userId || "";

  const [showNewPassword, setShowNewPassword] = useState(false);

  const toggleNewPasswordVisibility = () => {
    setShowNewPassword(!showNewPassword);
  };

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleUpdatePassword = () => {
    if (newPassword == "" || confirmNewPassword == "") {
      return Alert.alert("Empty Field", "Please enter Password");
    } else if (newPassword != confirmNewPassword) {
      return Alert.alert("Password Mismatch", "Please check the Password");
    }
    const insertData = {
      userId: userId,
      newPassword: newPassword,
      confirmPassword: confirmNewPassword,
    };
    const insertUrl = `${BASE_URL}/forgotPasswordChange`;
    // console.log(emailAddress);
    console.log(insertUrl);
    console.log(insertData);
    // Make a PUT or POST request to update the data
    axios
      .post(insertUrl, insertData)
      .then((response) => {
        if (response.data.success) {
          Alert.alert("Password Changed", response.data.message);
          navigation.navigate("Login");
        } else {
          Alert.alert("Unsuccessful", response.data.message);
        }
      })
      .catch((error) => {
        console.error("Error Updating password:", error);
        if (error.response) {
          console.log("Error Response:", error.response.data.message);
        }
        Alert.alert("Error", error.response.data.message);
      });
  };

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "white" }}
      className="flex-grow bg-white "
    >
      <View style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          className="bg-[#fff]"
        >
          <View className="absolute w-[223vw] h-[80vh] left-[-62vw] top-[-49vh] bg-[#0013C0]  rounded-b-full ">
            <View className="mt-[58vh] ">
              <View className="flex-row ">
                <View className=" ml-[4vw]">
                  <TouchableOpacity
                    onPress={() => navigation.navigate("EnterOptScreen")}
                  >
                    <View className="flex m-[auto] ">
                      <Image
                        source={require("../assets/main_board/arrow.png")}
                        className=" w-[10.09216px] h-[15.62988px] ml-[265px]"
                      />
                    </View>
                  </TouchableOpacity>
                </View>
              </View>

              <Text className="text-center text-[#fff] font-bold text-[22px] mt-[10vw] fixed">
                New Password
              </Text>
            </View>
          </View>

          <View className="mt-[36vh]">
            <View>
              <Text className="text-[14px] text-center text-gray-600">
                You have a Problem?
              </Text>
              <Text className="text-[22px] font-bold text-center text-gray-600">
                Don’t Worry!
              </Text>
            </View>

            <View className="mt-[6vh]">
              <View>
                <TextInput
                  className="border-b border-[#00000040] text-gray-700 text-[16px]  w-64  mb-5 mx-auto"
                  value={newPassword}
                  onChangeText={setNewPassword}
                  placeholder="New Password"
                  secureTextEntry={!showNewPassword}
                  required
                />
                <TouchableOpacity
                  onPress={toggleNewPasswordVisibility}
                  className="absolute mb-[5vh] ml-[75vw]"
                >
                  <Image
                    source={
                      showNewPassword
                        ? require("../assets/login/eye.png")
                        : require("../assets/login/eye-crossed.png")
                    }
                    className="w-[5vw] h-[2.5vh]"
                  />
                </TouchableOpacity>
              </View>
              <View>
                <TextInput
                  className="border-b border-[#00000040] text-gray-700 text-[16px] w-64  mb-3 mx-auto"
                  value={confirmNewPassword}
                  onChangeText={setConfirmNewPassword}
                  placeholder="Confirm New Password"
                  secureTextEntry={!showConfirmPassword}
                />
              </View>

              <TouchableOpacity
                onPress={toggleConfirmPasswordVisibility}
                className="absolute mt-[7vh] ml-[75vw]"
              >
                <Image
                  source={
                    showConfirmPassword
                      ? require("../assets/login/eye.png")
                      : require("../assets/login/eye-crossed.png")
                  }
                  className="w-[5vw] h-[2.5vh]"
                />
              </TouchableOpacity>
            </View>

            <View className="mt-[2vh]">
              <TouchableOpacity
                className="bg-[#0013C0] rounded-[15px] w-[auto] mx-auto justify-center py-[10px] px-[4vw] items-center mt-[20px]"
                onPress={handleUpdatePassword}
              >
                <Text className="text-[#fff] text-[15px] font-bold text-center">
                  Update New Password
                </Text>
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
