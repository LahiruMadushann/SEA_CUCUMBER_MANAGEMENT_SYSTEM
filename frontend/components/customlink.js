import React from "react";
import { Linking, TouchableOpacity, Text, Alert } from "react-native";

// Reusable Link component
const CustomLink = ({ url }) => {
  const handleLinkClick = () => {
    Linking.openURL(url)
      .then((data) => {
        // The link was opened successfully
      })
      .catch((err) => {
        console.error("Error opening link:", err);
        Alert.alert(
          "Error",
          "Could not open the link. Please try again later."
        );
      });
  };

  return (
    <TouchableOpacity onPress={handleLinkClick}>
      <Text
        className="text-justify text-[12px] ml-[10vw] mr-[5vh] text-[#000000A6]"
        style={{ color: "blue", textDecorationLine: "underline" }}
      >
        {url}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomLink;
