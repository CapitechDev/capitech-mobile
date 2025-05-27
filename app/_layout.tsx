import { Slot } from "expo-router";
import React, { useState } from "react";
import { StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Footer from "../components/Footer";
import Menu from "../components/Menu";
import NavBar from "../components/Navbar";

export default function RootLayout() {
  const [menuVisible, setMenuVisible] = useState(false);

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "#2F4172" }}
      edges={["top", "right", "bottom", "left"]}
    >
      <StatusBar barStyle="light-content" backgroundColor="#2F4172" />
      <NavBar />

      {/* Botão de menu no topo */}
      <TouchableOpacity
        style={{
          margin: 16,
          position: "absolute",
          top: 55, // Aumentado para 32 para dar mais espaço no topo
          left: 0,
          zIndex: 10,
        }}
        onPress={() => setMenuVisible(true)}
      >
        <Ionicons name="menu" size={32} color="#ffff" />
      </TouchableOpacity>

      {/* This Slot component is crucial for Expo Router to render the child routes */}
      <Slot />

      {/* Menu lateral */}
      <Menu visible={menuVisible} onClose={() => setMenuVisible(false)} />

      <Footer />
    </SafeAreaView>
  );
}
