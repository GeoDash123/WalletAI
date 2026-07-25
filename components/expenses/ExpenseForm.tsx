import Card from "@/components/ui/Card";
import { CATEGORIES } from "@/constants/categories";
import { Colors } from "@/constants/colors";
import { useState } from "react";
import { Alert, StyleSheet, Text } from "react-native";

import PrimaryButton from "@/components/ui/PrimaryButton";
import { createExpense } from "@/services/expenseService";
import Input from "../ui/Input";
import Select from "../ui/Select";

export default function ExpenseForm() {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [description, setDescription] = useState("");

  async function handleSave() {
    if (category === "Selecciona una categoría") {
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

    try {
      const result = await createExpense({
        amount: Number(amount),
        category,
        description,
      });

      Alert.alert("Respuesta", JSON.stringify(result));
    } catch (error) {
      Alert.alert("Error", "No fue posible conectar con el servidor.");
    }
  }

  return (
    <Card>
      <Text style={styles.title}>Registrar gasto</Text>

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

      <PrimaryButton title="Guardar gasto" onPress={handleSave} />
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
  },

  input: {
    borderWidth: 1,
    borderColor: Colors.border,
    padding: 12,
    marginBottom: 15,
    borderRadius: 8,
  },

  pickerContainer: {
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 8,
    marginBottom: 15,
  },
});
