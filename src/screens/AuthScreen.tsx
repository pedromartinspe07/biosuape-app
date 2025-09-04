// src/screens/AuthScreen.tsx

import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as Yup from 'yup';
import Card from '../components/common/Card';
import InputField from '../components/common/InputField';
import Messages from '../components/common/Messages';
import { Colors } from '../constants/colors';
import { Strings } from '../constants/strings';
import { login, register } from '../services/authService';
import { IAuthFormInput, IMessage } from '../types/common';
import { RootStackParamList } from '../types/navigation';

type AuthScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Auth'>;

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
    const [message, setMessage] = useState<IMessage | null>(null);
    const navigation = useNavigation<AuthScreenNavigationProp>();

    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => {
                setMessage(null);
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [message]);

    const handleLogin = async (values: IAuthFormInput, { setSubmitting }: any) => {
        setSubmitting(true);
        try {
            await login(values.email, values.password);
            setMessage({ text: 'Login realizado com sucesso!', type: 'success' });
            navigation.replace('AppStack' as any);
        } catch (error: any) {
            setMessage({ text: error.message || 'Falha no login. Verifique suas credenciais.', type: 'error' });
        } finally {
            setSubmitting(false);
        }
    };

    const handleRegister = async (values: IAuthFormInput, { setSubmitting }: any) => {
        setSubmitting(true);
        try {
            if (values.username) {
                await register(values.username, values.email, values.password);
                setMessage({ text: 'Cadastro realizado com sucesso! Faça login para continuar.', type: 'success' });
                setIsLogin(true);
            }
        } catch (error: any) {
            setMessage({ text: error.message || 'Falha no cadastro. Tente novamente.', type: 'error' });
        } finally {
            setSubmitting(false);
        }
    };

    const toggleAuthMode = () => {
        setIsLogin(!isLogin);
        setMessage(null);
    };

    const initialValues = isLogin ? { email: '', password: '' } : { username: '', email: '', password: '' };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{isLogin ? Strings.auth.loginTitle : Strings.auth.registerTitle}</Text>
            {message && <Messages text={message.text} type={message.type} />}
            <Formik
                initialValues={initialValues}
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
                                error={touched.username ? errors.username : undefined}
                            />
                        )}
                        <InputField
                            label={Strings.auth.emailLabel}
                            placeholder={Strings.auth.emailPlaceholder}
                            value={values.email}
                            onChangeText={handleChange('email')}
                            onBlur={handleBlur('email')}
                            error={touched.email ? errors.email : undefined}
                            keyboardType="email-address"
                        />
                        <InputField
                            label={Strings.auth.passwordLabel}
                            placeholder={Strings.auth.passwordPlaceholder}
                            value={values.password}
                            onChangeText={handleChange('password')}
                            onBlur={handleBlur('password')}
                            error={touched.password ? errors.password : undefined}
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