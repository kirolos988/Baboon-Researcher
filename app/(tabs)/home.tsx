import React, { useEffect, useState } from "react";
import { Button, Alert, View, Text } from "react-native";
import axios from "axios";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { User } from "@/utils/Types";

export default function home() {
  const [user, setUser] = useState<User>();
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = await AsyncStorage.getItem("userToken");
        if (!token) {
          console.error("User token not found");
          return;
        }
        const response = await axios.get(
          "https://admin-baboon2.bhr.sa/api/Users/me",
          {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status === 200) {
          setUser(response.data);
        } else {
          console.error("Failed to fetch user data:", response.status);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

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
        router.replace("/(login)");
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
        <Text>hello {user?.firstname}</Text>
        <Button title="Logout" onPress={logout} />
      </View>
    </SafeAreaView>
  );
}
