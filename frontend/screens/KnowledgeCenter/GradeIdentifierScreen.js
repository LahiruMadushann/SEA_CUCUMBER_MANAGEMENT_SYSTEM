import React, { useState, useEffect } from "react";
import BASE_URL from "../../apiConfig/apiConfig";
import { FlatList } from "react-native";
import axios from "axios";
import { StyleSheet, Text, TextInput, View, Dimensions, Image, SafeAreaView, TouchableOpacity, ScrollView } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import FooterBar from "../../components/FooterBar";
import LoadingIndicator from "../LoadingIndicatorScreen";
import * as ImagePicker from "expo-image-picker";

export default function GradeIdentifierScreen() {
  const navigation = useNavigation();
  //LogBox.ignoreAllLogs();
  const [isLoading, setIsLoading] = useState(false);

  const route = useRoute();

  const selectImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri); // Update the image state with the selected image URI
    }
  };

  const [image, setImage] = useState(null); // Use state for selected image

  useEffect(() => {}, []);

  // if (isLoading) {
  //   return <LoadingIndicator />;
  // }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }} className="flex-grow bg-white ">
      <View style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="bg-[#fff]">
          <View className="absolute w-[223vw] h-[80vh] left-[-62vw] top-[-49vh] bg-[#0013C0]  rounded-b-full ">
            <View className="mt-[60vh] ">
              <View className="flex-row ">
                <View className=" ml-[4vw]">
                  <TouchableOpacity onPress={() => navigation.navigate("ArticlesCategoryScreen")}>
                    <View className="flex m-[auto] ">
                      <Image source={require("../../assets/main_board/arrow.png")} className=" w-[10.09216px] h-[15.62988px] ml-[265px]" />
                    </View>
                  </TouchableOpacity>
                </View>
              </View>

              <Text className="text-center text-[#fff] font-bold text-[25px] mt-[10vw] fixed">Take a picture</Text>
              {image && <Image className="mt-[3vh] mx-auto rounded-[15px]" source={{ uri: image }} style={{ width: 200, height: 200 }} />}
            </View>
          </View>
        </ScrollView>

        <View style={styles.pickImageContainer}>
          <TouchableOpacity onPress={selectImage} style={styles.pickImageButton}>
            <Text style={styles.pickImageText}>Upload Image</Text>
          </TouchableOpacity>
        </View>

        <View style={{ marginBottom: 5 }}>
          <FooterBar />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    justifyContent: "center",
  },
  listTab: {
    flexDirection: "row",
    alignSelf: "center",
    marginBottom: 20,
  },
  btnTab: {
    flexDirection: "row",

    justifyContent: "center",

    fontWeight: "bold",
    color: "#3644C5",
    textAlign: "center",
    fontSize: 14,
    paddingLeft: 31,
    paddingRight: 31,
    paddingTop: 5,
    paddingBottom: 5,

    borderRadius: 8,
    borderBottomRightRadius: 0,
  },
  textTab: {
    fontSize: 16,
  },
  btnTabActive: {
    backgroundColor: "#3644C5",
  },
  textTabActive: {
    color: "#fff",
  },
  itemContainer: {},
  itemLogo: {
    padding: 10,
  },
  itemImage: {
    width: 50,
    height: 50,
  },
  itemBody: {
    flex: 1,
    paddingHorizontal: 10,
    justifyContent: "center",
  },
  itemName: {
    fontWeight: "bold",
    fontSize: 16,
  },
  itemStatus: {
    backgroundColor: "green",
    paddingHorizontal: 6,
    justifyContent: "center",
    right: 12,
  },
  pdf: {
    flex: 1,
    width: "100%",
  },

  pickImageContainer: {
    alignItems: "center",
    marginTop: 20,
    marginBottom: 20,
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
});
