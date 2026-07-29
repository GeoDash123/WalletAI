import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { CategoryIcons } from "@/constants/categoryIcons";
import { Colors } from "@/constants/colors";
import { Expense } from "@/types/Expense";
import { formatCurrency } from "@/utils/currency";

import Card from "@/components/ui/Card";

type Props = {
  expense: Expense;
};

export default function ExpenseItem({ expense }: Props) {
  const router = useRouter();

  const icon =
    CategoryIcons[
      expense.category as keyof typeof CategoryIcons
    ] ?? "cash";

  const date = expense.created_at
    ? new Date(expense.created_at).toLocaleDateString("es-MX")
    : "";

  function handlePress() {
    if (expense.id === undefined) {
      return;
    }

    router.push({
      pathname: "/expense/[id]",
      params: {
        id: expense.id.toString(),
      },
    });
  }

  return (
    <Pressable onPress={handlePress}>
      <Card>
        <View style={styles.container}>
          <View style={styles.left}>
            <View style={styles.iconContainer}>
              <MaterialCommunityIcons
                name={icon as any}
                size={24}
                color={Colors.primary}
              />
            </View>

            <View style={styles.info}>
              <Text style={styles.category}>
                {expense.category}
              </Text>

              <Text style={styles.description}>
                {expense.description}
              </Text>

              <Text style={styles.date}>
                {date}
              </Text>
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
  container: {
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

  info: {
    flex: 1,
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
    marginLeft: 16,
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.success,
  },
});