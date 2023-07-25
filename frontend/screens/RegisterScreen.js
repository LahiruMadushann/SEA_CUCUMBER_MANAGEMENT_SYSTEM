import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import FooterBar from "../components/FooterBar";

export default function RegisterScreen() {
  const navigation = useNavigation();
  return (
    <ScrollView className="flex-grow bg-white">
      <SafeAreaView>
        <View className="absolute w-[149.2vw] h-[35vh] inset-x-[-104px] top-[-22px] bg-[#0013C0]  rounded-b-full ">
          <View className="mt-[18vw]">
            <TouchableOpacity onPress={() => navigation.navigate("AquaStart")}>
              <View className="flex m-[auto] ">
                <Image
                  source={require("../assets/fisheries/dotIcon.png")}
                  className=" w-[24.21875px] h-[7.03125px] ml-[334px]"
                />
              </View>
            </TouchableOpacity>
          </View>

          <View className="flex-row mt-[30px] mx-auto">
            <TouchableOpacity onPress={() => navigation.navigate("MainBoard")}>
              <View className="ml-7 w-[78px] h-[73px] ">
                <Image
                  source={require("../assets/register/Register.png")}
                  className="w-[78px] h-[73px] center"
                />
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate("MainBoard")}>
              <View className=" w-[226px] h-[48px] mt-[15px]">
                <Text className=" font-bold text-[#FFFFFF] text-center text-[22px] px-[31px] py-[5px] ">
                  Register Panel
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <View className="mx-auto self-center mt-[54vw] ">
          <TouchableOpacity
            onPress={() => navigation.navigate("FishRegister")}
            className="w-[82vw] h-[17.5vh] rounded-[30px] bg-[#FFFFFF] shadow-lg shadow-gray-700 "
          >
            <View className="w-[143px] h-[25px] ml-[64px] mt-[4vw]">
              <Text className="text-[11px] font-bold text-[#000000A6]">
                Register as a
              </Text>
            </View>

            <View className="flex ">
              <Image
                source={require("../assets/main_board/fishing.png")}
                className="w-[73px] h-[55px] ml-[39px] mt-[4px]"
              />
              <Text className="text-center text-[18px] font-bold flex-auto mt-[-52px] ml-[15px]">
                Farmer
              </Text>
              <Text className=" text-[8px] mt-[4px] ml-[126px] mr-8 flex-auto ">
                for Insert the details about fishing the sea {"\\n"} cucamba
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate("UserRegister")}
            className="w-[82vw] h-[17.5vh] rounded-[30px] bg-[#FFFFFF] mt-[6vw] shadow-lg shadow-gray-700"
          >
            <View className="w-[143px] h-[25px] ml-[64px] mt-[4vw]">
              <Text className="text-[11px] font-bold text-[#000000A6]">
                Register as a
              </Text>
            </View>
            <View className="flex ">
              <Image
                source={require("../assets/main_board/knowledge.png")}
                className="w-[83px] h-[77px] ml-[39px] mt-[-18px]"
              />
              <Text className="text-center text-[18px] font-bold flex-auto mt-[-58px] ml-[83px]">
                Fisherman
              </Text>
              <Text className=" text-[8px] mt-[4px] ml-[132px] mr-8 flex-auto ">
                Use knowledge center with better experience User other sections
                to get an idea
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate("AquaRegister")}
            className="w-[82vw] h-[17.5vh] rounded-[30px] bg-[#FFFFFF] mt-[6vw] shadow-lg shadow-gray-700"
          >
            <View className="w-[143px] h-[25px] ml-[64px] mt-[4vw]">
              <Text className="text-[11px] font-bold text-[#000000A6]">
                Register as a
              </Text>
            </View>
            <View className="flex ">
              <Image
                source={require("../assets/main_board/farming.png")}
                className="w-[78px] h-[53px] ml-[39px] mt-[4px]"
              />
              <Text className="text-center text-[18px] font-bold flex-auto mt-[-52px] ml-8">
                Exporter
              </Text>
              <Text className=" text-[8px] mt-[4px] ml-[129px] mr-8 flex-auto ">
                for Insert the details about farming the sea cucamba {"\\n"}
                Update Details about stoke and etc
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate("UserRegister")}
            className="w-[82vw] h-[17.5vh] rounded-[30px] bg-[#FFFFFF] mt-[6vw] shadow-lg shadow-gray-700 mb-[12vw]"
          >
            <View className="w-[143px] h-[25px] ml-[64px] mt-[4vw]">
              <Text className="text-[11px] font-bold text-[#000000A6]">
                Register as a
              </Text>
            </View>
            <View className="flex ">
              <Image
                source={require("../assets/main_board/knowledge.png")}
                className="w-[83px] h-[77px] ml-[39px] mt-[-18px]"
              />
              <Text className="text-center text-[18px] font-bold flex-auto mt-[-58px] ml-[83px]">
                Fish Processor
              </Text>
              <Text className=" text-[8px] mt-[4px] ml-[132px] mr-8 flex-auto ">
                Use knowledge center with better experience User other sections
                to get an idea
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        <View className="mt-[4vh]">
          <FooterBar />
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}
