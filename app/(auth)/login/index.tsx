import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, ActivityIndicator, Alert } from "react-native";
import { router } from "expo-router";

export default function Login() {
    const [focusedInput, setFocusedInput] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleLogin = async () => {
        if (!formData.email || !formData.password) {
            Alert.alert('Erro', 'Por favor, preencha todos os campos');
            return;
        }

        if (!validateEmail(formData.email)) {
            Alert.alert('Erro', 'Por favor, insira um email válido');
            return;
        }

        if (formData.password.length < 6) {
            Alert.alert('Erro', 'A senha deve ter pelo menos 6 caracteres');
            return;
        }

        setLoading(true);
        try {
            // Aqui vai a lógica de login
            await new Promise(resolve => setTimeout(resolve, 1000)); // Simulação
            // Se o login for bem sucedido, redirecionar para home
            router.push('/');
        } catch (error) {
            Alert.alert('Erro', 'Ocorreu um erro ao fazer login');
        } finally {
            setLoading(false);
        }
    };

    const handleRegister = () => {
        router.push('/register');
    };

    const handleForgotPassword = () => {
        router.push('/forgot-password');
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <View style={styles.content}>
                    <View style={styles.headerContainer}>
                        <Text style={styles.title}>Olá seja bem-vindo ao{'\n'}Capi.tech</Text>
                        <Text style={styles.subtitle}>
                            Faça o login ou se registre para poder manter salva toda a sua jornada no site.
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
                            value={formData.email}
                            onChangeText={(text) => setFormData(prev => ({ ...prev, email: text }))}
                            onFocus={() => setFocusedInput('email')}
                            onBlur={() => setFocusedInput(null)}
                        />
                        
                        <TextInput
                            style={[
                                styles.input,
                                { borderColor: focusedInput === 'password' ? '#2196F3' : '#FFF' }
                            ]}
                            placeholder="Digite sua senha"
                            placeholderTextColor="#555555"
                            secureTextEntry
                            value={formData.password}
                            onChangeText={(text) => setFormData(prev => ({ ...prev, password: text }))}
                            onFocus={() => setFocusedInput('password')}
                            onBlur={() => setFocusedInput(null)}
                        />

                        <TouchableOpacity 
                            style={styles.loginButton}
                            onPress={handleLogin}
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
                            onPress={handleForgotPassword}
                        >
                            <Text style={styles.forgotPasswordText}>Esqueci minha senha</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
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
    loginButton: {
        backgroundColor: '#2196F3',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 10,
    },
    loginButtonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    registerButton: {
        backgroundColor: '#4CAF50',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 10,
    },
    registerButtonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    forgotPassword: {
        alignItems: 'center',
        marginTop: 20,
    },
    forgotPasswordText: {
        color: '#FFF',
        fontSize: 14,
    },
});