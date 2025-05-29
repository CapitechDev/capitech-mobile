import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, ActivityIndicator, Alert } from "react-native";
import { router } from "expo-router";

export default function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [focusedInput, setFocusedInput] = useState<string | null>(null);

    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleResetPassword = async () => {
        if (!email) {
            Alert.alert('Erro', 'Por favor, digite seu email');
            return;
        }

        if (!validateEmail(email)) {
            Alert.alert('Erro', 'Por favor, insira um email válido');
            return;
        }

        setLoading(true);
        try {
            // Aqui irá a lógica de recuperação de senha
            await new Promise(resolve => setTimeout(resolve, 1000)); // Simulação
            Alert.alert(
                'Sucesso', 
                'Se este email estiver cadastrado, você receberá as instruções para redefinir sua senha.',
                [{ text: 'OK', onPress: () => router.back() }]
            );
        } catch (error) {
            Alert.alert('Erro', 'Ocorreu um erro ao processar sua solicitação');
        } finally {
            setLoading(false);
        }
    };

    const handleBackToLogin = () => {
        router.back();
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <View style={styles.content}>
                    <View style={styles.headerContainer}>
                        <Text style={styles.title}>Recuperar Senha</Text>
                        <Text style={styles.subtitle}>
                            Digite seu email cadastrado para receber as instruções de recuperação de senha
                        </Text>
                    </View>

                    <View style={styles.inputContainer}>
                        <TextInput
                            style={[
                                styles.input,
                                { borderColor: focusedInput === 'email' ? '#2196F3' : '#FFF' }
                            ]}
                            placeholder="Digite seu E-mail"
                            placeholderTextColor="#555555"
                            keyboardType="email-address"
                            autoCapitalize="none"
                            value={email}
                            onChangeText={setEmail}
                            onFocus={() => setFocusedInput('email')}
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
                                <Text style={styles.resetButtonText}>Enviar instruções</Text>
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
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#242424',
    },
    container: {
        flex: 1,
        backgroundColor: '#242424',
    },
    content: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
    },
    headerContainer: {
        marginBottom: 40,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FFF',
        textAlign: 'center',
        marginBottom: 16,
    },
    subtitle: {
        fontSize: 14,
        color: '#FFF',
        textAlign: 'center',
        paddingHorizontal: 20,
    },
    inputContainer: {
        width: '100%',
        gap: 16,
    },
    input: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderRadius: 8,
        padding: 15,
        fontSize: 16,
        color: '#FFF',
        marginBottom: 16,
    },
    resetButton: {
        backgroundColor: '#2196F3',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 10,
    },
    resetButtonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    backButton: {
        backgroundColor: '#2196F3',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 10,
    },
    backButtonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
});