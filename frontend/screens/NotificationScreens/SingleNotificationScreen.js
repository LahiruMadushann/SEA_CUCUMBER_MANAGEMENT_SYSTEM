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
import { useNavigation, useRoute } from "@react-navigation/native";
import FooterBar from "../../components/FooterBar";

export default function SingleNotificationScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const notificationId = route.params?.notificationId || "";

  console.log(notificationId);

  const [singleNotificationData, setSingleNotificationData] = useState([]);

  useEffect(() => {
    async function fetchSingleNotificationData() {
      try {
        const response = await axios.post(
          `${BASE_URL}/user/getSingleNotification`,
          { notificationId: notificationId }
        );
        setSingleNotificationData(response.data.data); // Update state with fetched data
      } catch (error) {
        console.error("Error fetching Notifications:", error);
      }
    }

    fetchSingleNotificationData();
  }, [notificationId]);

  const {
    title: db_title,
    description: db_description,
    type: db_type,
    date: db_date,
    role: db_role,
    postedBy: db_postedBy,
  } = singleNotificationData.length > 0 ? singleNotificationData[0] : {};

  console.log(singleNotificationData);

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
                    onPress={() =>
                      navigation.navigate("MainNotificationScreen")
                    }
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
            </View>
          </View>
          <View className="mt-[20vh] mx-auto">
            {/* Loop through allFarmData and display farm details */}
            <TouchableOpacity className="w-[82vw] h-[auto] rounded-[30px] bg-[#FFFFFF] shadow-lg shadow-gray-700 mb-2">
              <View className="w-[160px] h-[25px] ml-[-4vw] mt-[4vw] flex-row ">
                <Image
                  source={require("../../assets/notification/calender.png")}
                  className="w-[13px] h-[18px] ml-[10vw]"
                />
                <Text className="text-[14px] font-bold text-[#000000A6] ml-[2vw]">
                  {`${formatDate(db_date)} at ${formatTime(db_date)}`}
                </Text>
              </View>
              <View className="flex">
                <Text className=" text-[14px] text-center font-bold flex-auto mt-[2vw] ml-[10vw] mr-[10vw]">
                  {db_title}
                </Text>
              </View>

              <View className="flex">
                <Text className=" text-[11px] text-justify flex-auto mt-[0vw] ml-[10vw] mr-[10vw]">
                  {db_description}
                </Text>
              </View>

              <View className="flex">
                <Text className=" text-[11px] text-justify font-bold flex-auto mt-[4vw] mb-[3vw] ml-[10vw] mr-[10vw]">
                  {`${db_postedBy} (${db_role})`}
                </Text>
              </View>

              {db_type === "RulesAndRegulations" && (
                <View className="flex mx-[30vw] mb-[5vw] w-[200px] ">
                  <Image
                    source={require("../../assets/notification/rulesAndRegulations.png")}
                    className="w-[15px] h-[18px] ml-[11vw] mt-[1vw]"
                  />
                  <Text className=" text-[11px] text-[#ff0000] font-bold flex-auto mt-[-5vw] ml-[17vw]">
                    Rules and Regulations
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          </View>
        </ScrollView>
        <View style={{ marginBottom: 5 }}>
          <FooterBar />
        </View>
      </View>
    </SafeAreaView>
  );
}
