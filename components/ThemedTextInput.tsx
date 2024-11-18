import {
  TextInput,
  type TextProps,
  StyleSheet,
  View,
  useColorScheme,
  TouchableOpacity,
} from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";
import React, { useState } from "react";

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  value?: string;
  placeholder?: string;
  secure?: boolean;
  onChangeText?: (text: string) => void;
  icon?: JSX.Element;
  passwordIcon1?: JSX.Element;
  passwordIcon2?: JSX.Element;
};

function ThemedTextInput({
  style,
  lightColor,
  darkColor,
  value,
  placeholder,
  secure,
  onChangeText,
  icon,
  passwordIcon1,
  passwordIcon2,
}: ThemedTextProps) {
  const Bordercolor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "textInputBorder"
  );
  const colorScheme = useColorScheme();
  const iconColor = colorScheme === "dark" ? "white" : "black";
  const [show, setShow] = useState(secure ?? false);

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        borderColor: Bordercolor,
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 5,
        marginVertical: 10,
      }}
    >
      {icon && React.cloneElement(icon, { color: iconColor })}
      <TextInput
        secureTextEntry={show}
        placeholder={placeholder}
        placeholderTextColor={"#444444"}
        value={value}
        onChangeText={onChangeText}
        style={[styles.input, { color: Bordercolor }, style]}
        numberOfLines={1}
      />
      <TouchableOpacity onPress={() => setShow(!show)}>
        {show === true
          ? passwordIcon1 &&
            React.cloneElement(passwordIcon1, { color: iconColor })
          : passwordIcon2 &&
            React.cloneElement(passwordIcon2, { color: iconColor })}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    flex: 1,
    paddingLeft: 5,
  },
});
export default ThemedTextInput;
