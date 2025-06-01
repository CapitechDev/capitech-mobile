import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, ActivityIndicator, Alert } from "react-native";
import { router } from "expo-router";

export default function Register() {
    const [focusedInput, setFocusedInput] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const handleLogin = async () => {
        if (!formData.email || !formData.name) {
            Alert.alert('Erro', 'Por favor, preencha todos os campos');
            return;
        }

        setLoading(true);
        try {
            // Aqui vai a lógica de login
            await new Promise(resolve => setTimeout(resolve, 1000)); // Simulação
        } catch (error) {
            Alert.alert('Erro', 'Ocorreu um erro ao fazer login');
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
                        <Text style={styles.title}>Olá seja bem-vindo ao{'\n'}Capi.tech</Text>
                        <Text style={styles.subtitle}>
                        Registre-se e começe essa jornada já.
                        </Text>
                    </View>

                    <View style={styles.inputContainer}>
                        <TextInput
                            style={[
                                styles.input,
                                { borderColor: focusedInput === 'name' ? '#2196F3' : '#FFF' }
                            ]}
                            placeholder="Digite seu nome"
                            placeholderTextColor="#555555"
                            autoCapitalize="none"
                            value={formData.name}
                            onChangeText={(text) => setFormData(prev => ({ ...prev, name: text }))}
                            onFocus={() => setFocusedInput('name')}
                            onBlur={() => setFocusedInput(null)}
                        />
                        
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
                            keyboardType="visible-password"
                            autoCapitalize="none"
                            value={formData.password}
                            onChangeText={(text) => setFormData(prev => ({ ...prev, password: text }))}
                            onFocus={() => setFocusedInput('password')}
                            onBlur={() => setFocusedInput(null)}
                        />

                        <TextInput
                            style={[
                                styles.input,
                                { borderColor: focusedInput === 'confirmPassword' ? '#2196F3' : '#FFF' }
                            ]}
                            placeholder="Confirme sua senha"
                            placeholderTextColor="#555555"
                            keyboardType="visible-password"
                            autoCapitalize="none"
                            value={formData.confirmPassword}
                            onChangeText={(text) => setFormData(prev => ({ ...prev, confirmPassword: text }))}
                            onFocus={() => setFocusedInput('confirmPassword')}
                            onBlur={() => setFocusedInput(null)}
                        />
                        

                        <TouchableOpacity style={styles.registerButton}>
                            <Text style={styles.registerButtonText}>Registre-se</Text>
                        </TouchableOpacity>

                        <TouchableOpacity 
                            style={styles.loginButton}
                            onPress={handleBackToLogin}
                        >
                            <Text style={styles.loginButtonText}>Voltar para login</Text>
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
    forgotPassword: {
        alignItems: 'center',
        marginTop: 20,
    },
    forgotPasswordText: {
        color: '#FFF',
        fontSize: 14,
    },
});