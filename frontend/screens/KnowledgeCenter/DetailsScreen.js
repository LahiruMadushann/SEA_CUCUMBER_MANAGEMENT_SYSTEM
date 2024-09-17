import React from "react";
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

const { width, height } = Dimensions.get("window");

export default function DetailsScreen() {
  const navigation = useNavigation();



  const details = async () => {
  
    try {

      navigation.navigate('DetailsScreen');

    } catch (error) {
      console.error(error);
      alert("Something Went Wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          className="bg-white"
        >
          <View className="absolute w-[223vw] h-[80vh] left-[-62vw] top-[-49vh] bg-blue-900 rounded-b-full"></View>
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
              Sea Cucumber Name
            </Text>
          </View>
          <View className="mt-[20vh] mx-auto">
            <Image
              source={require("../../assets/icons/gallery.png")}
              className="w-[20vw] h-[20vw]"
            />
            <TouchableOpacity
              onPress={details}
              className="bg-blue-500 py-2 px-4 rounded-full self-center mt-5"
            >
              <Text className="text-white font-bold text-lg">More Details</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
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
