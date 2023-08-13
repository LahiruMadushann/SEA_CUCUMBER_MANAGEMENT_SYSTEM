import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function PopupScreen() {
  const navigation = useNavigation();
  const [menuVisible, setMenuVisible] = useState(false);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };
  return (
    <View className=" " style={{ zIndex: 999 }}>
      <TouchableOpacity onPress={toggleMenu}>
        <Image
          source={require("../assets/fisheries/dotIcon.png")}
          className=" w-[25.21875px] h-[8px] ml-[70vw]"
        />
      </TouchableOpacity>
      {menuVisible && (
        <View style={styles.menu} className="ml-[40vw] ">
          <TouchableOpacity onPress={() => navigation.navigate("Contact")}>
            <Text className="mx-[1vw]">Contact Us </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("UpdateData")}>
            <Text className="mx-[1vw]">Update Detail</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  menu: {
    backgroundColor: "#fff",
    padding: 10,

    zIndex: 999,
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 2,
    position: "absolute",
    top: 15,
    left: 30,
  },
});
