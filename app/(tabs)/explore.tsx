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
  const [sortBy, setSortBy] = useState("Más recientes");

  const SORT_OPTIONS = [
    "Más recientes",
    "Más antiguos",
    "Mayor monto",
    "Menor monto",
  ];

  const filteredExpenses = useMemo(() => {
    let result = expenses.filter((expense) => {
      const matchesSearch = expense.description
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesCategory =
        category === "Todas" || expense.category === category;

      return matchesSearch && matchesCategory;
    });

    switch (sortBy) {
      case "Más antiguos":
        result.sort(
          (a, b) =>
            new Date(a.created_at).getTime() -
            new Date(b.created_at).getTime()
        );
        break;

      case "Mayor monto":
        result.sort((a, b) => Number(b.amount) - Number(a.amount));
        break;

      case "Menor monto":
        result.sort((a, b) => Number(a.amount) - Number(b.amount));
        break;

      default:
        // Más recientes
        result.sort(
          (a, b) =>
            new Date(b.created_at).getTime() -
            new Date(a.created_at).getTime()
        );
        break;
    }

    return result;
  }, [expenses, search, category, sortBy]);

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

      <Select
        value={sortBy}
        items={SORT_OPTIONS}
        onChange={setSortBy}
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