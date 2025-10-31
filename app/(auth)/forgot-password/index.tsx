import axios from "axios";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Keyboard,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { ScrollView } from "react-native";
import Toast from "react-native-toast-message";
import { api } from "../../../services/api";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [focusedInput, setFocusedInput] = useState<string | null>(null);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Função padronizada para tratamento de erros
  const handleError = (error: any, defaultMessage: string) => {
    console.error("Erro:", error);
    const message =
      error?.response?.data?.message || error?.message || defaultMessage;
    Toast.show({
      type: "error",
      text1: "Erro",
      text2: String(message),
      position: "top",
    });
  };

  const handleEmailPassword = async () => {
    if (!email) {
      Toast.show({
        type: "error",
        text1: "Erro",
        text2: "Por favor, digite seu email",
        position: "top",
      });
      return;
    }

    if (!validateEmail(email)) {
      Toast.show({
        type: "error",
        text1: "Erro",
        text2: "Por favor, insira um email válido",
        position: "top",
      });
      return;
    }

    setLoading(true);
    try {
      const data = {
        email,
      };

      const response = await api.post("/auth/forgot-password", data);
      //await new Promise((resolve) => setTimeout(resolve, 500));
      console.log("Resposta do backend:", response.data);

      Toast.show({
        type: "success",
        text1: "Sucesso",
        text2:
          "Se este email estiver cadastrado, você receberá as instruções para redefinir sua senha.",
        position: "top",
      });
    } catch (error: any) {
      handleError(error, "Erro ao enviar instruções por email");
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (!token.trim() || !password.trim()) {
      Toast.show({
        type: "error",
        text1: "Erro",
        text2: "Por favor, preencha todos os campos corretamente.",
        position: "top",
      });
      return;
    }

    setLoading(true);
    try {
      const data = {
        token: token.trim(),
        newPassword: password.trim(),
      };

      const response = await api.post("/auth/reset-password", data);

      console.log("Resposta do backend:", response.data);

      Toast.show({
        type: "success",
        text1: "Sucesso",
        text2: "Sua senha foi atualizada com sucesso!",
        position: "top",
      });
      setTimeout(() => router.push("/login"), 1500);
    } catch (error: any) {
      handleError(error, "Erro ao atualizar senha");
    } finally {
      setLoading(false);
    }
  };

  const handleBackToLogin = () => {
    router.back();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <ScrollView>
          <View style={styles.container}>
            <View style={styles.content}>
              <View style={styles.headerContainer}>
                <Text style={styles.title}>Recuperar Senha</Text>
                <Text style={styles.subtitle}>
                  Digite seu email cadastrado para receber as instruções de
                  recuperação de senha
                </Text>
              </View>

              <View style={styles.inputContainer}>
                <TextInput
                  style={[
                    styles.input,
                    {
                      borderColor:
                        focusedInput === "email" ? "#2196F3" : "#FFF",
                    },
                  ]}
                  placeholder="Digite seu E-mail"
                  placeholderTextColor="#555555"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={email}
                  onChangeText={setEmail}
                  onFocus={() => setFocusedInput("email")}
                  onBlur={() => setFocusedInput(null)}
                />

                <TouchableOpacity
                  style={styles.resetButton}
                  onPress={handleEmailPassword} // Validação ocorre aqui
                  disabled={loading}
                >
                  {loading ? (
                    <ActivityIndicator color="#FFF" />
                  ) : (
                    <Text style={styles.resetButtonText}>
                      Enviar instruções
                    </Text>
                  )}
                </TouchableOpacity>

                <TextInput
                  style={styles.input}
                  placeholder="Digite o token"
                  placeholderTextColor="#555555"
                  autoCapitalize="none"
                  value={token}
                  onChangeText={setToken}
                  onFocus={() => setFocusedInput("token")}
                  onBlur={() => setFocusedInput(null)}
                />

                <TextInput
                  style={styles.input}
                  placeholder="Digite sua nova senha"
                  placeholderTextColor="#555555"
                  secureTextEntry
                  value={password}
                  onChangeText={setPassword}
                  onFocus={() => setFocusedInput("newPassword")}
                  onBlur={() => setFocusedInput(null)}
                />

                <TouchableOpacity
                  style={styles.resetButton}
                  onPress={handleResetPassword}
                  disabled={loading}
                >
                  {loading ? (
                    <ActivityIndicator color="#FFF" />
                  ) : (
                    <Text style={styles.resetButtonText}>Atualizar senha</Text>
                  )}
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.backButton}
                  onPress={handleBackToLogin}
                >
                  <Text style={styles.backButtonText}>Voltar para login</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
      <Toast />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#242424",
  },
  container: {
    flex: 1,
    backgroundColor: "#242424",
    paddingVertical: 20,
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  headerContainer: {
    marginBottom: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFF",
    textAlign: "center",
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 14,
    color: "#FFF",
    textAlign: "center",
    paddingHorizontal: 20,
  },
  inputContainer: {
    width: "100%",
    gap: 16,
  },
  input: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
    color: "#FFF",
    marginBottom: 16,
  },
  resetButton: {
    backgroundColor: "#2196F3",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  resetButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  backButton: {
    backgroundColor: "#2196F3",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  backButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});
