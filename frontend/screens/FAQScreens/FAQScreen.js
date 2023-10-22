import React, { useState, useEffect } from "react";
import { Alert } from "react-native";
import axios from "axios";
import BASE_URL from "../../apiConfig/config";
import { LogBox } from "react-native";
import {
  View,
  TextInput,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import FooterBar from "../../components/FooterBar";
import { SafeAreaView } from "react-native-safe-area-context";

export default function FAQScreen() {
  const navigation = useNavigation();
  LogBox.ignoreAllLogs();

  const [allFAQDetails, setAllFAQDetails] = useState([]);
  const [selectedFAQ, setSelectedFAQ] = useState(null);

  useEffect(() => {
    async function fetchAllFAQDetails() {
      try {
        const response = await axios.get(`${BASE_URL}/user/getAllFAQDetails`);
        setAllFAQDetails(response.data.data); // Update state with fetched data
      } catch (error) {
        console.error("Error fetching Species data:", error);
      }
    }

    fetchAllFAQDetails();
  }, []);

  //console.log(allFAQDetails);

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
            <View className="flex-row mt-[60vh]">
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

            <View className="mt-[6vh]">
              <Text className="text-[22px] text-center font-bold text-[#FFFFFF]">
                Frequently Asked Questions
              </Text>
            </View>
          </View>

          <View className="mt-[30vh] mx-auto">
            {/* Loop through allFarmData and display farm details */}
            {allFAQDetails.map((faq) => (
              <TouchableOpacity
                onPress={() => setSelectedFAQ(faq)}
                className="w-[82vw] h-[auto] bg-[#FFFFFF] shadow-lg shadow-gray-700 mb-2"
              >
                <View key={faq._id}>
                  <View className="w-[auto] h-[auto] mr-[5vw] ml-[5vw] mt-[2vw] mb-[2vw] flex-row ">
                    <Text className="text-[14px] font-bold text-[#000000]">
                      {faq.question}
                    </Text>
                  </View>
                  {selectedFAQ === faq && (
                    <View className="flex-auto mt-[1vw] ml-[5vw] mr-[5vw] mb-[5vw]">
                      <Text className="text-[12px] text-justify flex-auto mt-[0vw]">
                        {faq.answer}
                      </Text>
                    </View>
                  )}
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