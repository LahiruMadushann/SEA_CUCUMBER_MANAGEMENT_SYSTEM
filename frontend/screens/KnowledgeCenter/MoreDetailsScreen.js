import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  Platform,
  TouchableOpacity,
  Image,
} from "react-native";
import axios from "axios";
import { useNavigation, useRoute } from "@react-navigation/native";

const API_BASE_URL = Platform.select({
  ios: 'http://localhost:5002',
  android: 'http://10.0.2.2:5002',
});

export default function MoreDetailsScreen() {
  const [seaCucumberData, setSeaCucumberData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const route = useRoute();
  const { seaCucumberName } = route.params;
  const navigation = useNavigation();

  useEffect(() => {
   
    

    const moreDetails = async () => {
      try {
        const url = `${API_BASE_URL}/api/search`;
        console.log('Fetching from URL:', url);
        
        const response = await axios.get(url, {
          params: { query: seaCucumberName },
          headers: {
            "Content-Type": "application/json",
          },
        });

        console.log("API Response:", JSON.stringify(response.data, null, 2));

        if (Array.isArray(response.data)) {
          const parsedData = parseRDFData(response.data);
          setSeaCucumberData(parsedData);
        } else {
          throw new Error("Unexpected response format");
        }

      } catch (error) {
        console.error("Error fetching RDF data:", error);
        setError(`Error fetching data: ${error.message}. Please check your API endpoint and try again.`);
      } finally {
        setIsLoading(false);
      }
    };

    moreDetails();
  }, [seaCucumberName]);

  const parseRDFData = (data) => {
    const parsedData = {};
    data.forEach(item => {
      const parts = item.split(" ");
      const seaCucumberType = parts[2];
      const classType = parts[4];
      const quality = parts[6];
      const value = parts[8];

      if (!parsedData[seaCucumberType]) {
        parsedData[seaCucumberType] = {};
      }
      if (!parsedData[seaCucumberType][classType]) {
        parsedData[seaCucumberType][classType] = {};
      }
      parsedData[seaCucumberType][classType][quality] = value;
    });
    return parsedData;
  };

  if (isLoading) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center bg-[#f7f9fc]">
        <ActivityIndicator size="large" color="#0000ff" />
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView className="flex-1 bg-[#f7f9fc]">
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="p-4">
          <Text className="text-red-500 text-center text-lg">{error}</Text>
          <Text className="text-gray-600 mt-2">API Endpoint: {API_BASE_URL}/api/search</Text>
          <Text className="text-gray-600">Query: {seaCucumberName}</Text>
          <Text className="text-gray-600">Platform: {Platform.OS}</Text>
        </ScrollView>
      </SafeAreaView>
    );
  }

  if (!seaCucumberData) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center bg-[#f7f9fc]">
        <View className="p-4 bg-white rounded-lg shadow-md">
          <Text className="text-red-500 text-lg">No data available for {seaCucumberName}</Text>
        </View>
      </SafeAreaView>
    );
  }

  const formatText = (text) => {
    return text.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  };

  return (
    <SafeAreaView className="flex-1 bg-[#f7f9fc]">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        {/* Background Curve */}
        <View className="absolute w-[223vw] h-[80vh] left-[-62vw] top-[-49vh] bg-blue-900 rounded-b-full"></View>

        {/* Navigation and Header */}
        <View>
          <TouchableOpacity
            onPress={() => navigation.navigate("UploadSuccessScreen")}
            className="absolute top-10 left-5"
          >
            <Image
              source={require("../../assets/main_board/arrow.png")}
              className="w-2.5 h-4.5"
            />
          </TouchableOpacity>
          <Text className="text-white text-2xl font-bold mt-[12vh] mx-auto">
            {formatText(seaCucumberName)}
          </Text>
        </View>

        {/* Sea Cucumber Details Section */}
        <View className="p-4 bg-[#f7f9fc] rounded-lg shadow-lg mt-[18vh] mx-4">
          {Object.entries(seaCucumberData).map(([seaCucumberType, classes]) => (
            <View key={seaCucumberType} className="mb-4 p-4 bg-[#eef2f9] rounded-lg">
              <Text className="text-xl font-bold text-[#334455] mb-2">
                {formatText(seaCucumberType)}
              </Text>
              {Object.entries(classes).map(([classType, qualities]) => (
                <View key={classType} className="ml-4 mb-4">
                  <View className="p-2 bg-[#f0f4f8] rounded-md">
                    <Text className="text-lg font-semibold text-[#334455] mb-2">
                      {formatText(classType)}
                    </Text>
                    {Object.entries(qualities).map(([quality, value]) => (
                      <Text key={quality} className="text-base text-gray-600 ml-2">
                        {formatText(quality)}: {value}
                      </Text>
                    ))}
                  </View>
                </View>
              ))}
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
