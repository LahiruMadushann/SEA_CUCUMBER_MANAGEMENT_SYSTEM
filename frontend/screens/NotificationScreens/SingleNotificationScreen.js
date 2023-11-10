import React, { useState, useEffect } from "react";
import { Alert } from "react-native";
import axios from "axios";
import BASE_URL from "../../apiConfig/config";
import jwtDecode from "jwt-decode"; // Import the jwt-decode library
import { useAuth } from "../../auth/AuthContext";

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
import { LogBox } from "react-native";
import LoadingIndicator from "../LoadingIndicatorScreen";

export default function SingleNotificationScreen() {
  const navigation = useNavigation();
  LogBox.ignoreAllLogs();
  const [isLoading, setIsLoading] = useState(false);

  const route = useRoute();

  const { state } = useAuth();

  // Access the token
  const token = state.token;

  // Decode the token
  const decodedToken = jwtDecode(token);

  // Access payload data from the decoded token
  const { _id: db_id } = decodedToken;

  const notificationId = route.params?.notificationId || "";

  console.log(notificationId);

  const [singleNotificationData, setSingleNotificationData] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    async function fetchSingleNotificationData() {
      try {
        const response = await axios.post(
          `${BASE_URL}/user/getSingleNotification`,
          { notificationId: notificationId }
        );
        setSingleNotificationData(response.data.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching Notifications:", error);
        setIsLoading(false);
      }
    }

    fetchSingleNotificationData();
  }, [notificationId]);

  if (isLoading) {
    return <LoadingIndicator />;
  }

  const {
    title: db_title,
    description: db_description,
    type: db_type,
    date: db_date,
    role: db_role,
    postedBy: db_postedBy,
    postedById: db_postedById,
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
    const options = {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZoneName: "short",
    };

    return dateTime.toLocaleString(undefined, options);
  };

  const handleDelete = async () => {
    // Clear the token by dispatching the CLEAR_TOKEN action

    Alert.alert(
      "Are you sure?",
      "Once you delete your News, you won't be able to recover it.",
      [
        {
          text: "Delete News",
          onPress: () => {
            const newsData = {
              news_Id: notificationId,
            };
            const backendUrl = `${BASE_URL}/farmMngUsers/deleteNews`;

            axios
              .post(backendUrl, newsData)
              .then((response) => {
                if (response.data.success) {
                  Alert.alert("Advertisement Deleted", response.data.message);
                  navigation.navigate("MainNotificationScreen");
                } else {
                  Alert.alert("UnSuccessful", response.data.message);
                }
              })
              .catch((error) => {
                console.error("Error Deleting Advertisement:", error);
                Alert.alert(
                  "Error",
                  "An error occurred while deleting the Advertisement."
                );
              });

            console.log("Delete Pressed");
          },
        },
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
      ]
    );
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
            <View className="w-[82vw] h-[auto] rounded-[30px] bg-[#FFFFFF] shadow-lg shadow-gray-700 mb-2">
              <View className="w-[230px] h-[25px] ml-[-4vw] mt-[4vw] flex-row ">
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

              {db_type === "SeacucumberRates" && (
                <View className="flex mx-[30vw] mb-[5vw] w-[200px] ">
                  <Image
                    source={require("../../assets/notification/price-list.png")}
                    className="w-[15px] h-[18px] ml-[11vw] mt-[1vw]"
                  />
                  <Text className=" text-[11px] text-[#0000ff] font-bold flex-auto mt-[-5vw] ml-[17vw]">
                    Sea cucumber rates
                  </Text>
                </View>
              )}

              {db_type === "News" && (
                <View className="flex mx-[50vw] mb-[5vw] w-[200px] ">
                  <Image
                    source={require("../../assets/notification/rulesAndRegulations.png")}
                    className="w-[15px] h-[18px] ml-[11vw] mt-[1vw]"
                  />
                  <Text className=" text-[11px] text-[#00ff00] font-bold flex-auto mt-[-5vw] ml-[17vw]">
                    News
                  </Text>
                </View>
              )}

              {db_postedById === db_id && (
                <View className="flex mt-[2vh] mb-[2vh]">
                  <TouchableOpacity
                    className="bg-[#C61A1A] rounded-[15px] w-[auto] mx-auto justify-center py-[5px] px-[10px]"
                    onPress={handleDelete}
                  >
                    <Text className="text-[#fff] text-[14px] font-bold text-center">
                      Delete News
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </View>
        </ScrollView>
        <View style={{ marginBottom: 5 }}>
          <FooterBar />
        </View>
      </View>
    </SafeAreaView>
  );
}
