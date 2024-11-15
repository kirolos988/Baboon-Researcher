import { TextInput, type TextProps, StyleSheet } from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  value?: string;
  placeholder?: string;
  secure?: boolean;
  onChangeText?: (text: string) => void;
};

function ThemedTextInput({
  style,
  lightColor,
  darkColor,
  value,
  placeholder,
  secure,
  onChangeText,
}: ThemedTextProps) {
  const Bordercolor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "textInputBorder"
  );

  return (
    <TextInput
      secureTextEntry={secure}
      placeholder={placeholder}
      placeholderTextColor={"#444444"}
      value={value}
      onChangeText={onChangeText}
      style={[
        styles.input,
        { borderColor: Bordercolor, color: Bordercolor },
        style,
      ]}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginVertical: 10,
  },
});
export default ThemedTextInput;
