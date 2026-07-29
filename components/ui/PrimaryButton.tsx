import { Colors } from "@/constants/colors";
import { Pressable, StyleProp, StyleSheet, Text, ViewStyle } from "react-native";

type Props = {
  title: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
};

export default function PrimaryButton({ title, onPress, style }: Props) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        style,
        pressed && styles.pressed,
      ]}
      onPress={onPress}
    >
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.primary,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
  },

  pressed: {
    opacity: 0.8,
  },

  text: {
    color: Colors.surface,
    fontWeight: "bold",
    fontSize: 16,
  },
});