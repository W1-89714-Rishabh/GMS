import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { Button, TextInput, Text } from 'react-native-paper';
import axios from 'axios';
//yaha url dalna
const API_URL = 'http://<url >:3000';

function SignupScreen(props) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [height, setHeight] = useState("");
    const [weight, setWeight] = useState("");
    const [allergies, setAllergies] = useState("");
    const [disability, setDisability] = useState("");

    const handleSignup = () => {
        if (!name || !email || !password || !height || !weight) {
            Alert.alert("Validation Error", "Please fill all required fields: Name, Email, Password, Height, and Weight.");
            return;
        }

        const userData = {
            name: name,
            email: email,
            password: password,
            height: parseFloat(height), 
            weight: parseFloat(weight),
            allergies: allergies,
            disability: disability
        };


        axios.post(`${API_URL}/user/signup`, userData)
            .then(response => {
                if (response.data.success) {
                    Alert.alert("Success", "Account created successfully! Please log in.");
                    props.navigation.navigate('Signin');
                } else {
                    Alert.alert("Signup Failed", response.data.message);
                }
            })
            .catch(error => {
                console.error("Signup error:", error);
                Alert.alert("An Error Occurred", "Could not connect to the server. Please try again later.");
            });
    };

    const goToSignin = () => {
        props.navigation.navigate('Signin');
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text variant="headlineLarge" style={styles.title}>
                Create an Account
            </Text>

            <TextInput label="Name" value={name} onChangeText={text => setName(text)} style={styles.input} />
            <TextInput label="Email" value={email} onChangeText={text => setEmail(text)} style={styles.input} keyboardType="email-address" autoCapitalize="none" />
            <TextInput label="Password" value={password} onChangeText={text => setPassword(text)} secureTextEntry={true} style={styles.input} />
            <TextInput label="Height (in meters, e.g., 1.75)" value={height} onChangeText={text => setHeight(text)} style={styles.input} keyboardType="numeric" />
            <TextInput label="Weight (in kg)" value={weight} onChangeText={text => setWeight(text)} style={styles.input} keyboardType="numeric" />
            <TextInput label="Allergies (optional)" value={allergies} onChangeText={text => setAllergies(text)} style={styles.input} />
            <TextInput label="Disability (optional)" value={disability} onChangeText={text => setDisability(text)} style={styles.input} />

            <Button mode="contained" onPress={handleSignup} style={styles.button}>
                Sign Up
            </Button>

            <Button onPress={goToSignin} style={styles.button}>
                Already have an account? Login
            </Button>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
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

export default SignupScreen;