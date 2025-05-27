import { Ionicons, AntDesign } from "@expo/vector-icons";
import { Link } from "expo-router";
import React from "react";
import { StyleSheet, View } from "react-native";

const Footer = () => {
  return (
    <View style={styles.container}>
      <Link href="/">
        <Ionicons name="home-outline" size={28} color="#333" />
      </Link>

      <Link href="/content">
        <Ionicons name="map-outline" size={28} color="#333" />
      </Link>

      <Link href="/notice">
        <Ionicons name="newspaper-outline" size={28} color="#333" />
      </Link>

      <Link href="/vestibular">
        <Ionicons name="school-outline" size={28} color="#333" />
      </Link>

      <Link href="/about">
        <Ionicons name="information-circle-outline" size={28} color="#333" />
      </Link>

      <Link href="/contact">
        <Ionicons name="mail-outline" size={28} color="#333" />
      </Link>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 12,
    backgroundColor: "#f2f2f2",
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    zIndex: 2, // Adicionado para ficar na frente do menu
  },
});

export default Footer;
