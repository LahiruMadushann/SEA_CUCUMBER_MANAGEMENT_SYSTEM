import React, { useState } from "react";
import { Alert } from "react-native";
import axios from "axios";

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
import { useNavigation } from "@react-navigation/native";
import PopupScreen from "../../components/PopupScreen";
import FooterBar from "../../components/FooterBar";

export default function UpdateProfilePicScreen() {
  const navigation = useNavigation();
  const [profileImg, setprofileImg] = useState("");

  // const handleUpdatePassword = () => {
  //   // Check if new password and confirm new password match
  //   if (newPassword !== confirmNewPassword) {
  //     Alert.alert("Password Mismatch", "New passwords do not match.");
  //     return;
  //   }

  //   // Create a data object to send to the backend
  //   const userData = {
  //     userId: db_id,
  //     oldpassword: oldPassword,
  //     newPassword: newPassword,
  //     confirmPassword: confirmNewPassword,
  //   };

  //   // Replace with your backend URL
  //   const backendUrl = "http://192.168.43.75:3000/farmer/changePassword";

  //   // Send a POST request to update the password
  //   axios
  //     .post(backendUrl, userData)
  //     .then((response) => {
  //       if (response.data.success) {
  //         Alert.alert(
  //           "Password Updated",
  //           "Your password has been updated successfully."
  //         );
  //         // Optionally, navigate to another screen after successful password update
  //         // navigation.navigate("UserProfileMainScreen");
  //       } else {
  //         Alert.alert("Update Failed", response.data.message);
  //       }
  //     })
  //     .catch((error) => {
  //       console.error("Error updating password:", error);
  //       Alert.alert("Error", "An error occurred while updating the password.");
  //     });
  // };

  return (
    <SafeAreaView>
      <ScrollView className="bg-[#fff]">
        <View className="absolute w-[223vw] h-[80vh] left-[-62vw] top-[-49vh] bg-[#0013C0]  rounded-b-full ">
          <View className="mt-[58vh] ">
            <View className="flex-row ">
              <View className=" ml-[4vw]">
                <TouchableOpacity
                  onPress={() => navigation.navigate("UserProfileMainScreen")}
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
              Change Profile Picture
            </Text>
          </View>
        </View>

        <View className="mt-[36vh]">
          <View className="mt-[6vh]">
            <TextInput
              className="border-b border-[#00000040] text-gray-700  w-64  mb-5 mx-auto"
              value={profileImg}
              onChangeText={setprofileImg}
              placeholder="Select Profile Image"
              secureTextEntry
              required
            />
          </View>

          <View className="mt-[2vh]">
            <TouchableOpacity className="bg-[#0013C0] rounded-[15px] w-[67vw] mx-auto justify-center py-[10px] px-[40px] items-center mt-[20px]">
              <Text className="text-[#fff] text-[18px] font-bold text-center">
                Update
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View className="mt-[28vh]">
          <FooterBar />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
