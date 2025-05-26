import { Slot } from "expo-router";
import React from "react";
import { StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Footer from "../components/Footer";
import NavBar from "../components/Navbar";

export default function RootLayout() {
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "#2F4172" }}
      edges={["top", "right", "bottom", "left"]}
    >
      <StatusBar barStyle="light-content" backgroundColor="#2F4172" />
      <NavBar />

      {/* This Slot component is crucial for Expo Router to render the child routes */}
      <Slot />

      <Footer />
    </SafeAreaView>
  );
}
