import React from "react";
import { Button, Alert, View } from "react-native";
import axios from "axios";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function LogoutButton() {
  const router = useRouter();

  const logout = async () => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      const mobileToken = await AsyncStorage.getItem("mobileToken");

      if (!token || !mobileToken) {
        Alert.alert("Error", "No authentication or mobile token found.");
        return;
      }

      const response = await axios.post(
        `https://admin-baboon2.bhr.sa/api/Users/logout?mobileToken=${mobileToken}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        await AsyncStorage.removeItem("userToken");
        await AsyncStorage.removeItem("mobileToken");

        Alert.alert("Success", "Logout successful!");
        router.replace("/(Login)");
      } else {
        Alert.alert("Error", "Logout failed. Please try again.");
      }
    } catch (error) {
      console.error("Logout Error:", error);
      Alert.alert("Error", "Logout failed. Please try againnnnnn.");
    }
  };

  return (
    <SafeAreaView>
      <View style={{ padding: 10 }}>
        <Button title="Logout" onPress={logout} />
      </View>
    </SafeAreaView>
  );
}
