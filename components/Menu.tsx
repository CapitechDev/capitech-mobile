import { Ionicons } from "@expo/vector-icons";
import { HrefObject, useRouter } from "expo-router";
import React, { useEffect, useRef } from "react";
import {
  Animated,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useAuth } from "../hooks/useAuth";

const MENU_WIDTH = 280;

type MenuProps = {
  visible: boolean;
  onClose: () => void;
};

export default function Menu({ visible, onClose }: MenuProps) {
  const router = useRouter();
  const slideAnim = useRef(new Animated.Value(-MENU_WIDTH)).current;
  const { logout } = useAuth();

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
    if (route === "/logout") {
      logout(); // Chama a função de logout
      router.replace("/login"); // Força o reload e redireciona para login
    } else {
      router.push(route);
    }
    onClose();
  };

  type MenuItemProps = {
    route: string | HrefObject;
    title: string;
    icon: React.ComponentProps<typeof Ionicons>["name"];
  };

  const MenuItem: React.FC<MenuItemProps> = ({ route, title, icon }) => (
    <TouchableOpacity
      onPress={() => handleNavigate(route)}
      style={styles.menuItem}
    >
      <Ionicons name={icon} size={28} color="#333" style={styles.menuIcon} />
      <Text style={styles.menuText}>{title}</Text>
    </TouchableOpacity>
  );

  return (
    <Modal visible={visible} animationType="none" transparent>
      <View style={styles.overlay}>
        <Pressable style={styles.backdrop} onPress={onClose} />
        <Animated.View
          style={[styles.menu, { transform: [{ translateX: slideAnim }] }]}
        >
          <View style={styles.header}>
            <Text style={styles.menuTitle}>Menu</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Ionicons name="close" size={28} color="#333" />
            </TouchableOpacity>
          </View>

          <View style={styles.divider} />

          <MenuItem route="/" title="Home" icon="home-outline" />
          <MenuItem route="/content" title="Trilhas" icon="map-outline" />
          <MenuItem route="/notice" title="Notícias" icon="newspaper-outline" />
          <MenuItem
            route="/vestibular"
            title="Vestibular"
            icon="school-outline"
          />
          <MenuItem
            route="/analise"
            title="Análise de Dados"
            icon="analytics-outline"
          />
          <MenuItem
            route="/about"
            title="Sobre"
            icon="information-circle-outline"
          />
          <MenuItem route="/contact" title="Contato" icon="mail-outline" />
          <MenuItem route="/logout" title="Logout" icon="log-in-outline" />
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    flexDirection: "row-reverse", // Alterado de "row" para "row-reverse"
    backgroundColor: "rgba(0,0,0,0.4)",
    position: "absolute",
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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 20,
  },
  menuTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
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
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  menuIcon: {
    marginRight: 15,
  },
  menuText: {
    fontSize: 16,
    color: "#333",
  },
});
