import SegmentedControl from "@react-native-segmented-control/segmented-control";
import React, { useState } from 'react'
import { SafeAreaView, StyleSheet, View, Text, TextInput, TouchableOpacity, Alert } from 'react-native'
import { signUp } from "../../services/dataService";
import { Ionicons } from '@expo/vector-icons'
import { isValidEmail, isValidPassword } from "../../utils/inputValidators";

export default function SignUpScreen({ navigation }) {
    const [form, setForm] = useState ({
        username: '',
        email: '',
        password: ''
    })

    const [showPassword, setShowPassword] = useState(false)

    const handleSignUp = async () => {

        try {
            const userData = { role: selectedRole, username: form.username, email: form.email, password: form.password };
            const newUser = await signUp(userData); 

            if (user?.jwtToken) {
                navigation.navigate('TouristScreen')
            }

        } catch (error) {
            Alert.alert("Error", error.message);
        }
    }

    const [selectedIndex, setSelectedIndex] = useState(0);

    const roles = ["Tourist", "Guide"]
    const roleValues = ["tourist", "guide"]
    const selectedRole = roleValues[selectedIndex]
    
    return(
        <SafeAreaView style={{flex: 1, backgroundColor: '#dce3f0ff'}}>
            <View style={styles.container}>

                <View style={styles.header}>
                    <Text style={styles.title}>Create an account</Text>
                    <Text style={styles.subtitle}>Sign up as a</Text>
                    <SegmentedControl 
                    values={roles}
                    selectedIndex={selectedIndex}
                    onValueChange={(value) => {
                        setSelectedIndex(value === "Traveler" ? 0 : 1);
                        
                    }
                    }
                
                />
                </View>
                    <View style={styles.form}>
                    <Text style={styles.inputLabel}>Username</Text>
                    <TextInput 
                        style={styles.inputControl}
                        value={form.username}
                        onChangeText={username => setForm(prev => ({ ...prev, username }))}
                    >
                    </TextInput>
                    <Text style={styles.inputLabel}>Email</Text>
                    <TextInput 
                        style={styles.inputControl}
                        value={form.email}
                        onChangeText={email => setForm(prev => ({ ...prev, email }))}
                    >
                    </TextInput>
                    <Text style={styles.inputLabel}>Password</Text>
                    <View style={styles.containerPasswordInput}>
                        <TextInput 
                            secureTextEntry={!showPassword}
                            style={styles.inputControlPassword}
                            value={form.password}
                            onChangeText={password => setForm(prev => ({ ...prev, password   }))}
                        ></TextInput>
                        <TouchableOpacity
                            onPress={() => setShowPassword(prev => !prev)}>
                            <Ionicons 
                                style={styles.buttonEye}
                                name={showPassword ? "eye" : "eye-off"}
                                size={24}/>
                        </TouchableOpacity>
                    </View>
                </View>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        handleSignUp()
                    }}>
                    <Text style={styles.buttonText}>Sign up</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.formFooterButton}
                    onPress={() => {
                        navigation.navigate('SignInScreen')
                    }}>
                    <Text style={styles.formFooter}>Already have an account?{' '}
                        <Text style={{textDecorationLine: 'underline'}}>Sign in</Text>
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
        marginVertical: 40,
    },
    title: {
        fontSize: 27,
        fontWeight: '700',
        textAlign: 'center',
        marginBottom: 15
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
        textAlign: 'right'
    },
    subtitle: {
        textAlign: 'center',
        marginBottom: 6,
        opacity: 0.5,
        fontWeight: '500'
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
    },
    inputControlPassword: {
        backgroundColor: '#ffffffff',
        borderRadius: 8,
        flex: 1
    },
})