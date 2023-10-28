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
import LoadingIndicator from "../LoadingIndicatorScreen";

export default function SingleAdvertisementScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { state } = useAuth();

  // Access the token
  const token = state.token;

  // Decode the token
  const decodedToken = jwtDecode(token);

  // Access payload data from the decoded token
  const { _id: db_id } = decodedToken;

  const [isLoading, setIsLoading] = useState(false);

  const advertisementId = route.params?.advertisementId || "";

  console.log(advertisementId);

  const [singleAdvertisementData, setSingleAdvertisementData] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    async function fetchSingleAdvertisementData() {
      try {
        const response = await axios.post(
          `${BASE_URL}/user/getSingleAdvertisement`,
          { advertisementId: advertisementId }
        );
        setSingleAdvertisementData(response.data.data); // Update state with fetched data
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching Notifications:", error);
        setIsLoading(false);
      }
    }

    fetchSingleAdvertisementData();
  }, [advertisementId]);

  if (isLoading) {
    return <LoadingIndicator />;
  }

  const {
    _id: db_adId,
    title: db_title,
    description: db_description,
    type: db_type,
    createdAt: db_date,
    contactNo: db_contactNo,
    address: db_address,
    email: db_email,
    postedById: db_postedById,
  } = singleAdvertisementData.length > 0 ? singleAdvertisementData[0] : {};

  console.log(singleAdvertisementData);

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
      "Once you delete your advertisement, you won't be able to recover it.",
      [
        {
          text: "Delete Advertisement",
          onPress: () => {
            const adData = {
              ad_Id: db_adId,
            };
            const backendUrl = `${BASE_URL}/districtAquaCulturist/deleteAdvertisement`;

            axios
              .post(backendUrl, adData)
              .then((response) => {
                if (response.data.success) {
                  Alert.alert("Advertisement Deleted", response.data.message);
                  navigation.navigate("UserProfileMainScreen");
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
                      navigation.navigate("MainAdvertisementScreen")
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
                <Text className=" text-[11px] text-justify flex-auto mt-[2vw] ml-[10vw] mr-[10vw]">
                  {db_description}
                </Text>
              </View>

              {db_type === "promotion" && (
                <View className="flex mx-[30vw] w-[200px] ml-[45vw] mb-[3vw] mt-[3vw]">
                  <Image
                    source={require("../../assets/notification/promotion.png")}
                    className="w-[15px] h-[18px] ml-[11vw]"
                  />
                  <Text className=" text-[12px] text-[#0000ff] font-bold flex-auto mt-[-4vw] ml-[17vw]">
                    Promotion
                  </Text>
                </View>
              )}

              {db_type === "vacancy" && (
                <View className="flex mx-[30vw] w-[200px] mb-[3vw] ml-[45vw] mt-[3vw]">
                  <Image
                    source={require("../../assets/notification/vacancy.png")}
                    className="w-[18px] h-[20px] ml-[11vw] mt-[1vw]"
                  />
                  <Text className=" text-[12px] text-[#00ff00] font-bold flex-auto mt-[-4vw] ml-[17vw]">
                    Vacancy
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
                      Delete Advertisement
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
