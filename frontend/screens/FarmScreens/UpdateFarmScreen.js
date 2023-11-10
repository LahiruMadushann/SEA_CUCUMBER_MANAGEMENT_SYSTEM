import React, { useState, useEffect } from "react";
import { Alert } from "react-native";
import axios from "axios";
import BASE_URL from "../../apiConfig/config";

import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import FooterBar from "../../components/FooterBar";

export default function UpdateFarmScreen() {
  const navigation = useNavigation();

  const route = useRoute();
  // Access the farmId parameter from route.params
  const farmId = route.params?.farmId || "";

  useEffect(() => {
    async function fetchFarmData() {
      try {
        const response = await axios.post(
          `${BASE_URL}/districtAquaCulturist/getAquaFarmDetails`,
          { farmId: farmId }
        );
        setFarmData(response.data.data); // Update state with fetched data
      } catch (error) {
        console.error("Error fetching farm data:", error);
      }
    }

    fetchFarmData();
  }, []);

  const [farmData, setFarmData] = useState({
    name: "",
    licenseNo: "",
    validity: "",
    location: "",
    extend: "",
    gpsCoordinatesOne: "",
    gpsCoordinatesTwo: "",
    gpsCoordinatesThree: "",
    gpsCoordinatesFour: "",
    farmInternal: "",
    establishmentDate: "",
    contactNo: "",
  });

  const handleUpdate = () => {
    const updatedData = {
      farmId: farmId,
      name: farmData.name,
      licenseNo: farmData.licenseNo,
      validity: farmData.validity,
      location: farmData.location,
      extend: farmData.extend,
      gpsCoordinatesOne: farmData.gpsCoordinatesOne,
      gpsCoordinatesTwo: farmData.gpsCoordinatesTwo,
      gpsCoordinatesThree: farmData.gpsCoordinatesThree,
      gpsCoordinatesFour: farmData.gpsCoordinatesFour,
      farmInternal: farmData.farmInternal,
      establishmentDate: farmData.establishmentDate,
      contactNo: farmData.contactNo,
    };

    const updateUrl = `${BASE_URL}/districtAquaCulturist/updateFarmDetails`;

    // Make a PUT or POST request to update the data
    axios
      .put(updateUrl, updatedData)
      .then((response) => {
        if (response.data.success) {
          Alert.alert(
            "Farm Details",
            "Farm details has been updated successfully."
          );

          navigation.navigate("UserProfileMainScreen");
        } else {
          Alert.alert("Update Failed", response.data.message);
        }
      })
      .catch((error) => {
        console.error("Error updating data:", error);
        Alert.alert("Error", "An error occurred while updating the details.");
      });
  };

  console.log(farmData);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <View style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          className="bg-[#fff]"
        >
          <View className="absolute w-[223vw] h-[80vh] left-[-62vw] top-[-49vh] bg-[#0013C0]  rounded-b-full ">
            <View className="mt-[58vh] ">
              <View className="flex-row ">
                <View className=" ml-[4vw]">
                  <TouchableOpacity
                    onPress={() => navigation.navigate("MainFarmScreen")}
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
              <Text className="text-center text-[#fff]  text-[18px] mt-[10vw] fixed">
                Update Details
              </Text>
              <Text className="text-center text-[#fff] font-bold text-[22px] mt-[2vw] fixed">
                Aquaculture Farm
              </Text>
            </View>
          </View>

          <View className="mt-[36vh]">
            <View className="mt-[6vh]">
              <TextInput
                className="border-b border-[#00000040] text-gray-700  w-64  mb-5 mx-auto"
                value={farmData.name}
                onChangeText={(value) =>
                  setFarmData((prevState) => ({ ...prevState, name: value }))
                }
                placeholder="Farm Name"
                required
              />
              <TextInput
                className="border-b border-[#00000040] text-gray-700  w-64  mb-5 mx-auto"
                value={farmData.contactNo}
                onChangeText={(value) =>
                  setFarmData((prevState) => ({
                    ...prevState,
                    contactNo: value,
                  }))
                }
                placeholder="Contact No"
                required
              />
              <TextInput
                className="border-b border-[#00000040] text-gray-700  w-64  mb-5 mx-auto"
                value={farmData.licenseNo}
                onChangeText={(value) =>
                  setFarmData((prevState) => ({
                    ...prevState,
                    licenseNo: value,
                  }))
                }
                placeholder="License No"
                required
              />
              <TextInput
                className="border-b border-[#00000040] text-gray-700  w-64  mb-5 mx-auto"
                value={farmData.validity}
                onChangeText={(value) =>
                  setFarmData((prevState) => ({
                    ...prevState,
                    validity: value,
                  }))
                }
                placeholder="Validity"
                required
              />
              <TextInput
                className="border-b border-[#00000040] text-gray-700  w-64  mb-5 mx-auto"
                value={farmData.location}
                onChangeText={(value) =>
                  setFarmData((prevState) => ({
                    ...prevState,
                    location: value,
                  }))
                }
                placeholder="Location"
                required
              />
              <TextInput
                className="border-b border-[#00000040] text-gray-700  w-64  mb-5 mx-auto"
                value={farmData.extend}
                onChangeText={(value) =>
                  setFarmData((prevState) => ({ ...prevState, extend: value }))
                }
                placeholder="Extend"
                required
              />
              <TextInput
                className="border-b border-[#00000040] text-gray-700  w-64  mb-5 mx-auto"
                value={farmData.gpsCoordinatesOne}
                onChangeText={(value) =>
                  setFarmData((prevState) => ({
                    ...prevState,
                    gpsCoordinatesOne: value,
                  }))
                }
                placeholder="First Point GPS Coordinates"
                required
              />
              <TextInput
                className="border-b border-[#00000040] text-gray-700  w-64  mb-5 mx-auto"
                value={farmData.gpsCoordinatesTwo}
                onChangeText={(value) =>
                  setFarmData((prevState) => ({
                    ...prevState,
                    gpsCoordinatesTwo: value,
                  }))
                }
                placeholder="Second Point GPS Coordinates"
                required
              />
              <TextInput
                className="border-b border-[#00000040] text-gray-700  w-64  mb-5 mx-auto"
                value={farmData.gpsCoordinatesThree}
                onChangeText={(value) =>
                  setFarmData((prevState) => ({
                    ...prevState,
                    gpsCoordinatesThree: value,
                  }))
                }
                placeholder="Third Point GPS Coordinates"
                required
              />
              <TextInput
                className="border-b border-[#00000040] text-gray-700  w-64  mb-5 mx-auto"
                value={farmData.gpsCoordinatesFour}
                onChangeText={(value) =>
                  setFarmData((prevState) => ({
                    ...prevState,
                    gpsCoordinatesFour: value,
                  }))
                }
                placeholder="Fourth Point GPS Coordinates"
                required
              />
              <TextInput
                className="border-b border-[#00000040] text-gray-700  w-64  mb-5 mx-auto"
                value={farmData.farmInternal}
                onChangeText={(value) =>
                  setFarmData((prevState) => ({
                    ...prevState,
                    farmInternal: value,
                  }))
                }
                placeholder="Farm Internal"
                required
              />
              {/* <TextInput
                className="border-b border-[#00000040] text-gray-700  w-64  mb-5 mx-auto"
                value={farmData.establishmentDate}
                onChangeText={(value) =>
                  setFarmData((prevState) => ({
                    ...prevState,
                    establishmentDate: value,
                  }))
                }
                placeholder="establishmentDate"
                required
              /> */}
            </View>

            <View className="mt-[2vh] mb-[5vh]">
              <TouchableOpacity
                className="bg-[#0013C0] rounded-[15px] w-[67vw] mx-auto justify-center py-[10px] px-[40px] items-center mt-[20px]"
                onPress={handleUpdate}
              >
                <Text className="text-[#fff] text-[18px] font-bold text-center">
                  Update
                </Text>
              </TouchableOpacity>
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
