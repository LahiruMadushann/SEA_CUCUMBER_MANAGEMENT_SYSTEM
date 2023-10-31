import React from "react";
import { View, Text, ActivityIndicator } from "react-native";

const LoadingIndicator = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator
        size={"large"}
        color="#0013C0"
        style={{
          opacity: 0.6,
        }}
      />
      <Text className="text-[16px] mt-[1vh] text-center text-[#0013C0]">
        Please wait...
      </Text>
    </View>
  );
};

export default LoadingIndicator;
