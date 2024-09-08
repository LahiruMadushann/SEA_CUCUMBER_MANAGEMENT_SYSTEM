import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import * as ImagePicker from "expo-image-picker";
import FooterBar from "../../components/FooterBar";
import LoadingIndicator from "../LoadingIndicatorScreen";
import BASE_URL from "../../apiConfig/apiConfig";

const { width, height } = Dimensions.get("window");

export default function GradeIdentifierScreen() {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState(null);

  const selectImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const takeImage = async () => {
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const uploadImage = async () => {
    if (!image) {
      alert("Please select an image first.");
      return;
    }

    setIsLoading(true);

    const formData = new FormData();
    formData.append("file", {
      uri: image,
      name: "photo.jpg",
      type: "image/jpeg",
    });

    try {
      // const response = await axios.post(`${BASE_URL}/upload`, formData, {
      //   headers: {
      //     "Content-Type": "multipart/form-data",
      //   },
      // });

      alert("Image uploaded successfully");
      navigation.navigate('UploadSuccessScreen');

    } catch (error) {
      console.error(error);
      alert("Image upload failed");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <LoadingIndicator />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          className="bg-white"
        >
          <View className="absolute w-[223vw] h-[80vh] left-[-62vw] top-[-49vh] bg-blue-900 rounded-b-full">
           
          </View>
          <View>
            <TouchableOpacity
              onPress={() => navigation.navigate("ArticlesCategoryScreen")}
              className="absolute top-10 left-5"
            >
              <Image
                source={require("../../assets/main_board/arrow.png")}
                className="w-2.5 h-4.5 "
              />
            </TouchableOpacity>
            <Text className="text-white text-2xl font-bold mt-[12vh] mx-auto">
              Take a picture
            </Text>
          </View>
          <View className="mt-[15vh]">
            <View className="items-center justify-center mt-5 mx-auto aspect-[4/3] bg-gray-200 rounded-xl overflow-hidden">
              {image ? (
                <Image
                  source={{ uri: image }}
                  className="w-full h-full object-cover"
                />
              ) : (
                <View className="w-full h-full justify-center items-center">
                  <Text className="text-gray-600 text-lg">
                    No image selected
                  </Text>
                </View>
              )}
            </View>

            <View className="flex-row justify-center mt-5">
              <TouchableOpacity onPress={takeImage} className="mx-5">
                <Image
                  source={require("../../assets/icons/camera.png")}
                  className="w-12 h-12"
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={selectImage} className="mx-5">
                <Image
                  source={require("../../assets/icons/gallery.png")}
                  className="w-12 h-12"
                />
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              onPress={uploadImage}
              className="bg-blue-500 py-2 px-4 rounded-full self-center mt-5"
            >
              <Text className="text-white font-bold text-lg">Upload Image</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

        <FooterBar />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  content: {
    flex: 1,
  },
});
