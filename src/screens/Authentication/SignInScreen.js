import React, { useContext, useState } from 'react'
import { SafeAreaView, StyleSheet, View, Text, TextInput, TouchableOpacity, Alert} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import UserDTO from '../../dto/UserDTO'
import { AuthContext } from '../../contexts/AuthContext' 

export default function SignInScreen({ navigation }) {
    const { login } = useContext(AuthContext);
    const [form, setForm] = useState ({
        email: '',
        password: ''
    })

    const [showPassword, setShowPassword] = useState(false)

    const handleSignIn = async () => {
        try {
            const userData = new UserDTO({ email: form.email, password: form.password });
            const user = await login(userData);  
           
            if (user?.jwtToken) {
                navigation.replace('TouristScreen');        
            }

        } catch (error) {
            Alert.alert("Error", error.message);
        }  
    }

    return(
        <SafeAreaView style={{flex: 1, backgroundColor: '#dce3f0ff'}}>
            <View style={styles.container}>

                <View style={styles.header}>
                    <Text style={styles.title}>Sign in</Text>
                </View>
                <View style={styles.form}>
                    <Text style={styles.inputLabel}>Email</Text>
                    <TextInput 
                        style={styles.inputControl}
                        value={form.email}
                        onChangeText={email => setForm({...form, email})}
                    >
                    </TextInput>
                    <Text style={styles.inputLabel}>Password</Text>
                    <View style={styles.containerPasswordInput}>
                        <TextInput 
                            secureTextEntry={!showPassword}
                            style={styles.inputControlPassword}
                            value={form.password}
                            onChangeText={password => setForm({...form, password})}
                        ></TextInput>
                        <TouchableOpacity
                            onPress={() => setShowPassword(prev => !prev)}>
                            <Ionicons 
                                style={styles.buttonEye}
                                name={showPassword ? "eye" : "eye-off"}
                                size={24}/>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                        style={styles.formFooterButton}
                        onPress={() => {
                            navigation.navigate('ForgotPasswordScreen')
                        }}>
                        <Text style={styles.formForgotPassword}>Forgot Password?</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        handleSignIn()
                    }}>
                    <Text style={styles.buttonText}>Sign in</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.formFooterButton}
                    onPress={() => {
                        navigation.navigate('SignUpScreen')
                    }}>
                        <Text style={styles.formFooter}>Don't have an account?{' '}
                            <Text style={{textDecorationLine: 'underline'}}>Sign up</Text>
                        </Text>
                </TouchableOpacity>
                
        
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 30,
        flex: 1,
        justifyContent: 'center'
    },
    header: {
        marginVertical: 40
    },
    title: {
        fontSize: 27,
        fontWeight: '700',
        textAlign: 'center'
    },
    form: {

    },
    inputLabel: {
        fontSize: 17,
        fontWeight: '500',
        marginBottom: 7
    },
    inputControl: {
        backgroundColor: '#ffffffff',
        borderRadius: 8,
        marginBottom: 15
    },
    inputControlPassword: {
        backgroundColor: '#ffffffff',
        borderRadius: 8,
        flex: 1
    },
    button: {
        backgroundColor: '#b05454ff',
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 20,
        justifyContent: 'center',
        marginVertical: 30
       },
    buttonText: {
        justifyContent: 'center',
        textAlign: 'center',
        fontSize: 18,
        color: '#fff',
        fontWeight: '600'
    },
    formFooterButton: {
        marginTop: 20,
    },
    formFooter: {
        fontWeight: '600',
        textAlign: 'center'    
    },
    formForgotPassword: {
        fontWeight: '600',
        textAlign: 'right',
        textDecorationLine: 'underline'
    },
    buttonEye: {
        right: 10,
        
    },
    containerPasswordInput: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        borderRadius: 8,
        paddingHorizontal: 10,
    }
})