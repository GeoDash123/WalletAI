import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import PrimaryButton from "@/components/ui/PrimaryButton";
import Select from "@/components/ui/Select";
import { createExpense, updateExpense } from "@/services/expenseService";

import { CATEGORIES } from "@/constants/categories";
import { Colors } from "@/constants/colors";


import { Expense } from "@/types/Expense";

import { useState } from "react";
import { Alert, StyleSheet, Text } from "react-native";

type Props = {
  mode?: "create" | "edit";
  initialValues?: Expense;
  onSuccess?: () => void;
};

export default function ExpenseForm({
  mode = "create",
  initialValues,
  onSuccess,
}: Props) {
  const [amount, setAmount] = useState(
    initialValues ? String(initialValues.amount) : "",
  );

  const [category, setCategory] = useState(
    initialValues?.category ?? CATEGORIES[0],
  );

  const [description, setDescription] = useState(
    initialValues?.description ?? "",
  );

  async function handleSubmit() {
    if (category === CATEGORIES[0]) {
      Alert.alert("Error", "Selecciona una categoría.");
      return;
    }

    if (!amount || Number(amount) <= 0) {
      Alert.alert("Error", "Ingresa un monto válido.");
      return;
    }

    if (!description.trim()) {
      Alert.alert("Error", "Ingresa una descripción.");
      return;
    }

    const expense = {
      amount: Number(amount),
      category,
      description,
    };

    try {
      if (mode === "create") {
        await createExpense(expense);

        Alert.alert("Éxito", "Gasto registrado correctamente.");

        setAmount("");
        setCategory(CATEGORIES[0]);
        setDescription("");
      } else {
        await updateExpense(initialValues!.id!, expense);

        Alert.alert("Éxito", "Gasto actualizado correctamente.");
      }

      onSuccess?.();
    } catch (error) {
      Alert.alert("Error", "No fue posible conectar con el servidor.");
    }
  }

  return (
    <Card>
      <Text style={styles.title}>
        {mode === "create" ? "Registrar gasto" : "Editar gasto"}
      </Text>

      <Input
        placeholder="Monto"
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
        style={styles.input}
      />

      <Text style={styles.label}>Categoría</Text>

      <Select value={category} items={CATEGORIES} onChange={setCategory} />

      <Input
        placeholder="Descripción"
        value={description}
        onChangeText={setDescription}
        style={styles.input}
      />

      <PrimaryButton
        title={mode === "create" ? "Guardar gasto" : "Guardar cambios"}
        onPress={handleSubmit}
      />
    </Card>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 24,
    color: Colors.text,
  },

  label: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 6,
    color: Colors.text,
  },

  input: {
    borderWidth: 1,
    borderColor: Colors.border,
    padding: 12,
    marginBottom: 15,
    borderRadius: 8,
  },
});
