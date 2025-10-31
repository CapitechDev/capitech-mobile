import axios from "axios";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
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
import { useAuth } from "../../../hooks/useAuth";
import { api } from "../../../services/api";

export default function Login() {
  const [focusedInput, setFocusedInput] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { login } = useAuth();
  const router = useRouter();

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

  const validateLoginForm = (email: string, password: string) => {
    if (!email || !password) {
      Toast.show({
        type: "error",
        text1: "Erro",
        text2: "Todos os campos são obrigatórios",
        position: "top",
      });
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      Toast.show({
        type: "error",
        text1: "Erro",
        text2: "E-mail inválido",
        position: "top",
      });
      return false;
    }
    if (password.length < 6) {
      Toast.show({
        type: "error",
        text1: "Erro",
        text2: "Senha deve ter pelo menos 6 caracteres",
        position: "top",
      });
      return false;
    }
    return true;
  };

  const handleLogin = async (email: string, password: string) => {
    setLoading(true);
    try {
      console.log("🔑 Tentando fazer login com:", { email });
      const response = await api.post("/auth/login", {
        email,
        password,
      });

      console.log("✅ Resposta completa do login:", response);
      console.log("📊 Status da resposta:", response.status);
      console.log("🎯 Data da resposta:", response.data);

      if (response.status === 200 || response.status === 201) {
        const token = response.data.token;
        console.log(
          "🔐 Token recebido:",
          token ? "✅ Token presente" : "❌ Token ausente"
        );

        if (token) {
          await login(token);
          console.log("🚀 Redirecionando para página principal...");
          Toast.show({
            type: "success",
            text1: "Sucesso",
            text2: "Login realizado com sucesso!",
            position: "top",
          });
          router.replace("/");
        } else {
          Toast.show({
            type: "error",
            text1: "Erro",
            text2: "Token não recebido do servidor",
            position: "top",
          });
        }
      } else {
        Toast.show({
          type: "error",
          text1: "Erro",
          text2: `Status inesperado: ${response.status}`,
          position: "top",
        });
      }
    } catch (error) {
      handleError(error, "Erro ao fazer login");
    } finally {
      setLoading(false);
    }
  };

  const handleLoginPress = () => {
    if (validateLoginForm(formData.email, formData.password)) {
      handleLogin(formData.email, formData.password);
    }
  };

  const handleRegister = () => {
    router.push("/register");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <ScrollView>
          <View style={styles.container}>
            <View style={styles.content}>
              <Image
                source={require("../../../assets/capivara.png")}
                style={styles.CapiImage}
              />
              <View style={styles.headerContainer}>
                <Text style={styles.title}>
                  Olá, seja bem-vindo ao{"\n"}Capi.tech
                </Text>
                <Text style={styles.subtitle}>
                  Faça o login ou registre-se para poder manter salva toda a sua
                  jornada no site.
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
                  value={formData.email}
                  onChangeText={(text) =>
                    setFormData((prev) => ({ ...prev, email: text }))
                  }
                  onFocus={() => setFocusedInput("email")}
                  onBlur={() => setFocusedInput(null)}
                />

                <TextInput
                  style={[
                    styles.input,
                    {
                      borderColor:
                        focusedInput === "password" ? "#2196F3" : "#FFF",
                    },
                  ]}
                  placeholder="Digite sua senha"
                  placeholderTextColor="#555555"
                  secureTextEntry={true}
                  value={formData.password}
                  onChangeText={(text) =>
                    setFormData((prev) => ({ ...prev, password: text }))
                  }
                  onFocus={() => setFocusedInput("password")}
                  onBlur={() => setFocusedInput(null)}
                />

                <TouchableOpacity
                  style={styles.loginButton}
                  onPress={handleLoginPress}
                  disabled={loading}
                >
                  {loading ? (
                    <ActivityIndicator color="#FFF" />
                  ) : (
                    <Text style={styles.loginButtonText}>Login</Text>
                  )}
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.registerButton}
                  onPress={handleRegister}
                >
                  <Text style={styles.registerButtonText}>Registre-se</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.forgotPassword}
                  onPress={() => router.push("/forgot-password")}
                >
                  <Text style={styles.forgotPasswordText}>
                    Esqueci minha senha
                  </Text>
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
  CapiImage: {
    width: 100,
    height: 100,
    alignSelf: "center",
    marginBottom: 20,
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
  loginButton: {
    backgroundColor: "#2196F3",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  loginButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  registerButton: {
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  registerButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  forgotPassword: {
    alignItems: "center",
    marginTop: 20,
  },
  forgotPasswordText: {
    color: "#FFF",
    fontSize: 14,
  },
});
