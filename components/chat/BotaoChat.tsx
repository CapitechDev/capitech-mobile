import { useState } from "react";
import {
  Modal,
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Image,
  Platform,
} from "react-native";
import JanelaChat from "./JanelaChat"; // Certifique-se de que este componente existe e está no caminho correto

export default function BotaoChat() {
  const [aberto, setAberto] = useState(false);

  return (
    <>
      <TouchableOpacity style={styles.fab} onPress={() => setAberto(true)}>
        <Image
          source={require("../../assets/CapiBot.png")} // Certifique-se de que o caminho e o nome do arquivo estão corretos
          style={styles.fabImage}
        />
      </TouchableOpacity>

      <Modal visible={aberto} animationType="slide" transparent>
        <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.15)" }}>
          <View
            style={{
              marginTop: Platform.OS === "ios" ? 44 : 0,
              backgroundColor: "#2F4172",
              borderTopLeftRadius: 12,
              borderTopRightRadius: 12,
              overflow: "hidden",
            }}
          >
            <TouchableOpacity
              style={styles.fechar}
              onPress={() => setAberto(false)}
            >
              <Text style={styles.fecharTexto}>✖</Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flex: 1,
              backgroundColor: "#f4f4f5",
              borderBottomLeftRadius: 12,
              borderBottomRightRadius: 12,
            }}
          >
            <JanelaChat />
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    bottom: 85,
    right: 10,
    width: 70, // Largura do botão aumentada
    height: 70, // Altura do botão aumentada
    borderRadius: 35, // Metade da largura/altura para manter circular
    alignItems: "center",
    justifyContent: "center",
    elevation: 4,
    // backgroundColor: "#2F4172", // Cor de fundo removida para usar a transparência da imagem
  },
  fabImage: {
    width: 120, // Largura da imagem dentro do botão aumentada
    height: 120, // Altura da imagem dentro do botão aumentada
    resizeMode: "contain",
  },
  fechar: {
    padding: 12,
    backgroundColor: "#2F4172",
    alignItems: "flex-end",
  },
  fecharTexto: {
    fontSize: 28,
    color: "#fff", // Força branco em todos os sistemas
    fontWeight: "bold",
    textShadowColor: "#000", // Sombra preta para contraste
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
});
