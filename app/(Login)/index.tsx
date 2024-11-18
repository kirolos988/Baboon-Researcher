import { View, TouchableOpacity, StyleSheet, Alert, Image } from "react-native";
import React, { useState } from "react";
import ThemedTextInput from "@/components/ThemedTextInput";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Device from "expo-device";
import Entypo from "@expo/vector-icons/Entypo";
import { jwtDecode } from "jwt-decode";

const index = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState(false);
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
        { email, password }
      );
      if (response.status === 200) {
        const { token, refreshToken } = response.data;
        if (token && refreshToken) {
          await AsyncStorage.setItem("userToken", token);
          await AsyncStorage.setItem("mobileToken", mobileToken);
          await AsyncStorage.setItem("refreshToken", refreshToken);
        }
        const decoded = jwtDecode(token);
        const userId = decoded.sub;
        await AsyncStorage.setItem("userId", userId!);
        router.replace("/(tabs)/home");
      } else {
        setErr(true);
      }
    } catch (error) {
      console.error("Login Error:", error);
      setErr(true);
    }
  };

  return (
    <SafeAreaView>
      <ThemedView style={{ flexDirection: "row", height: "100%" }}>
        <Image
          source={require("../../assets/images/Login/login.png")}
          style={{ width: "50%", height: "100%" }}
        />
        <View style={styles.container}>
          <View
            style={{
              width: "90%",
            }}
          >
            <Image
              source={require("../../assets/images/Login/Logo.png")}
              resizeMode="contain"
              style={{ alignSelf: "center" }}
            />
            <ThemedText style={styles.login} type="defaultSemiBold">
              Login
            </ThemedText>
            <ThemedText style={styles.title} type="subtitle">
              Ranger App
            </ThemedText>
            <ThemedTextInput
              placeholder="Email"
              value={email}
              onChangeText={(value) => setEmail(value)}
              icon={<Entypo name="mail" size={24} />}
            />
            {err === true && (
              <ThemedText style={styles.err}>Email is invalid</ThemedText>
            )}
            <ThemedTextInput
              placeholder="Password"
              value={password}
              onChangeText={(value) => setPassword(value)}
              icon={<Entypo name="lock-open" size={20} />}
              secure={true}
              passwordIcon1={<Entypo name="eye" size={24} />}
              passwordIcon2={<Entypo name="eye-with-line" size={24} />}
            />
            {err === true && (
              <ThemedText style={styles.err}>Password is invalid</ThemedText>
            )}
            <TouchableOpacity>
              <ThemedText style={styles.forgetPassword}>
                Forgot Password?
              </ThemedText>
            </TouchableOpacity>
            <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
              <ThemedText style={{ textAlign: "center" }}>Login</ThemedText>
            </TouchableOpacity>
          </View>
        </View>
      </ThemedView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "50%",
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
    fontSize: 10,
    textDecorationLine: "underline",
    textAlign: "right",
    color: "#B65535",
  },
  err: {
    color: "red",
    fontSize: 12,
  },
  loginBtn: {
    backgroundColor: "#B65535",
    borderRadius: 100,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 20,
  },
});

export default index;
