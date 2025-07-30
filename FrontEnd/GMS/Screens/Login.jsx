import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Button, TextInput, Text } from 'react-native-paper';
import axios from 'axios'; 
//change url
const API_URL = 'http://<url>:3000';

function SigninScreen(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = () => {
        if (!email || !password) {
            Alert.alert("Validation Error", "Please enter both email and password.");
            return;
        }

        const credentials = {
            email: email,
            password: password
        };
        axios.post(`${API_URL}/user/signin`, credentials)
            .then(response => {
                if (response.data.success) {
                    Alert.alert("Success", "You have logged in.");
                } else {
                    Alert.alert("Login Failed", response.data.message);
                }
            })
            .catch(error => {
                console.error("Login error:", error);
                Alert.alert("An Error Occurred", "Invalid credentials or server error. Please try again.");
            });
    };

    const goToSignup = () => {
        props.navigation.navigate('Signup');
    };

    return (
        <View style={styles.container}>
            <Text variant="headlineLarge" style={styles.title}>
                GMS Login
            </Text>

            <TextInput
                label="Email"
                value={email}
                onChangeText={text => setEmail(text)}
                style={styles.input}
                keyboardType="email-address"
                autoCapitalize="none"
            />

            <TextInput
                label="Password"
                value={password}
                onChangeText={text => setPassword(text)}
                secureTextEntry={true}
                style={styles.input}
            />

            <Button mode="contained" onPress={handleLogin} style={styles.button}>
                Login
            </Button>

            <Button onPress={goToSignup} style={styles.button}>
                New User? Register Here
            </Button>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    },
    title: {
        textAlign: 'center',
        marginBottom: 20,
    },
    input: {
        marginBottom: 10,
    },
    button: {
        marginTop: 10,
    }
});

export default SigninScreen;