import React, { useState, useEffect } from "react";
import BASE_URL from "../../apiConfig/config";
import { LogBox } from "react-native";
import axios from "axios";
import CustomLink from "../../components/customlink";
import { StyleSheet, Text, View, Dimensions, Image, SafeAreaView, TouchableOpacity, ScrollView } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import PopupScreen from "../../components/PopupScreen";
import FooterBar from "../../components/FooterBar";

import LoadingIndicator from "../LoadingIndicatorScreen";

export default function KCIndividualSpecies() {
  const navigation = useNavigation();

  const [isLoading, setIsLoading] = useState(false);

  const route = useRoute();
  const speciesId = route.params?.id || "";

  // console.log(speciesId);

  const [allSpeciesData, setAllSpeciesData] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    async function fetchAllSpeciesData() {
      try {
        const response = await axios.post(`${BASE_URL}/user/getSingleSpeciesData`, {
          speciesId: speciesId,
        });
        setAllSpeciesData(response.data.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching Species data:", error);
        setIsLoading(false);
      }
    }

    fetchAllSpeciesData();
  }, []);

  if (isLoading) {
    return <LoadingIndicator />;
  }

  const {
    _id: db_speciesId,
    speciesType: db_speciesType,
    scientificName: db_scientificName,
    description: db_description,
    habitats: db_habitats,
    feeding: db_feeding,
    reproduction: db_reproduction,
    lifecycle: db_lifecycle,
    fishingMethods: db_fishingMethods,
    seaCucumberImages: db_seaCucumberImages,
    createdAt: db_createdAt,
  } = allSpeciesData.length > 0 ? allSpeciesData[0] : {};

  const BASE_URL_FOR_PROFILE_PICS = `${BASE_URL}/seacucumber-pics`;
  const imageUrl = `${BASE_URL_FOR_PROFILE_PICS}/${db_seaCucumberImages}`;

  const formatDate = (rawDate) => {
    const date = new Date(rawDate);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
  };

  // console.log(allSpeciesData);
  // console.log(db_speciesType);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }} className="flex-grow bg-white ">
      <View style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="bg-[#fff]">
          <View className="absolute w-[223vw] h-[80vh] left-[-62vw] top-[-49vh] bg-[#0013C0]  rounded-b-full ">
            <View className="mt-[58vh] ">
              <View className="flex-row ">
                <View className=" ml-[4vw]">
                  <TouchableOpacity onPress={() => navigation.navigate("Knowledge_species")}>
                    <View className="flex m-[auto] ">
                      <Image source={require("../../assets/main_board/arrow.png")} className=" w-[10.09216px] h-[15.62988px] ml-[265px]" />
                    </View>
                  </TouchableOpacity>
                </View>

                {/* <View className=" ml-[11vw]">
                <View className="flex m-[auto] absolute ">
                  <PopupScreen />
                </View>
              </View> */}
              </View>

              <Text className="text-center text-[#fff] font-bold text-[28px] mt-[10vw] fixed">{db_scientificName}</Text>
              <Text className="text-center text-[#fff] font-bold text-[18px] fixed">({db_speciesType})</Text>
            </View>
          </View>

          <View className="mt-[32vh]">
            <Text className="text-left text-[15px] mt-[2vh] ml-[5vh] mr-[5vh] font-bold text-[#000000A6]">Description</Text>

            <Text className="text-justify text-[12px] ml-[5vh] mr-[5vh] mt-[2vh] text-[#000000A6]">{db_description}</Text>

            <View className="mt-[2vh] mx-[10vw] w-[81vw] h-[26.5vh] rounded-[30px] shadow-lg shadow-gray-700 ">
              <Image source={{ uri: imageUrl }} className=" w-[80vw] h-[25.5vh] mt-[0.5vh] ml-[0.5vw] rounded-[50px] " />
            </View>

            <Text className="text-left text-[15px] mt-[2vh] ml-[5vh] mr-[5vh] font-bold text-[#000000A6]">Habitats</Text>
            <Text className="text-justify text-[12px] ml-[5vh] mr-[5vh] mt-[2vh] text-[#000000A6]">{db_habitats}</Text>

            <Text className="text-left text-[15px] mt-[2vh] ml-[5vh] mr-[5vh] font-bold text-[#000000A6]">Feeding</Text>
            <Text className="text-justify text-[12px] ml-[5vh] mr-[5vh] mt-[2vh] text-[#000000A6]">{db_feeding}</Text>

            <Text className="text-left text-[15px] mt-[2vh] ml-[5vh] mr-[5vh] font-bold text-[#000000A6]">Reproduction</Text>
            <Text className="text-justify text-[12px] ml-[5vh] mr-[5vh] mt-[2vh] text-[#000000A6]">{db_reproduction}</Text>

            <Text className="text-left text-[15px] mt-[2vh] ml-[5vh] mr-[5vh] font-bold text-[#000000A6]">Lifecycle</Text>
            <Text className="text-justify text-[12px] ml-[5vh] mr-[5vh] mt-[2vh] text-[#000000A6]">{db_lifecycle}</Text>

            <Text className="text-left text-[15px] mt-[2vh] ml-[5vh] mr-[5vh] font-bold text-[#000000A6]">Fishing Methods</Text>
            <Text className="text-justify text-[12px] ml-[5vh] mr-[5vh] mt-[2vh] text-[#000000A6]">{db_fishingMethods}</Text>
            <Text className="text-right text-[12px] font-bold mr-[10vw] mb-[2vh] mt-[2vh] text-[#000000A6]">
              Updated : {formatDate(db_createdAt)}
            </Text>
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
