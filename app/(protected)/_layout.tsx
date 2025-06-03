import { Redirect, Slot } from "expo-router";
import React, { useState } from "react";
import { StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Footer from "../../components/Footer";
import Menu from "../../components/Menu";
import NavBar from "../../components/Navbar";
import { useAuth } from "../../hooks/useAuth"; // use o hook aqui
import BotaoChat from "../components/chat/BotaoChat";

export default function RootLayout() {
  const [menuVisible, setMenuVisible] = useState(false);
  const { authState } = useAuth();

  if (!authState.authenticated) {
    return <Redirect href="/login" />;
  }

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "#2F4172" }}
      edges={["top", "right", "bottom", "left"]}
    >
      <StatusBar barStyle="light-content" backgroundColor="#2F4172" />
      <NavBar onMenuPress={() => setMenuVisible(true)} />
      <Slot />
      <Menu visible={menuVisible} onClose={() => setMenuVisible(false)} />
      <Footer />
      <BotaoChat />
    </SafeAreaView>
  );
}