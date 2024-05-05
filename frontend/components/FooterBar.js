import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useAuth } from "../auth/AuthContext";

export default function FooterBar() {
  const navigation = useNavigation();
  const route = useRoute();

  const { state } = useAuth();
  const hasToken = state.token;

  const isScreenActive = (screenName) => route.name === screenName;

  return (
    <View className="mb-[2vh]">
      <View className="border-b-[0.55px] border-b-gray-500 mb-[3vh] w-[100vw] " />
      <View className="flex-row mx-auto">
        <View className="mr-[10vw]">
          <TouchableOpacity onPress={() => navigation.navigate("MainBoard")}>
            <Image source={isScreenActive("MainBoard") ? require("../assets/footer_bar/home.png") : require("../assets/footer_bar/home-grey.png")} className=" w-[24.99817px] h-[25.00244px]" />
          </TouchableOpacity>
        </View>

        {hasToken && (
          <View className="mr-[10vw]">
            <TouchableOpacity onPress={() => navigation.navigate("UserProfileMainScreen")}>
              <Image
                source={isScreenActive("UserProfileMainScreen") ? require("../assets/footer_bar/profile.png") : require("../assets/footer_bar/profile-grey.png")}
                className=" w-[21.875px] h-[25px]"
              />
            </TouchableOpacity>
          </View>
        )}

        {hasToken && (
          <View className="mr-[10vw]">
            <TouchableOpacity onPress={() => navigation.navigate("MainNotificationScreen")}>
              <Image
                source={isScreenActive("MainNotificationScreen") ? require("../assets/footer_bar/notification.png") : require("../assets/footer_bar/notification-grey.png")}
                className=" w-[21.87507px] h-[25px]"
              />
            </TouchableOpacity>
          </View>
        )}
        {hasToken && (
          <View className="mr-[10vw]">
            <TouchableOpacity onPress={() => navigation.navigate("MainAdvertisementScreen")}>
              <Image source={isScreenActive("MainAdvertisementScreen") ? require("../assets/footer_bar/ads.png") : require("../assets/footer_bar/ads-grey.png")} className=" w-[21.87507px] h-[25px]" />
            </TouchableOpacity>
          </View>
        )}
        {!hasToken && (
          <View className="mr-[10vw]">
            <TouchableOpacity onPress={() => navigation.navigate("Knowledge_species")}>
              <Image
                source={isScreenActive("Knowledge_species") ? require("../assets/footer_bar/knowledge.png") : require("../assets/footer_bar/knowledge-grey.png")}
                className=" w-[24.99817px] h-[25.00244px]"
              />
            </TouchableOpacity>
          </View>
        )}
        <View>
          <TouchableOpacity onPress={() => navigation.navigate("Contact")}>
            <Image source={isScreenActive("Contact") ? require("../assets/footer_bar/contact.png") : require("../assets/footer_bar/contact-grey.png")} className=" w-[30px] h-[24.99px]" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
