import React, { useState, useEffect } from "react";
import BASE_URL from "../../apiConfig/config";

import axios from "axios";
import CustomLink from "../../components/customlink";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import FooterBar from "../../components/FooterBar";

import { LogBox } from "react-native";
import LoadingIndicator from "../LoadingIndicatorScreen";

export default function ArticlesScreen() {
  const navigation = useNavigation();
  LogBox.ignoreAllLogs();
  const [isLoading, setIsLoading] = useState(false);

  const route = useRoute();
  const category = route.params?.category || "";

  // console.log(speciesId);

  const [allArticlesCategories, setAllArticlesCategories] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    async function fetchArticlesCategories() {
      try {
        const response = await axios.get(`${BASE_URL}/user/getAllArticlesData`);
        setAllArticlesCategories(response.data.data); // Update state with fetched data
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching Species data:", error);
        setIsLoading(false);
      }
    }

    fetchArticlesCategories();
  }, []);

  if (isLoading) {
    return <LoadingIndicator />;
  }

  // console.log(allArticlesCategories);

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
            <View className="mt-[60vh] ">
              <View className="flex-row ">
                <View className=" ml-[4vw]">
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("ArticlesCategoryScreen")
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

              <Text className="text-center text-[#fff] font-bold text-[25px] mt-[10vw] fixed">
                {category === "speciesRelated" ? "Species" : ""}
                {category === "exportRelated" ? "Export" : ""}
                {category === "farmingRealted" ? "Farming" : ""}
                {category === "fisheriesRelated" ? "Fisheries" : ""}
                {category === "processingRelated" ? "Processing" : ""}
                {category === "other" ? "Other" : ""} related Articles
              </Text>
            </View>
          </View>

          <View className="mt-[32vh]">
            {/* Loop through Articles and display category */}
            {allArticlesCategories.map((articles) => (
              <View key={articles._id}>
                {articles.category === category && (
                  <View className="w-[auto] h-[auto] mx-auto mb-3 mt-3 flex-auto ">
                    <Text className="text-center text-[15px] mt-[2vh]  ml-[5vh]  mr-[5vh] font-bold text-[#000000A6]">
                      {articles.heading}
                    </Text>
                    <Text className="text-justify text-[12px] ml-[5vh] mr-[5vh] mt-[2vh] text-[#000000A6]">
                      {articles.content}
                    </Text>
                    <Text className="text-justify text-[12px] ml-[5vh] mr-[5vh] mt-[2vh] text-[#ff0000]">
                      Read More : -
                    </Text>
                    <CustomLink url={articles.link} />
                  </View>
                )}
              </View>
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
});
