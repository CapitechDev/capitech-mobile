import React, { useEffect, useRef } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Modal, Pressable, Animated } from "react-native";
import { HrefObject, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons"; // Corrigi o 'rimport' para 'import'

type MenuProps = {
  visible: boolean;
  onClose: () => void;
};

const MENU_WIDTH = 250;

export default function Menu({ visible, onClose }: MenuProps) {
  const router = useRouter();
  const slideAnim = useRef(new Animated.Value(-MENU_WIDTH)).current;

  useEffect(() => {
    if (visible) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 250,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: -MENU_WIDTH,
        duration: 200,
        useNativeDriver: false,
      }).start();
    }
  }, [visible]);

  const handleNavigate = (route: string | HrefObject) => {
    onClose();
    router.push(route);
  };

  return (
    <Modal visible={visible} animationType="none" transparent>
      <View style={styles.overlay}>
        <Pressable style={styles.backdrop} onPress={onClose} />
        <Animated.View style={[styles.menu, { transform: [{ translateX: slideAnim }] }]}>
          <Text style={styles.menuTitle}>Menu</Text>
          <TouchableOpacity onPress={() => handleNavigate("/")} style={styles.menuItem}>
            <Text style={styles.menuText}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleNavigate("/content")} style={styles.menuItem}>
            <Text style={styles.menuText}>Trilhas</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleNavigate("/notice")} style={styles.menuItem}>
            <Text style={styles.menuText}>Notícias</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleNavigate("/vestibular")} style={styles.menuItem}>
            <Text style={styles.menuText}>Vestibular</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleNavigate("/about")} style={styles.menuItem}>
            <Text style={styles.menuText}>Sobre</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleNavigate("/contact")} style={styles.menuItem}>
            <Text style={styles.menuText}>Contato</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    flexDirection: "row-reverse", // <-- alterado aqui
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  backdrop: {
    flex: 1,
  },
  menu: {
    width: MENU_WIDTH,
    backgroundColor: "#fff",
    paddingTop: 56, // Ajustado para alinhar com o cabeçalho
    paddingHorizontal: 20,
    height: "100%",
    elevation: 8,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: -2, height: 0 }, // sombra para o lado esquerdo
    shadowRadius: 8,
  },
  menuTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },
  menuItem: {
    paddingVertical: 15,
  },
  menuText: {
    fontSize: 18,
  },
});