import { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import useChat from "../../hooks/useChat";
import BalaoMensagem from "./BalaoMensagem";

export default function JanelaChat({
  onFechar,
  mensagemInicial,
}: {
  onFechar?: () => void;
  mensagemInicial?: string;
}) {
  const { mensagens, adicionarMensagem, pensando, limparMensagens } = useChat();
  const [texto, setTexto] = useState("");
  const [jaEnviouInicial, setJaEnviouInicial] = useState(false);
  const scrollRef = useRef<ScrollView>(null);

  useEffect(() => {
    scrollRef.current?.scrollToEnd({ animated: true });
  }, [mensagens, pensando]);

  useEffect(() => {
    return () => {
      limparMensagens();
    };
  }, []);

  useEffect(() => {
    if (mensagemInicial && !jaEnviouInicial && mensagens.length === 0) {
      adicionarMensagem(mensagemInicial);
      setJaEnviouInicial(true);
    }
  }, [mensagemInicial, jaEnviouInicial, mensagens.length]);

  const enviar = () => {
    if (!texto.trim()) return;
    adicionarMensagem(texto.trim());
    setTexto("");
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 30}
        enabled
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "#f4f4f5",
            borderRadius: 12,
          }}
        >
          <ScrollView
            ref={scrollRef}
            contentContainerStyle={styles.chat}
            onContentSizeChange={() =>
              scrollRef.current?.scrollToEnd({ animated: true })
            }
          >
            {mensagens.map((msg, index) => (
              <BalaoMensagem key={index} mensagem={msg} />
            ))}
            {pensando && (
              <View style={styles.pensando}>
                <ActivityIndicator size="small" color="#b91c1c" />
                <Text style={{ marginLeft: 8, color: "#b91c1c" }}>
                  Assistente está digitando...
                </Text>
              </View>
            )}
          </ScrollView>
          <View style={styles.footer}>
            <TextInput
              style={styles.input}
              placeholder="Digite uma mensagem..."
              onSubmitEditing={enviar}
              value={texto}
              onChangeText={setTexto}
              multiline
              editable={!pensando}
              blurOnSubmit={true}
              returnKeyType="send"
            />
            <TouchableOpacity
              style={styles.botao}
              onPress={enviar}
              disabled={pensando}
            >
              <Text style={styles.botaoTexto}>Enviar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f5",
  },
  chat: {
    padding: 16,
  },
  footer: {
    flexDirection: "row",
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: "#e4e4e7",
    backgroundColor: "#fff",
  },
  input: {
    flex: 1,
    backgroundColor: "#e4e4e7",
    borderRadius: 16,
    padding: 12,
    fontSize: 16,
    marginRight: 8,
    maxHeight: 100,
  },
  botao: {
    backgroundColor: "#2F4172",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 16,
    justifyContent: "center",
    opacity: 1,
  },
  botaoTexto: {
    color: "white",
    fontWeight: "bold",
  },
  pensando: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
});
