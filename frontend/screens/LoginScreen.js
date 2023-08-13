import axios from "axios";
import { Alert } from "react-native";

import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import FooterBar from "../components/FooterBar";

export default function LoginScreen() {
  const navigation = useNavigation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // Assuming you have a backend API endpoint, replace 'YOUR_BACKEND_URL' with the actual URL
    const backendUrl = "http://192.168.43.75:3000/login";

    const userData = {
      username: username,
      password: password,
    };
    axios
      .post(backendUrl, userData)
      .then((response) => {
        if (response.data.success) {
          const token = response.data.token;
          console.log("Token:", token);
          // Handle successful login, possibly by navigating to another screen
          navigation.navigate("MainBoardScreenAfterLogin");
        } else {
          // Show an alert for unsuccessful login
          Alert.alert(
            "Login Error",
            "Unsuccessful login. Please check your credentials."
          );
        }
      })
      .catch((error) => {
        console.error("Login error:", error);
        // Handle login error, such as displaying an error message to the user
        Alert.alert(
          "Login Error",
          "Unsuccessful login. Please check your credentials."
        );
      });
  };

  return (
    <ScrollView className="flex-grow bg-white">
      <SafeAreaView>
        <View className="absolute w-[162vw] h-[50vh] left-[-32vw] top-[-16vh] bg-[#0013C0]  rounded-b-full ">
          <View className="flex-row">
            <View className="ml-[42vw] mt-[24vh]">
              <TouchableOpacity onPress={() => navigation.navigate("Register")}>
                <View className="flex m-[auto] ">
                  <Image
                    source={require("../assets/main_board/arrow.png")}
                    className=" w-[10.09216px] h-[15.62988px] "
                  />
                </View>
              </TouchableOpacity>
            </View>

            <View className="mt-[24.6vh] ml-[72vw]">
              <TouchableOpacity
                onPress={() => navigation.navigate("MainBoard")}
              >
                <View className="flex m-[auto] ">
                  <Image
                    source={require("../assets/fisheries/dotIcon.png")}
                    className=" w-[24.21875px] h-[7.03125px] "
                  />
                </View>
              </TouchableOpacity>
            </View>
          </View>

          <View>
            <Text className="text-center text-[22px] text-[#ffff] font-bold mt-[12vw]">
              Login
            </Text>
          </View>
        </View>

        <View className="mt-[56vw] form space-y-2 mx-auto ">
          <TextInput
            className="p-4 border-b text-gray-700  w-64  mb-3"
            value={username}
            onChangeText={setUsername}
            placeholder="Enter Username here"
          />

          <TextInput
            className="p-4 border-b text-gray-700  w-64  mb-3"
            value={password}
            onChangeText={setPassword}
            placeholder="Enter Password here"
          />
        </View>

        <TouchableOpacity onPress={handleLogin}>
          <View className="w-[275px] h-[46px] mx-auto mt-[6vw]">
            <Text className="bg-[#0013C0] font-bold text-[#FFFFFF] text-center text-[18px] px-[24px] py-[10px] rounded-[15px]">
              Login
            </Text>
          </View>
        </TouchableOpacity>

        <View className="mx-auto flex-row mt-[22px]">
          <Text className="text-[#000000BF] text-[14px] ">
            Forget your Password?
          </Text>

          <TouchableOpacity onPress={() => navigation.navigate("GetANumber")}>
            <Text className="text-[#0013C0CC] ml-[2vw] text-[14px]">
              Click here
            </Text>
          </TouchableOpacity>
        </View>

        <View className="flex-row align-center w-[335px]  mx-auto mt-4 ">
          <View className="flex-1 h-px bg-[#0013C080] " />
        </View>

        <View className="mx-auto flex-row mt-[22px]">
          <Text className="text-[#000000BF] text-[14px] ">
            Don't you have account
          </Text>

          <TouchableOpacity onPress={() => navigation.navigate("Register")}>
            <Text className="text-[#0013C0CC] ml-[2vw] text-[14px]">
              Sign up
            </Text>
          </TouchableOpacity>
        </View>

        <View className="ml-[46.5vw] flex-row mt-[12px] mx-auto">
          <Text className="text-[#000000BF] text-[18px]">- or -</Text>
        </View>

        <View className="mt-[21px] mx-auto">
          <TouchableOpacity
            onPress={() => navigation.navigate("Aquaculture")}
            className="w-[275px] h-[46px] rounded-[30px] bg-gray-200 mb-[12vw]  "
          >
            <View className="flex-row mt-[13px] mx-auto">
              <Image
                source={require("../assets/login/google.png")}
                className="w-[18px] h-[18.29508px]center"
              />
              <Text className="text-center text-4 ml-4 text-[#0013C0CC] ">
                Continue with Google
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        <View className="mt-[4vh]">
          <FooterBar />
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}
