import { Feather } from "@expo/vector-icons";
import { Link, Slot } from "expo-router";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RootLayout() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.menuIcon}>
          <Feather name="menu" size={32} color="white" />
        </TouchableOpacity>

        <View style={styles.centerContainer}>
          <Text style={styles.text}>capi</Text>
          <Link href="/" asChild>
            <TouchableOpacity>
              <Image
                source={require("../assets/capivara.png")}
                style={styles.logo}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </Link>
          <Text style={styles.text}>tech</Text>
        </View>

        <View style={styles.spacer} />
      </View>

      {/* This Slot component is crucial for Expo Router to render the child routes */}
      <Slot />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 80,
    backgroundColor: "#2F4172",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
  },
  menuIcon: {
    position: "absolute",
    left: 16,
  },
  centerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  spacer: {
    width: 48, // para balancear com o menu à esquerda
  },
  text: {
    color: "#fff",
    fontSize: 28, // aumentado
    fontWeight: "bold",
    marginHorizontal: 6,
  },
  logo: {
    width: 60, // aumentado
    height: 60,
    marginHorizontal: 6,
  },
});
