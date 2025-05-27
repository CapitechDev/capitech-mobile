import React, { useEffect, useRef } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Modal, Pressable, Animated } from "react-native";
import { HrefObject, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

type MenuProps = {
  visible: boolean;
  onClose: () => void;
};

const MENU_WIDTH = 280; // Aumentei um pouco a largura

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

  type MenuItemProps = {
    route: string | HrefObject;
    title: string;
    icon: keyof typeof Ionicons.glyphMap;
  };

  const MenuItem: React.FC<MenuItemProps> = ({ route, title, icon }) => (
    <TouchableOpacity 
      onPress={() => handleNavigate(route)} 
      style={styles.menuItem}
    >
      <Ionicons name={icon} size={24} color="#2F4172" style={styles.menuIcon} />
      <Text style={styles.menuText}>{title}</Text>
    </TouchableOpacity>
  );

  return (
    <Modal visible={visible} animationType="none" transparent>
      <View style={[styles.overlay, { zIndex: 1 }]}>
        <SafeAreaView>
        <Pressable style={styles.backdrop} onPress={onClose} />
        <Animated.View style={[styles.menu, { transform: [{ translateX: slideAnim }] }]}>
          <View style={styles.header}>
            <Text style={styles.menuTitle}>Menu</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Ionicons name="close" size={24} color="#2F4172" />
            </TouchableOpacity>
          </View>

          <View style={styles.divider} />

          <MenuItem route="/" title="Home" icon="home-outline" />
          <MenuItem route="/content" title="Trilhas" icon="map-outline" />
          <MenuItem route="/notice" title="Notícias" icon="newspaper-outline" />
          <MenuItem route="/vestibular" title="Vestibular" icon="school-outline" />
          <MenuItem route="/about" title="Sobre" icon="information-circle-outline" />
          <MenuItem route="/contact" title="Contato" icon="mail-outline" />
        </Animated.View>
        </SafeAreaView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    flexDirection: "row", // Alterado de "row-reverse" para "row"
    backgroundColor: "rgba(0,0,0,0.4)",
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  backdrop: {
    flex: 1,
  },
  menu: {
    width: MENU_WIDTH,
    backgroundColor: "#fff",
    height: "100%",
    elevation: 8,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: -2, height: 0 },
    shadowRadius: 8,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 20,
  },
  menuTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2F4172",
  },
  closeButton: {
    padding: 8,
  },
  divider: {
    height: 1,
    backgroundColor: "#E5E5E5",
    marginHorizontal: 20,
    marginBottom: 10,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  menuIcon: {
    marginRight: 15,
  },
  menuText: {
    fontSize: 16,
    color: "#2F4172",
  },
});