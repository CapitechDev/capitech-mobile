import { Slot } from "expo-router";
import React, { useState } from "react";
import { StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
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
      <NavBar onMenuPress={() => setMenuVisible(true)} />

      {/* This Slot component is crucial for Expo Router to render the child routes */}
      <Slot />

      {/* Menu lateral */}
      <Menu visible={menuVisible} onClose={() => setMenuVisible(false)} />

      <Footer />
    </SafeAreaView>
  );
}
