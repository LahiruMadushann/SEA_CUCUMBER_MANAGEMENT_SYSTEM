import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import FooterBar from "../../components/FooterBar";

const data = [
  {
    id: 1,
    title: "A Select",
    image: "seaCucumberA.png",
    detail:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  },
  {
    id: 2,
    title: "B Select",
    image: "seaCucumberA.png",
    detail:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  },
  {
    id: 3,
    title: "C Select",
    image: "seaCucumberA.png",
    detail:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  },
  {
    id: 4,
    title: "D Select",
    image: "seaCucumberA.png",
    detail:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  },
  {
    id: 5,
    title: "E Select",
    image: "seaCucumberA.png",
    detail:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  },
  {
    id: 6,
    title: "F Select",
    image: "seaCucumberA.png",
    detail:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  },
  {
    id: 7,
    title: "G Select",
    image: "seaCucumberA.png",
    detail:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  },
  {
    id: 8,
    title: "H Select",
    image: "seaCucumberA.png",
    detail:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  },
];

const images = {
  "seaCucumberA.png": require("../../assets/knowledge_center/seaCucumberA.png"),
};

export default function KnowledgeCenterMainScreen() {
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState(data);
  const handleSearch = (text) => {
    setSearchText(text);
    const filtered = data.filter((item) =>
      item.title.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredData(filtered);
  };

  return (
    <ScrollView className="bg-[#fff]">
      <View className="">
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

          <View className="mt-[2vh]">
            <Text className="text-[22px] text-center font-bold text-[#FFFFFF]">
              Knowledge Center
            </Text>
          </View>
        </View>
        <View className="mt-[65vw] mx-auto">
          <TouchableOpacity
            onPress={() => navigation.navigate("Knowledge_species")}
            className="w-[74vw] h-[15vh] rounded-[30px] bg-[#FFFFFF] shadow-lg shadow-gray-700 "
          >
            <View className="flex">
              <Image
                source={require("../../assets/knowledge_center/species_info.jpg")}
                className="w-[20vw] h-[55px] ml-[39px] mt-[21px] rounded-[10px]"
              />
              <Text className="text-center text-[5.6vw] font-bold flex-auto mt-[-55px] ml-24">
                Sea cucumber Species
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        <View className="mt-[10vw] mx-auto">
          <TouchableOpacity
            onPress={() => navigation.navigate("Knowledge_species")}
            className="w-[74vw] h-[15vh] rounded-[30px] bg-[#FFFFFF] shadow-lg shadow-gray-700 "
          >
            <View className="flex">
              <Image
                source={require("../../assets/knowledge_center/videos_icon.jpg")}
                className="w-[20vw] h-[55px] ml-[39px] mt-[21px] rounded-[10px]"
              />
              <Text className="text-center text-[5.6vw] font-bold flex-auto mt-[-55px] ml-24">
                Sea cucumber {"\n"}Videos
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        <View className="mt-[10vw] mx-auto">
          <TouchableOpacity
            onPress={() => navigation.navigate("Knowledge_species")}
            className="w-[74vw] h-[15vh] rounded-[30px] bg-[#FFFFFF] shadow-lg shadow-gray-700 "
          >
            <View className="flex">
              <Image
                source={require("../../assets/knowledge_center/aricles_icon.jpg")}
                className="w-[20vw] h-[55px] ml-[39px] mt-[21px] rounded-[10px]"
              />
              <Text className="text-center text-[5.6vw] font-bold flex-auto mt-[-55px] ml-24">
                Sea cucumber Articles
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <View className="mt-[4vh]">
        <FooterBar />
      </View>
    </ScrollView>
  );
}
