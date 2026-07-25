import { CategoryIconName, CategoryIcons } from "@/constants/categoryIcons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";

import Card from "@/components/ui/Card";
import { Colors } from "@/constants/colors";
import { Expense } from "@/types/Expense";
import { formatCurrency } from "@/utils/currency";

type Props = {
  expense: Expense;
  onPress?: () => void;
};

export default function ExpenseItem({ expense, onPress }: Props) {
  const date = expense.created_at
    ? new Date(expense.created_at).toLocaleDateString("es-MX")
    : "";

  const icon: CategoryIconName =
    CategoryIcons[expense.category as keyof typeof CategoryIcons] ?? "cash";

  return (
    <Pressable onPress={onPress}>
      <Card>
        <View style={styles.row}>
          <View style={styles.left}>
            <View style={styles.iconContainer}>
              <MaterialCommunityIcons
                name={icon}
                size={24}
                color={Colors.primary}
              />
            </View>

            <View>
              <Text style={styles.category}>{expense.category}</Text>

              <Text style={styles.description}>{expense.description}</Text>

              <Text style={styles.date}>{date}</Text>
            </View>
          </View>

          <Text style={styles.amount}>
            {formatCurrency(Number(expense.amount))}
          </Text>
        </View>
      </Card>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  left: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },

  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#EFF6FF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },

  category: {
    fontSize: 17,
    fontWeight: "600",
    color: Colors.text,
  },

  description: {
    marginTop: 2,
    color: Colors.secondaryText,
  },

  date: {
    marginTop: 4,
    fontSize: 12,
    color: Colors.placeholder,
  },

  amount: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.success,
  },
});
