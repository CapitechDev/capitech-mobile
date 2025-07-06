import axios from 'axios';
import { router } from "expo-router";
import React, { useState } from "react";
import { Alert, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function Register() {
    const [focusedInput, setFocusedInput] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleRegister = async () => {
        if (!formData.email || !formData.name || !formData.password || !formData.confirmPassword) {
            Alert.alert('Erro', 'Por favor, preencha todos os campos');
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            Alert.alert('Erro', 'As senhas não coincidem');
            return;
        }

        setLoading(true);
        try {
            const response = await axios.post('http://10.68.153.112:4000/users-mobile/register', {
                name: formData.name,
                email: formData.email,
                password: formData.password,
            });

            if (response.status === 201) {
                Alert.alert('Sucesso', 'Registro feito com sucesso!', [
                    {
                        text: 'Voltar para login',
                        onPress: handleBackToLogin,
                    },
                ]);
            }
        } catch (error) {
            console.error('Erro ao registrar:', error);
            Alert.alert('Erro', 'Ocorreu um erro ao registrar. Tente novamente.');
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

                        <View style={styles.passwordContainer}>
                            <TextInput
                                style={[
                                    styles.input,
                                    { borderColor: focusedInput === 'password' ? '#2196F3' : '#FFF' }
                                ]}
                                placeholder="Digite sua senha"
                                placeholderTextColor="#555555"
                                secureTextEntry={!showPassword}
                                autoCapitalize="none"
                                value={formData.password}
                                onChangeText={(text) => setFormData(prev => ({ ...prev, password: text }))}
                                onFocus={() => setFocusedInput('password')}
                                onBlur={() => setFocusedInput(null)}
                            />
                            <TouchableOpacity
                                style={styles.eyeButton}
                                onPress={() => setShowPassword(!showPassword)}
                            >
                                <Icon name={showPassword ? 'visibility-off' : 'visibility'} size={24} color="#FFF" />
                            </TouchableOpacity>
                        </View>

                        <View style={styles.passwordContainer}>
                            <TextInput
                                style={[
                                    styles.input,
                                    { borderColor: focusedInput === 'confirmPassword' ? '#2196F3' : '#FFF' }
                                ]}
                                placeholder="Confirme sua senha"
                                placeholderTextColor="#555555"
                                secureTextEntry={!showConfirmPassword}
                                autoCapitalize="none"
                                value={formData.confirmPassword}
                                onChangeText={(text) => setFormData(prev => ({ ...prev, confirmPassword: text }))}
                                onFocus={() => setFocusedInput('confirmPassword')}
                                onBlur={() => setFocusedInput(null)}
                            />
                            <TouchableOpacity
                                style={styles.eyeButton}
                                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                            >
                                <Icon name={showConfirmPassword ? 'visibility-off' : 'visibility'} size={24} color="#FFF" />
                            </TouchableOpacity>
                        </View>
                        

                        <TouchableOpacity style={styles.registerButton}
                        onPress={handleRegister}
                        >
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
    passwordContainer: {
        position: 'relative',
        width: '100%',
    },
    eyeButton: {
        position: 'absolute',
        right: 10,
        top: 15,
        zIndex: 1,
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