import React, { useState } from "react";
import BASE_URL from "../../apiConfig/config";

import { Alert } from "react-native";
import axios from "axios";

import { useAuth } from "../../auth/AuthContext";
import jwtDecode from "jwt-decode";

import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import FooterBar from "../../components/FooterBar";
import * as ImagePicker from "expo-image-picker";

export default function UpdateProfilePicScreen() {
  const navigation = useNavigation();

  const [image, setImage] = useState(null); // Use state for selected image

  const { state, dispatch } = useAuth();
  // Access the token
  const token = state.token;
  // Decode the token
  const decodedToken = jwtDecode(token);

  const { _id: db_id } = decodedToken;

  const selectImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.uri); // Update the image state with the selected image URI
    }
  };

  // console.log("Image:", image);

  const handleProfilePicUpdate = async () => {
    if (image == "") {
      Alert.alert("Empty image", "Please select an image");
    }

    const formData = new FormData();
    formData.append("userId", db_id);
    formData.append("profilepic", {
      uri: image,
      type: "image/jpeg",
      name: "profile.jpg",
    });

    console.log(formData);

    const backendUrl = `${BASE_URL}/user/updateProfilePic`;
    try {
      const response = await axios.put(backendUrl, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      let updatedtoken = response.data.data;

      // Updating the Token
      dispatch({ type: "SET_TOKEN", payload: updatedtoken });

      Alert.alert(
        "Update Successful",
        "Your profile picture has been updated successfully"
      );

      navigation.navigate("UserProfileMainScreen");
    } catch (error) {
      console.error("Error during Updating...", error);
    }
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
            <View style={styles.pickImageContainer}>
              <TouchableOpacity
                onPress={selectImage}
                style={styles.pickImageButton}
              >
                <Text style={styles.pickImageText}>Pick Profile Image</Text>
              </TouchableOpacity>
            </View>
            {image && (
              <Image
                className="mt-[3vh] mx-auto rounded-[15px]"
                source={{ uri: image }}
                style={{ width: 200, height: 200 }}
              />
            )}

            <View className="mt-[2vh]">
              <TouchableOpacity
                className="bg-[#0013C0] rounded-[15px] w-[67vw] mx-auto justify-center py-[10px] px-[40px] items-center mt-[20px]"
                onPress={handleProfilePicUpdate}
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

const styles = StyleSheet.create({
  pickImageContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  pickImageButton: {
    backgroundColor: "#007bff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  pickImageText: {
    color: "white",
    fontWeight: "bold",
  },

  fieldContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  requiredLabel: {
    color: "red",
    marginBottom: 15,
  },
  textField: {
    borderStyle: "solid",
    borderBottomWidth: 1,
    borderColor: "#00000040",
    color: "gray",
    width: 200,
    paddingBottom: 3,
  },

  picker: {
    width: 225,
    color: "gray",
  },
});
