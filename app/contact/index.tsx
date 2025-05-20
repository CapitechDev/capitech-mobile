import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import emailjs from "emailjs-com";
import { Ionicons } from "@expo/vector-icons";

export default function Contato() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const serviceID = process.env.EXPO_PUBLIC_SERVICE_ID;
  const templateID = process.env.EXPO_PUBLIC_TEMPLATE_ID;
  const publicKey = process.env.EXPO_PUBLIC_PUBLIC_KEY;

  const sendEmail = () => {
    if (!serviceID || !templateID || !publicKey) {
      setError(true);
      return;
    }

    setLoading(true);
    setError(false);

    const templateParams = {
      name,
      email,
      subject,
      message: text,
    };

    emailjs
      .send(serviceID, templateID, templateParams, publicKey)
      .then(() => {
        setName("");
        setEmail("");
        setSubject("");
        setText("");
        setSuccess(true);
        setLoading(false);
        setTimeout(() => setSuccess(false), 10000);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Contato</Text>
        </View>

        <View style={styles.containerform}>
          <Text style={styles.subTitle}>Nos envie uma mensagem:</Text>

          <TextInput
            placeholder="Nome Completo"
            value={name}
            onChangeText={setName}
            style={styles.input}
          />

          <TextInput
            placeholder="E-mail"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            style={styles.input}
          />

          <TextInput
            placeholder="Assunto"
            value={subject}
            onChangeText={setSubject}
            style={styles.input}
          />

          <View style={styles.textareaContainer}>
            <TextInput
              placeholder="Escreva o assunto..."
              value={text}
              onChangeText={setText}
              style={[styles.input, styles.textarea]}
              multiline
              textAlignVertical="top"
            />
          </View>

          <TouchableOpacity
            style={styles.button}
            onPress={sendEmail}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Enviar</Text>
            )}
          </TouchableOpacity>

          {success && (
            <Text style={styles.success}>
              <Ionicons name="checkmark-circle" size={16} color="green" />{" "}
              Mensagem enviada com sucesso!
            </Text>
          )}

          {error && (
            <Text style={styles.error}>
              Ocorreu um erro ao enviar a mensagem. Por favor, tente novamente.
            </Text>
          )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flexGrow: 1,
    alignItems: "stretch",
  },
  containerform: {
    paddingHorizontal: 20,
    backgroundColor: "#fff",
    flex: 1,
    alignItems: "stretch",
  },
  header: {
    height: 40,
    backgroundColor: "gray",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  headerText: {
    color: "#fff",
    fontWeight: "bold",
  },
  subTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    backgroundColor: "#f0f0f0",
    borderColor: "#999",
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 12,
  },
  textareaContainer: {
    flex: 1,
    marginBottom: 50,
  },
  textarea: {
    flex: 1,
  },
  button: {
    backgroundColor: "#0099cc",
    paddingVertical: 12,
    borderRadius: 20,
    alignItems: "center",
    marginBottom: 50,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  success: {
    color: "green",
    textAlign: "center",
    marginTop: 10,
  },
  error: {
    color: "red",
    textAlign: "center",
    marginTop: 10,
  },
});
