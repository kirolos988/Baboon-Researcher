import { View, TouchableOpacity, StyleSheet, Alert } from "react-native";
import React, { useState } from "react";
import ThemedTextInput from "@/components/ThemedTextInput";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Device from "expo-device";

const index = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailErr, setEmailErr] = useState(1);
  const [passwordErr, setPasswordErr] = useState(1);
  const router = useRouter();

  const handleLogin = async () => {
    try {
      if (!Device.isDevice) {
        Alert.alert("Error", "Must use a physical device.");
        return;
      }

      const mobileToken = Device.osBuildId || Device.modelName || "unknown";

      const response = await axios.post(
        "https://admin-baboon2.bhr.sa/api/Users/login",
        {
          email,
          password,
        }
      );

      if (response.status === 200) {
        const { token, refreshToken } = response.data;

        if (token) {
          await AsyncStorage.setItem("userToken", token);
          await AsyncStorage.setItem("mobileToken", mobileToken);
        }

        if (refreshToken) {
          await AsyncStorage.setItem("refreshToken", refreshToken);
        }

        Alert.alert("Success", "Login successful!");
        router.replace("/(Home)");
      } else {
        Alert.alert("Error", "Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.error("Login Error:", error);
      Alert.alert("Error", "Login failed. Please try again.");
    }
  };

  return (
    <SafeAreaView>
      <ThemedView style={{ flexDirection: "row", height: "100%" }}>
        <View style={{ backgroundColor: "red", width: "35%" }}></View>
        <View style={styles.container}>
          <View style={{ width: "90%" }}>
            <ThemedText style={styles.title} type="subtitle">
              Researcher App
            </ThemedText>
            <ThemedText style={styles.login} type="defaultSemiBold">
              Login
            </ThemedText>
            <ThemedTextInput
              placeholder="Email"
              value={email}
              onChangeText={(value) => setEmail(value)}
            />
            {/* {emailErr === 0 && (
              <ThemedText style={styles.err}>Email is invalid</ThemedText>
            )} */}
            <ThemedTextInput
              placeholder="Password"
              value={password}
              onChangeText={(value) => setPassword(value)}
              secure={true}
            />
            {/* {passwordErr === 0 && (
              <ThemedText style={styles.err}>Password is invalid</ThemedText>
            )} */}
            <TouchableOpacity>
              <ThemedText style={styles.forgetPassword}>
                Forgot Password?
              </ThemedText>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleLogin}>
              <ThemedText>Login</ThemedText>
            </TouchableOpacity>
          </View>
        </View>
      </ThemedView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "65%",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    textAlign: "center",
    marginVertical: 20,
    fontWeight: "bold",
  },
  login: {
    textAlign: "center",
    marginVertical: 20,
    fontWeight: "bold",
  },
  forgetPassword: {
    fontSize: 12,
    textDecorationLine: "underline",
    textAlign: "right",
  },
  err: {
    color: "red",
    fontSize: 12,
  },
});

export default index;
