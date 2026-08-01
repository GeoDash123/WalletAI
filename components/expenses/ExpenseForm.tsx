import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import PrimaryButton from "@/components/ui/PrimaryButton";
import Select from "@/components/ui/Select";
import { createExpense, updateExpense, deleteExpense } from "@/services/expenseService";
import { CATEGORIES } from "@/constants/categories";
import { Colors } from "@/constants/colors";
import { Expense, ExpenseRecord } from "@/types/Expense";
import { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";

type Props = {
  mode?: "create" | "edit";
  initialValues?: ExpenseRecord;
  onSuccess?: () => void;

  scannedValues?: {
    amount: number;
    description: string;
    category: string;
  } | null;
};

export default function ExpenseForm({
  mode = "create",
  initialValues,
  onSuccess,
  scannedValues,
}: Props) {

  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (!initialValues) return;

    setAmount(String(initialValues.amount));
    setCategory(initialValues.category);
    setDescription(initialValues.description);
  }, [initialValues]);

  useEffect(() => {

    if (!scannedValues) {
      return;
    }

    setAmount(String(scannedValues.amount));
    setDescription(scannedValues.description);
    setCategory(scannedValues.category);

  }, [scannedValues]);

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

    const expense: Expense = {
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

        if (!initialValues) {
          return;
        }

        await updateExpense(initialValues.id, expense);

        Alert.alert("Éxito", "Gasto actualizado correctamente.");
      }

      onSuccess?.();
    } catch (error: any) {
      console.log("STATUS:", error.response?.status);
      console.log("DATA:", error.response?.data);
      console.log("ERROR:", error.message);

      Alert.alert("Error", "No fue posible actualizar el gasto.");
    }
  }

  async function handleDelete() {

    if (!initialValues) {
      return;
    }

    const { id } = initialValues;

    Alert.alert(
      "Eliminar gasto",
      "¿Estás seguro de que deseas eliminar este gasto?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: async () => {
            try {
              await deleteExpense(id);

              Alert.alert("Éxito", "Gasto eliminado correctamente.");

              onSuccess?.();
            } catch (error: any) {
              console.log("STATUS:", error.response?.status);
              console.log("DATA:", error.response?.data);
              console.log("ERROR:", error.message);

              Alert.alert("Error", "No fue posible eliminar el gasto.");
            }
          },
        },
      ]
    );
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

      {mode === "create" ? (
        <PrimaryButton
          title="Guardar gasto"
          onPress={handleSubmit}
        />
      ) : (
        <View style={styles.buttonsContainer}>
          <PrimaryButton
            title="Guardar cambios"
            onPress={handleSubmit}
          />

          <PrimaryButton
            title="Eliminar"
            onPress={handleDelete}
            style={styles.deleteButton}
          />
        </View>
      )}

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

  buttonsContainer: {
    marginTop: 10,
    gap: 10,
  },

  deleteButton: {
    backgroundColor: Colors.danger,
  },

});
