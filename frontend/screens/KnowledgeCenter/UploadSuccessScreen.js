import React from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");

export default function UploadSuccessScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const prediction = route.params?.prediction || "";
  const predProb = route.params?.predProb || "";
  const predColor = route.params?.predColor || "";

  // Parse color information safely
  const [colorName = "", hexValue = "#000000"] = predColor.split("Hex");
  const cleanHexValue = hexValue.trim();
  const rgbMatch = predColor.match(/R=(\d+)\s*G=(\d+)\s*B=(\d+)/);
  const [r = "0", g = "0", b = "0"] = rgbMatch ? [rgbMatch[1], rgbMatch[2], rgbMatch[3]] : [];

  const details = () => {
    navigation.navigate("MoreDetailsScreen", {
      seaCucumberName: prediction,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.blueBackground} />
          <View style={styles.headerContainer}>
            <TouchableOpacity
              onPress={() => navigation.navigate("ArticlesCategoryScreen")}
              style={styles.backButton}
            >
              <Text style={styles.backButtonText}>←</Text>
            </TouchableOpacity>
            <Text style={styles.predictionText}>{prediction}</Text>
          </View>
          <View style={styles.detailsCard}>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Prediction Probability:</Text>
              <Text style={styles.detailValue}>{predProb}</Text>
            </View>
            <View style={styles.colorDetails}>
              <Text style={styles.detailLabel}>Predicted Color:</Text>
              <Text style={styles.colorName}>{colorName.trim()}</Text>
              <View style={styles.colorInfo}>
                <View style={[styles.colorSwatch, { backgroundColor: cleanHexValue }]} />
                <View style={styles.colorValues}>
                  <View style={styles.colorValueItem}>
                    <Text style={styles.colorValueLabel}>Hex:</Text>
                    <Text style={styles.colorValue}>{cleanHexValue}</Text>
                  </View>
                  <View style={styles.colorValueItem}>
                    <Text style={styles.colorValueLabel}>RGB:</Text>
                    <Text style={styles.colorValue}>{`(${r}, ${g}, ${b})`}</Text>
                  </View>
                </View>
              </View>
            </View>
            <TouchableOpacity
              onPress={details}
              style={styles.detailsButton}
            >
              <Text style={styles.detailsButtonText}>More Details</Text>
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
  scrollContent: {
    flexGrow: 1,
  },
  blueBackground: {
    position: "absolute",
    width: width * 2.23,
    height: height * 0.4,
    left: width * -0.62,
    top: 0,
    backgroundColor: "#1e3a8a",
    borderBottomLeftRadius: 1000,
    borderBottomRightRadius: 1000,
  },
  headerContainer: {
    paddingTop: 40,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  backButton: {
    padding: 10,
  },
  backButtonText: {
    color: "white",
    fontSize: 24,
  },
  predictionText: {
    color: "white",
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 20,
  },
  detailsCard: {
    backgroundColor: "white",
    borderRadius: 20,
    marginHorizontal: 20,
    marginTop: 100,
    padding: 20,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  detailItem: {
    marginBottom: 20,
  },
  detailLabel: {
    fontSize: 16,
    color: "#666",
    marginBottom: 5,
  },
  detailValue: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  colorDetails: {
    marginBottom: 20,
  },
  colorName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  colorInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  colorSwatch: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  colorValues: {
    flex: 1,
  },
  colorValueItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  colorValueLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#666",
    marginRight: 5,
    width: 40,
  },
  colorValue: {
    fontSize: 16,
    color: "#333",
  },
  detailsButton: {
    backgroundColor: "#3b82f6",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 9999,
    alignItems: "center",
    marginTop: 10,
  },
  detailsButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },
});