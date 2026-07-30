import { ActivityIndicator, FlatList, StyleSheet, View } from "react-native";
import { useMemo, useState } from "react";
import ExpenseItem from "@/components/expenses/ExpenseItem";
import { useExpenses } from "../../hooks/useExpenses";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import { CATEGORIES } from "@/constants/categories";

export default function HistoryScreen() {
  const { expenses, loading } = useExpenses();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Todas");

  const filteredExpenses = useMemo(() => {
    return expenses.filter((expense) => {
      const matchesSearch = expense.description
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesCategory =
        category === "Todas" || expense.category === category;

      return matchesSearch && matchesCategory;
    });
  }, [expenses, search, category]);

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Input
        placeholder="Buscar gasto..."
        value={search}
        onChangeText={setSearch}
        style={styles.search}
      />

      <Select
        value={category}
        items={["Todas", ...CATEGORIES.slice(1)]}
        onChange={setCategory}
      />

      <FlatList
        data={filteredExpenses}
        keyExtractor={(item) => item.id!.toString()}
        renderItem={({ item }) => <ExpenseItem expense={item} />}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },

  search: {
    marginBottom: 15,
  },

  list: {
    paddingBottom: 20,
  },

  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});