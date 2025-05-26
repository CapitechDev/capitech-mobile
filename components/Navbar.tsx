import { Feather } from "@expo/vector-icons";
import { Link, Slot } from "expo-router";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const NavBar = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.menuIcon}>
        <Feather name="menu" size={32} color="white" />
      </TouchableOpacity>

      <View style={styles.centerContainer}>
        <Link href="/" asChild>
          <TouchableOpacity
            style={{ flexDirection: "row", alignItems: "center" }}
          >
            <Text style={styles.text}>capi</Text>
            <Image
              source={require("../assets/capivara.png")}
              style={styles.logo}
              resizeMode="contain"
            />
            <Text style={styles.text}>tech</Text>
          </TouchableOpacity>
        </Link>
      </View>

      <View style={styles.spacer} />
    </View>
  );
};

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
    position: "absolute",
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

export default NavBar;
  