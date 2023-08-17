import React, { useState } from "react";
import { useAuth } from "../auth/AuthContext";

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

export default function FarmPopupScreen({ farmId, farmName }) {
  const navigation = useNavigation();
  const [menuVisible, setMenuVisible] = useState(false);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };
  return (
    <View className=" " style={{ zIndex: 999 }}>
      <TouchableOpacity onPress={toggleMenu}>
        <Image
          source={require("../assets/options.png")}
          className=" w-[24.21875px] h-[25px] ml-[70vw]"
        />
      </TouchableOpacity>
      {menuVisible && (
        <View style={styles.menu} className="ml-[40vw] ">
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("UpdateFarmScreen", {
                farmId: farmId,
                farmName: farmName,
              })
            }
          >
            <Text className="mx-[1vw]">Update Farm </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("UpdateFarmingScreen", { farmId: farmId })
            }
          >
            <Text className="mx-[1vw]">Update Stock Details</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("ViewFarmingRecordsScreen", {
                farmId: farmId,
                farmName: farmName,
              })
            }
          >
            <Text className="mx-[1vw]">View Records</Text>
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
