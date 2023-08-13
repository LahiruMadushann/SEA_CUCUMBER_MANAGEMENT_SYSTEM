import React from "react";
import { View, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function FooterBar() {
  const navigation = useNavigation();
  return (
    <View className="mt-auto mb-[4vh]">
      <View className="border-b-[0.55px] border-b-gray-500 mb-[4vh]  w-[100vw] " />
      <View className="flex-row mx-auto">
        <View>
          <TouchableOpacity onPress={() => navigation.navigate("Contact")}>
            <Image
              source={require("../assets/footer_bar/phone.png")}
              className=" w-[30px] h-[24.99px] mr-[10vw] "
            />
          </TouchableOpacity>
        </View>

        <View>
          <TouchableOpacity onPress={() => navigation.navigate("UserProfile")}>
            <Image
              source={require("../assets/footer_bar/profile.png")}
              className=" w-[21.875px] h-[25px] mr-[10vw]"
            />
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity onPress={() => navigation.navigate("Notification")}>
            <Image
              source={require("../assets/footer_bar/notification.png")}
              className=" w-[21.87507px] h-[25px] mr-[10vw]"
            />
          </TouchableOpacity>
        </View>
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
