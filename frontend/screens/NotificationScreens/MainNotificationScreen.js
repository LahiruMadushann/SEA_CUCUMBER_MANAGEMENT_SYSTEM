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
import { LogBox } from "react-native";
import LoadingIndicator from "../LoadingIndicatorScreen";

export default function MainNotificationScreen() {
  const navigation = useNavigation();
  LogBox.ignoreAllLogs();
  const [isLoading, setIsLoading] = useState(false);

  const [allNotificationData, setAllNotificationData] = useState([]);
  const [filterType, setFilterType] = useState("All"); // Default filter is "All"

  useEffect(() => {
    setIsLoading(true);
    async function fetchAllNotificationData() {
      try {
        const response = await axios.get(
          `${BASE_URL}/user/getAllNotifications`
        );
        setAllNotificationData(response.data.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching Notifications:", error);
        setIsLoading(false);
      }
    }

    fetchAllNotificationData();
  }, []);

  if (isLoading) {
    return <LoadingIndicator />;
  }

  const formatDate = (rawDate) => {
    const date = new Date(rawDate);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
      2,
      "0"
    )}-${String(date.getDate()).padStart(2, "0")}`;
  };

  const formatTime = (rawDateTime) => {
    const dateTime = new Date(rawDateTime);
    const options = {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZoneName: "short",
    };

    return dateTime.toLocaleString(undefined, options);
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

              <View className="flex w-[auto] mb-[3vw] ml-[59vw] mt-[8vw]">
                <Image
                  source={require("../../assets/notification/notMain.png")}
                  className=" w-[158px] h-[129px] ml-[5vw] rounded-[30px] "
                />

                <View className=" w-[200px] text-[#0000ff] flex-auto mt-[-33vw] ml-[45vw]">
                  <Button title="All" onPress={() => setFilterType("All")} />
                  <Button
                    title="Rules And Regulations"
                    onPress={() => setFilterType("RulesAndRegulations")}
                  />
                  <Button title="News" onPress={() => setFilterType("News")} />
                  <Button
                    title="Seacucumber Rates"
                    onPress={() => setFilterType("SeacucumberRates")}
                  />
                </View>
              </View>
            </View>
          </View>
          <View className="mt-[50vh] mx-auto">
            {/* Loop through allFarmData and display farm details */}

            {allNotificationData.map((notification) => {
              if (filterType === "All" || filterType === notification.type) {
                return (
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("SingleNotificationScreen", {
                        notificationId: notification._id,
                      })
                    }
                    className="w-[82vw] h-[auto] rounded-[30px] bg-[#FFFFFF] shadow-lg shadow-gray-700 mb-2"
                  >
                    <View className="w-[200px] h-[25px] ml-[-4vw] mt-[4vw] flex-row ">
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
                      <Text className=" text-[11px] font-bold flex-auto mt-[-5vw] ml-[17vw] mr-[10vw]">
                        {notification.title}
                      </Text>
                    </View>

                    {notification.type === "RulesAndRegulations" && (
                      <View className="flex mx-[30vw] w-[200px]  mb-[3vw] mt-[3vw]">
                        <Image
                          source={require("../../assets/notification/rulesAndRegulations.png")}
                          className="w-[15px] h-[18px] ml-[11vw]"
                        />
                        <Text className=" text-[12px] text-[#ff0000] font-bold flex-auto mt-[-4vw] ml-[17vw]">
                          Rules and Regulations
                        </Text>
                      </View>
                    )}

                    {notification.type === "News" && (
                      <View className="flex mx-[30vw] w-[200px] mb-[3vw] ml-[50vw] mt-[3vw]">
                        <Image
                          source={require("../../assets/notification/rulesAndRegulations.png")}
                          className="w-[15px] h-[18px] ml-[11vw] mt-[1vw]"
                        />
                        <Text className=" text-[12px] text-[#00ff00] font-bold flex-auto mt-[-5vw] ml-[17vw]">
                          News
                        </Text>
                      </View>
                    )}

                    {notification.type === "SeacucumberRates" && (
                      <View className="flex mx-[30vw] w-[200px] mb-[3vw] mt-[3vw]">
                        <Image
                          source={require("../../assets/notification/price-list.png")}
                          className="w-[15px] h-[18px] ml-[11vw]"
                        />
                        <Text className=" text-[12px] text-[#0000ff] font-bold flex-auto mt-[-4vw] ml-[17vw]">
                          Seacucumber Rates
                        </Text>
                      </View>
                    )}
                  </TouchableOpacity>
                );
              }
              return null; // Do not render if not matching filter type
            })}
          </View>
        </ScrollView>
        <View style={{ marginBottom: 5 }}>
          <FooterBar />
        </View>
      </View>
    </SafeAreaView>
  );
}
