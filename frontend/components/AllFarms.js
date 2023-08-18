import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
  StyleSheet,
  Button,
} from "react-native";
import axios from "axios";
import BASE_URL from "../apiConfig/config";
import { useNavigation, useRoute } from "@react-navigation/native";

export const allfarms = [];
allfarms.push(
  <TouchableOpacity
    onPress={() => navigation.navigate("MainFarmScreen")}
    className="w-[82vw] h-[20vh] rounded-[30px] bg-[#FFFFFF] shadow-lg shadow-gray-700 mb-2"
  >
    <View className="w-[143px] h-[25px] ml-[-4vw] mt-[4vw] flex-row ">
      <Text className="text-[16px] font-bold text-[#000000A6] ml-auto">
        Farm Name
      </Text>
    </View>

    <View className="flex ml-[2.5vw] mt-[1vw]">
      <Text className=" text-[15px] font-bold flex-auto mt-[1vw] ml-[17vw] ">
        Total Stock
      </Text>
      <Text className=" text-[15px] font-bold flex-auto mt-[1vw] ml-[17vw] ">
        Location
      </Text>
      <Text className=" text-[15px] font-bold flex-auto mt-[1vw] ml-[17vw] ">
        Updated Date
      </Text>
    </View>
  </TouchableOpacity>
);
