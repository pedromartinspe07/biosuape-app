import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Colors } from '../constants/colors';
import { Strings } from '../constants/strings';
import Card from '../components/common/Card';
import { login, register } from '../services/authService'; // Você precisará criar este serviço
import InputField from '../components/common/InputField'; // Componente de input reutilizável

type AuthScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Auth'>; // 'Auth' é o nome da rota na navigation

type RootStackParamList = {
    Auth: undefined;
    AppStack: undefined;
};

const loginSchema = Yup.object().shape({
    email: Yup.string().email('E-mail inválido').required('E-mail é obrigatório'),
    password: Yup.string().min(6, 'Senha deve ter no mínimo 6 caracteres').required('Senha é obrigatória'),
});

const registerSchema = Yup.object().shape({
    username: Yup.string().required('Nome de usuário é obrigatório'),
    email: Yup.string().email('E-mail inválido').required('E-mail é obrigatório'),
    password: Yup.string().min(6, 'Senha deve ter no mínimo 6 caracteres').required('Senha é obrigatória'),
});

const AuthScreen: React.FC = () => {
    const [isLogin, setIsLogin] = useState(true);
    const navigation = useNavigation<AuthScreenNavigationProp>();

    const handleLogin = async (values: any, { setSubmitting }: any) => {
        try {
            await login(values.email, values.password);
            Alert.alert(Strings.alerts.successTitle, 'Login realizado com sucesso!');
            navigation.replace('AppStack', {} as any);
        } catch (error: any) {
            Alert.alert(Strings.alerts.errorTitle, error.message || 'Falha no login. Verifique suas credenciais.');
        } finally {
            setSubmitting(false);
        }
    };

    const handleRegister = async (values: any, { setSubmitting }: any) => {
        try {
            await register(values.username, values.email, values.password);
            Alert.alert(Strings.alerts.successTitle, 'Cadastro realizado com sucesso! Faça login para continuar.');
            setIsLogin(true); // Redireciona para a tela de login
            navigation.replace('Auth', {} as any);
        } catch (error: any) {
            Alert.alert(Strings.alerts.errorTitle, error.message || 'Falha no cadastro. Tente novamente.');
        } finally {
            setSubmitting(false);
        }
    };

    const toggleAuthMode = () => {
        setIsLogin(!isLogin);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{isLogin ? Strings.auth.loginTitle : Strings.auth.registerTitle}</Text>  
            <Formik
                initialValues={isLogin ? { email: '', password: '' } : { username: '', email: '', password: '' }}
                validationSchema={isLogin ? loginSchema : registerSchema}
                onSubmit={isLogin ? handleLogin : handleRegister}
            >
                {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isSubmitting }) => (
                    <Card containerStyle={styles.cardContainer}>
                        {!isLogin && (
                            <InputField
                                label={Strings.auth.usernameLabel}
                                placeholder={Strings.auth.usernamePlaceholder}
                                value={values.username}
                                onChangeText={handleChange('username')}
                                onBlur={handleBlur('username')}
                                error={touched.username && errors.username}
                            />
                        )}
                        <InputField
                            label={Strings.auth.emailLabel}
                            placeholder={Strings.auth.emailPlaceholder}
                            value={values.email}
                            onChangeText={handleChange('email')}
                            onBlur={handleBlur('email')}
                            error={touched.email && errors.email}
                            keyboardType="email-address"
                        />
                        <InputField
                            label={Strings.auth.passwordLabel}
                            placeholder={Strings.auth.passwordPlaceholder}
                            value={values.password}
                            onChangeText={handleChange('password')}
                            onBlur={handleBlur('password')}
                            error={touched.password && errors.password}
                            secureTextEntry
                        />
                        <TouchableOpacity
                            style={[styles.button, isSubmitting && styles.buttonDisabled]}
                            onPress={isSubmitting ? undefined : () => handleSubmit()}
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? (
                                <ActivityIndicator color={Colors.textLight} />
                            ) : (
                                <Text style={styles.buttonText}>
                                    {isLogin ? Strings.auth.loginButton : Strings.auth.registerButton}
                                </Text>
                            )}
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.toggleButton} onPress={toggleAuthMode}>
                            <Text style={styles.toggleButtonText}>
                                {isLogin ? Strings.auth.noAccount : Strings.auth.hasAccount}
                            </Text>
                        </TouchableOpacity>
                    </Card>
                )}
            </Formik>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: Colors.background,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: Colors.textPrimary,
        marginBottom: 20,
    },
    cardContainer: {
        width: '100%',
        padding: 20,
    },
    button: {
        backgroundColor: Colors.primary,
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 20,
    },
    buttonDisabled: {
        opacity: 0.5,
    },
    buttonText: {
        color: Colors.textLight,
        fontWeight: 'bold',
    },
    toggleButton: {
        marginTop: 20,
    },
    toggleButtonText: {
        color: Colors.primary,
        textAlign: 'center',
    },
});

export default AuthScreen;