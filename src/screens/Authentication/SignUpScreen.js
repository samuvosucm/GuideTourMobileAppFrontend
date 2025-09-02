import { CurrentRenderContext } from '@react-navigation/native'
import SegmentedControl from "@react-native-segmented-control/segmented-control";
import React, { useState } from 'react'
import { SafeAreaView, StyleSheet, View, Text, TextInput, TouchableOpacity} from 'react-native'
import { signUp } from "../../services/dataService";

export default function LoginScreen({ navigation }) {
    const [form, setForm] = useState ({
        username: '',
        email: '',
        password: ''
    })

    const handleSignUp = async () => {
        try {
            const userData = { username: form.username, email: form.email, password: form.password };
            const newUser = await signUp(userData); 
        } catch (error) {
            Alert.alert("Error", error.message);
        }
    }

    const [selectedIndex, setSelectedIndex] = useState(0);
    return(
        <SafeAreaView style={{flex: 1, backgroundColor: '#dce3f0ff'}}>
            <View style={styles.container}>

                <View style={styles.header}>
                    <Text style={styles.title}>Create an account</Text>
                    <Text style={styles.subtitle}>Sign up as a</Text>
                    <SegmentedControl 
                    values={["Traveler", "Guide"]}
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
                        onChangeText={username => setForm({...form, username})}
                    >
                    </TextInput>
                    <Text style={styles.inputLabel}>Email</Text>
                    <TextInput 
                        style={styles.inputControl}
                        value={form.email}
                        onChangeText={email => setForm({...form, email})}
                    >
                    </TextInput>
                    <Text style={styles.inputLabel}>Password</Text>
                    <TextInput 
                        secureTextEntry
                        style={styles.inputControl}
                        value={form.password}
                        onChangeText={password => setForm({...form, password})}
                    ></TextInput>
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
    subtitle: {
        textAlign: 'center',
        marginBottom: 6,
        opacity: 0.5,
        fontWeight: '500'
    }
})