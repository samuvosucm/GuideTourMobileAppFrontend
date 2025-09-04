import { Ionicons } from '@expo/vector-icons'
import React, { useState } from 'react'
import { SafeAreaView, TouchableOpacity, View, Text, StyleSheet, TextInput } from 'react-native'

export default function ForgotPasswordScreen({ navigation }) {

    const [email, setEmail] = useState('')

    const handlePasswordRecovery = async () => {
            try {
            } catch (error) {
                Alert.alert("Error", error.message);
            }
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#dce3f0ff" }}>
            <View style={styles.container}>
                <TouchableOpacity style={{marginTop:22}} onPress={() => navigation.goBack()}>
                <Ionicons name={"arrow-back"} size={24} />
                </TouchableOpacity>

                <View style={styles.content}>
                <Text style={styles.title}>Forgot your password?</Text>
                <Text style={styles.subtitle}>
                    Enter your email to receive a reset link.
                </Text>

                <TextInput
                    style={styles.input}
                    placeholder="Enter your email"
                    placeholderTextColor="#888"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    value={email}
                    onChangeText={setEmail}
                />

                <TouchableOpacity
                    style={styles.button}
                    onPress={handlePasswordRecovery}
                >
                    <Text style={styles.buttonText}>Send Reset Link</Text>
                </TouchableOpacity>
                </View>
            </View>
            </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 30,
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: "#555",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 12,
    marginBottom: 20,
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: "#b05454ff",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
})