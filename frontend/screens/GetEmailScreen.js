import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Flag from "react-native-flags";
import { useNavigation } from "@react-navigation/native";
import FooterBar from "../components/FooterBar";

const COUNTRY_CODES = {
  LK: "+94",
  IN: "+91",
  CA: "+1",
  // Add more country codes here
};

export default function GetEmailScreen() {
  const navigation = useNavigation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [emailAddress, setemailAddress] = useState("");

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
          </View>

          <View>
            <Text className="text-center text-[22px] text-[#ffff] font-bold mt-[12vw]">
              Forgot Password
            </Text>
          </View>
        </View>

        <View className="mt-[35vh]">
          <View>
            <Text className="text-[14px] text-center text-gray-600">
              You have a Problem?
            </Text>
            <Text className="text-[22px] font-bold text-center text-gray-600">
              Don’t Worry!
            </Text>
          </View>
          <View className="flex-row justify-center mt-[8vh]">
            <TouchableOpacity
              onPress={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              {/* <MaterialIcons name="keyboard-arrow-down" size={18} /> */}
            </TouchableOpacity>
            <View className="ml-[4vw] mt-[0.42vh]  ">
              <TextInput
                placeholder="Enter Email Here"
                placeholderTextColor="#808080"
                selectionColor="#808080"
                keyboardType="number-pad"
                onFocus={() => setIsDropdownOpen(false)}
                className="text-[18px] border-b border-gray-400 text-gray-700  w-[70vw] p-[0.5px] "
                onChangeText={(text) => setemailAddress(text)}
              />
            </View>
          </View>
          <TouchableOpacity
            className=" w-[275px] bg-[#0013C0] rounded-[15px] mx-auto justify-center py-[10px] items-center mt-[6vh]"
            activeOpacity={0.8}
            onPress={() =>
              navigation.navigate("ForgotPassword", { emailAddress })
            }
          >
            <Text className="text-[#fff] text-[18px] font-bold text-center">
              Continue
            </Text>
          </TouchableOpacity>
          <View className="flex-row mt-[4vh] mx-auto">
            <Text className="text-[16px] text-gray-500">No Problem? </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Text className="text-[16px] font-bold text-gray-600">
                Sign In
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View className="mt-[24vh]">
          <FooterBar />
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}
