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
  Modal,
  Button,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import FooterBar from "../../components/FooterBar";
import { SafeAreaView } from "react-native-safe-area-context";
import LoadingIndicator from "../LoadingIndicatorScreen";

export default function FisheriesFAQScreen() {
  const navigation = useNavigation();
  LogBox.ignoreAllLogs();

  const [isLoading, setIsLoading] = useState(false);

  const [allFAQDetails, setAllFAQDetails] = useState([]);
  const [selectedFAQ, setSelectedFAQ] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const [question, setQuestion] = useState("");
  const category = "fisheries";

  useEffect(() => {
    setIsLoading(true);
    async function fetchAllFAQDetails() {
      try {
        const response = await axios.get(`${BASE_URL}/user/getAllFAQDetails`);
        setAllFAQDetails(response.data.data); // Update state with fetched data
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching Species data:", error);
        setIsLoading(false);
      }
    }

    fetchAllFAQDetails();
  }, []);

  if (isLoading) {
    return <LoadingIndicator />;
  }

  //console.log(allFAQDetails);

  const handleQuestionSubmit = () => {
    if (question == "") {
      return Alert.alert("Invalid Input", "Please enter a question");
    }

    const insertData = {
      question: question,
      category: category,
    };

    const insertUrl = `${BASE_URL}/admin/enterFaqdetails`;

    axios
      .post(insertUrl, insertData)
      .then((response) => {
        if (response.data.success) {
          Alert.alert("Success", "Your question has been sent successfully");
          setQuestion("");
        } else {
          Alert.alert("Unsuccessful", "Please try again");
        }
      })
      .catch((error) => {
        console.error("Error sending Otp:", error);
        Alert.alert("Error", "An error occurred while sending Question");
      });
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
                Fisheries Related FAQs
              </Text>
            </View>
          </View>

          <View className="mt-[25vh] mx-auto">
            <TouchableOpacity onPress={toggleModal}>
              <View className="w-[auto] h-[auto] pb-1 pt-1 pr-5 pl-5 mt-[2vh] mr-[5vw] ml-[5vw] bg-[#FFFFFF] mb-[5vh] rounded-full">
                <Text className="text-[14px] text-center font-bold text-[#5A73F4]">
                  Post your Questions here
                </Text>
              </View>
            </TouchableOpacity>

            {/* The Modal */}
            <Modal
              animationType="slide"
              transparent={true}
              visible={isModalVisible}
              onRequestClose={toggleModal}
            >
              <View
                className="flex my-auto mx-auto p-5 rounded-[10px] shadow-lg shadow-gray-900"
                style={{ backgroundColor: "rgba(255, 255, 255, 0.95)" }}
              >
                {/* Your popup content goes here */}

                <TextInput
                  className="text-[15dpx] border-b border-[#00000040]  text-[#000000] text-gray-800 p-1 w-[84vw] h-[auto]  mb-3"
                  value={question}
                  onChangeText={setQuestion}
                  placeholder="Question"
                  multiline={true}
                />

                <View className="flex-row mb-4 mt-4 justify-end">
                  <Button
                    title="Close"
                    onPress={toggleModal}
                    className="flex rounded-[5px] w-[auto] h-[auto] p-1 bg-grey-500"
                  />

                  <View className="ml-3"></View>

                  <Button
                    className="flex rounded-[5px] w-[auto] h-[auto] p-1 bg-blue-800 "
                    onPress={handleQuestionSubmit}
                    title="Submit"
                  />
                </View>
              </View>
            </Modal>

            {/* Loop through all FAQ and display Questions and answers details */}
            {allFAQDetails.map((faq) =>
              faq.category === "fisheries" && faq.answer ? (
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
              ) : null
            )}
          </View>
        </ScrollView>
        <View style={{ marginBottom: 5 }}>
          <FooterBar />
        </View>
      </View>
    </SafeAreaView>
  );
}
