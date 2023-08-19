import React, { useState, useEffect } from "react";
import { Alert } from "react-native";
import axios from "axios";
import BASE_URL from "../../apiConfig/config";
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
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import FooterBar from "../../components/FooterBar";

export default function MainNotificationScreen() {
  const navigation = useNavigation();

  const [allNotificationData, setAllNotificationData] = useState([]);

  useEffect(() => {
    async function fetchAllNotificationData() {
      try {
        const response = await axios.get(
          `${BASE_URL}/user/getAllNotifications`
        );
        setAllNotificationData(response.data.data); // Update state with fetched data
      } catch (error) {
        console.error("Error fetching Notifications:", error);
      }
    }

    fetchAllNotificationData();
  }, []);

  const formatDate = (rawDate) => {
    const date = new Date(rawDate);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
      2,
      "0"
    )}-${String(date.getDate()).padStart(2, "0")}`;
  };

  const formatTime = (rawDateTime) => {
    const dateTime = new Date(rawDateTime);
    const hours = dateTime.getUTCHours();
    const minutes = dateTime.getUTCMinutes();
    const seconds = dateTime.getUTCSeconds();

    return `${hours}:${String(minutes).padStart(2, "0")}:${String(
      seconds
    ).padStart(2, "0")}`;
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
          <View className="absolute w-[223vw] h-[100vh] left-[-62vw] top-[-49vh] bg-[#0013C0]  rounded-b-full ">
            <View className="mt-[58vh] ">
              <View className="flex-row ">
                <View className=" ml-[4vw]">
                  <TouchableOpacity
                    onPress={() => navigation.navigate("MainBoard")}
                  >
                    <View className="flex m-[auto] ">
                      <Image
                        source={require("../../assets/main_board/arrow.png")}
                        className=" w-[10.09216px] h-[15.62988px] ml-[265px]"
                      />
                    </View>
                  </TouchableOpacity>
                </View>
              </View>

              <Text className="text-center text-[#fff] font-bold text-[22px] mt-[10vw] fixed">
                Notifications
              </Text>
              <View className="mt-[4vh] mx-auto">
                <Image
                  source={require("../../assets/notification/notMain.png")}
                  className=" w-[158px] h-[129px]  mt-[0.5vh] ml-[0.5vw] rounded-[30px] "
                />
              </View>
            </View>
          </View>
          <View className="mt-[50vh] mx-auto">
            {/* Loop through allFarmData and display farm details */}
            {allNotificationData.map((notification) => (
              <TouchableOpacity
                onPress={() => navigation.navigate("MainBoard")}
                className="w-[82vw] h-[12.5vh] rounded-[30px] bg-[#FFFFFF] shadow-lg shadow-gray-700 mb-2"
              >
                <View className="w-[143px] h-[25px] ml-[-4vw] mt-[4vw] flex-row ">
                  <Image
                    source={require("../../assets/notification/calender.png")}
                    className="w-[13px] h-[15px] ml-[10vw]"
                  />
                  <Text className="text-[11px] font-bold text-[#000000A6] ml-[2vw]">
                    {`${formatDate(notification.date)} at ${formatTime(
                      notification.date
                    )}`}
                  </Text>
                </View>

                <View className="flex ml-[2.5vw]">
                  <Image
                    source={require("../../assets/notification/bell.png")}
                    className="w-[18px] h-[20px] ml-[9.8vw] mt-[1vw]"
                  />
                  <Text className=" text-[11px] font-bold flex-auto mt-[-5vw] ml-[17vw] ">
                    {notification.title}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
        <View style={{ marginBottom: 5 }}>
          <FooterBar />
        </View>
      </View>
    </SafeAreaView>
  );
}
