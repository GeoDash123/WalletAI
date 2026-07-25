import { ActivityIndicator, FlatList, StyleSheet, View } from "react-native";

import ExpenseItem from "@/components/expenses/ExpenseItem";
import { useExpenses } from "../../hooks/useExpenses";

export default function HistoryScreen() {
  const { expenses, loading } = useExpenses();

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <FlatList
      data={expenses}
      keyExtractor={(item) => item.id!.toString()}
      renderItem={({ item }) => <ExpenseItem expense={item} />}
      contentContainerStyle={styles.container}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },

  loading: {
    flex: 1,

    justifyContent: "center",

    alignItems: "center",
  },
});
