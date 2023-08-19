import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../auth/AuthContext";

export default function FooterBar() {
  const navigation = useNavigation();

  const { state } = useAuth(); // Access the dispatch function from the context
  const hasToken = state.token;

  return (
    <View className="mt-auto mb-[3vh]">
      <View className="border-b-[0.55px] border-b-gray-500 mb-[3vh]  w-[100vw] " />
      <View className="flex-row mx-auto">
        <View>
          <TouchableOpacity onPress={() => navigation.navigate("Contact")}>
            <Image
              source={require("../assets/footer_bar/phone.png")}
              className=" w-[30px] h-[24.99px] mr-[10vw] "
            />
          </TouchableOpacity>
        </View>

        {hasToken && (
          <View>
            <TouchableOpacity
              onPress={() => navigation.navigate("UserProfileMainScreen")}
            >
              <Image
                source={require("../assets/footer_bar/profile.png")}
                className=" w-[21.875px] h-[25px] mr-[10vw]"
              />
            </TouchableOpacity>
          </View>
        )}

        {hasToken && (
          <View>
            <TouchableOpacity
              onPress={() => navigation.navigate("MainNotificationScreen")}
            >
              <Image
                source={require("../assets/footer_bar/notification.png")}
                className=" w-[21.87507px] h-[25px] mr-[10vw]"
              />
            </TouchableOpacity>
          </View>
        )}
        <View>
          <TouchableOpacity onPress={() => navigation.navigate("Knowledge")}>
            <Image
              source={require("../assets/footer_bar/search.png")}
              className=" w-[24.99817px] h-[25.00244px] mr-[10vw]"
            />
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity onPress={() => navigation.navigate("MainBoard")}>
            <Image
              source={require("../assets/footer_bar/home.png")}
              className=" w-[30px] h-[23.32893px] ml-[2vw]"
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
