import axios from "axios";
import { Alert } from "react-native";
import { useAuth } from "../auth/AuthContext";
import jwtDecode from "jwt-decode";
import BASE_URL from "../apiConfig/config";
import { LogBox } from "react-native";

import LoadingIndicator from "./LoadingIndicatorScreen";

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
  LogBox.ignoreAllLogs();
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { dispatch } = useAuth();

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = () => {
    setIsLoading(true);
    const backendUrl = `${BASE_URL}/login`;

    const userData = {
      username: username,
      password: password,
    };
    axios
      .post(backendUrl, userData)
      .then((response) => {
        console.log("response", response.data.success);
        if (response.data.success) {
          const token = response.data.token;
          console.log("Token:", token);

          const decodedToken = jwtDecode(token);
          console.log("Decoded Token:", decodedToken);

          // Set the token in the context

          dispatch({ type: "SET_TOKEN", payload: token });

          // navigating to another screen
          navigation.navigate("MainBoard");
          setIsLoading(false);
        } else {
          // Show an alert for unsuccessful login
          Alert.alert(
            "Login Error",
            response.data.message,
            [
              {
                text: "OK",
              },
            ],
            { cancelable: true }
          );
          setIsLoading(false);
        }
      })
      .catch((error) => {
        console.error("Login error:", error);
        Alert.alert("Login Error", "Server Error. Please try again later");
        setIsLoading(false);
        console.error("Error response:", error.message);
      });
  };

  if (isLoading) {
    return <LoadingIndicator />;
  }

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "white" }}
      className="flex-grow bg-white"
    >
      <View style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          className="bg-[#fff]"
        >
          <View className="absolute w-[162vw] h-[50vh] left-[-32vw] top-[-20vh] bg-[#0013C0]  rounded-b-full ">
            <View className="flex-row">
              <View className="ml-[42vw] mt-[26vh]">
                <TouchableOpacity
                  onPress={() => navigation.navigate("MainBoard")}
                >
                  <View className="flex m-[auto] ">
                    <Image
                      source={require("../assets/main_board/arrow.png")}
                      className=" w-[10.09216px] h-[15.62988px] "
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

          <View className="mt-[70vw] form space-y-2 mx-auto flex-row items-center">
            <Image
              source={require("../assets/login/username.png")}
              className="w-[auto] h-[auto] center"
            />
            <TextInput
              className="p-4 border-b text-[18px] text-gray-700 w-64 mb-3"
              value={username}
              onChangeText={setUsername}
              placeholder="Enter Username here"
              autoCapitalize="none"
              autoCorrect={false}
              required
            />
          </View>

          <View className="form space-y-2 mx-auto flex-row items-center">
            <Image
              source={require("../assets/login/password.png")}
              className="w-[auto] h-[auto] center"
            />
            <TextInput
              className="p-4 border-b text-[18px] text-gray-700 w-64 mb-3"
              value={password}
              onChangeText={setPassword}
              placeholder="Enter Password here"
              autoCapitalize="none"
              autoCorrect={false}
              secureTextEntry={!showPassword}
              required
            />
            <TouchableOpacity
              onPress={togglePasswordVisibility}
              className="absolute mb-[5vh] ml-[65vw]"
            >
              <Image
                source={
                  showPassword
                    ? require("../assets/login/eye.png")
                    : require("../assets/login/eye-crossed.png")
                }
                className="w-[6vw] h-[3vh]"
              />
            </TouchableOpacity>
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
              Forgot Password?
            </Text>

            <TouchableOpacity
              onPress={() => navigation.navigate("GetEmailScreen")}
            >
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

          {/* <View className="ml-[46.5vw] flex-row mt-[12px] mx-auto">
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
          </View> */}
        </ScrollView>
        <View style={{ marginBottom: 5 }}>
          <FooterBar />
        </View>
      </View>
    </SafeAreaView>
  );
}
