import { useState } from "react";
import {
    View,
    Text,
    TextInput,
    Button,
    Alert,
    StyleSheet,
} from "react-native";

import { createExpense } from "@/services/expenseService";

export default function HomeScreen() {

    const [amount, setAmount] = useState("");
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");

    async function handleSave() {

        if (!amount || Number(amount) <= 0) {
            Alert.alert("Error", "Ingresa un monto válido.");
            return;
        }

        if (!category.trim()) {
            Alert.alert("Error", "Selecciona una categoría.");
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

        <View style={styles.container}>

            <Text style={styles.title}>WalletIA</Text>

            <TextInput
                placeholder="Monto"
                keyboardType="numeric"
                value={amount}
                onChangeText={setAmount}
                style={styles.input}
            />

            <TextInput
                placeholder="Categoría"
                value={category}
                onChangeText={setCategory}
                style={styles.input}
            />

            <TextInput
                placeholder="Descripción"
                value={description}
                onChangeText={setDescription}
                style={styles.input}
            />

            <Button
                title="Guardar gasto"
                onPress={handleSave}
            />

        </View>

    );

}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: "center",
        padding: 20,
    },

    title: {
        fontSize: 28,
        fontWeight: "bold",
        marginBottom: 30,
    },

    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        padding: 12,
        marginBottom: 15,
        borderRadius: 8,
    },

});