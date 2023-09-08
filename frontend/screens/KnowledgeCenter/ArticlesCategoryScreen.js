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

export default function ArticlesCategoryScreen() {
  const navigation = useNavigation();
  LogBox.ignoreAllLogs();

  const [allArticlesCategories, setAllArticlesCategories] = useState([]);

  useEffect(() => {
    async function fetchArticlesCategories() {
      try {
        const response = await axios.get(
          `${BASE_URL}/user/getAllArticlesCategories`
        );
        setAllArticlesCategories(response.data.data); // Update state with fetched data
      } catch (error) {
        console.error("Error fetching Species data:", error);
      }
    }

    fetchArticlesCategories();
  }, []);

  //console.log(allArticlesCategories);

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
                  onPress={() => navigation.navigate("KnowledgeMain")}
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
              <Text className="text-[25px] text-center font-bold text-[#FFFFFF]">
                Articles
              </Text>
            </View>
          </View>

          <View className="mt-[30vh] mx-auto">
            {/* Loop through Articles and display category */}
            {allArticlesCategories.map((articles) => (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("ArticlesScreen", {
                    category: articles,
                  })
                }
                className="w-[80vw] h-[auto] rounded-[30px] my-auto bg-[#FFFFFF] shadow-lg shadow-gray-700 mb-4"
              >
                <View key={articles}>
                  <View className="w-[auto] h-[25px] ml-[5vw] mx-auto mb-3  mt-3 flex-row ">
                    <Text className="text-[18px] font-bold text-[#000000]">
                      {articles === "speciesRelated" ? "Species" : ""}
                      {articles === "exportRelated" ? "Export" : ""}
                      {articles === "farmingRealted" ? "Farming" : ""}
                      {articles === "fisheriesRelated" ? "Fisheries" : ""}
                      {articles === "processingRelated" ? "Processing" : ""}
                      {articles === "other" ? "Export" : ""} Related Articles
                    </Text>
                  </View>
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
