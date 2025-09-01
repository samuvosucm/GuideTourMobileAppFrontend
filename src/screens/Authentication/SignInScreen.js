import { CurrentRenderContext } from '@react-navigation/native'
import React, { useState } from 'react'
import { SafeAreaView, StyleSheet, View, Text, TextInput, TouchableOpacity} from 'react-native'

export default function SignInScreen({ navigation }) {
    const [form, setForm] = useState ({
        email: '',
        password: ''
    })
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
    }
})