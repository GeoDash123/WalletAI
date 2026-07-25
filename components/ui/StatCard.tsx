import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StyleSheet, Text, ViewStyle } from "react-native";

import { Colors } from "@/constants/colors";
import Card from "./Card";

type Props = {
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  title: string;
  value: string;
  color?: string;
  style?: ViewStyle;
  variant?: "small" | "large";
};

export default function StatCard({
  icon,
  title,
  value,
  color = Colors.primary,
  style,
  variant = "small",
}: Props) {
  return (
    <Card
      style={[
        variant === "large" ? styles.large : styles.small,
        styles.card,
        style,
      ]}
    >
      <MaterialCommunityIcons
        name={icon}
        size={variant === "large" ? 30 : 24}
        color={color}
      />

      <Text style={styles.value}>{value}</Text>

      <Text style={styles.title}>{title}</Text>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    alignItems: "center",
  },

  large: {
    padding: 20,
  },

  small: {
    padding: 16,
  },

  value: {
    marginTop: 12,
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.text,
    textAlign: "center",
  },

  title: {
    marginTop: 4,
    fontSize: 14,
    color: Colors.secondaryText,
    textAlign: "center",
  },
});
