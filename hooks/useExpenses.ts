import { useState, useCallback } from "react";
import { ExpenseRecord } from "../types/Expense";
import { getExpenses } from "../services/expenseService";
import { useFocusEffect } from "expo-router";

export function useExpenses() {

    const [expenses, setExpenses] = useState<ExpenseRecord[]>([]);
    const [loading, setLoading] = useState(true);

    async function loadExpenses() {

        setLoading(true);

        try {

            const data = await getExpenses();

            if (Array.isArray(data)) {
                setExpenses(data);
            } else {
                console.error(
                    "La API no devolvió un arreglo de gastos:",
                    data
                );

                setExpenses([]);
            }

        } catch (error) {

            console.error("Error al cargar gastos:", error);

            setExpenses([]);

        } finally {

            setLoading(false);

        }

    }

    useFocusEffect(
        useCallback(() => {
            loadExpenses();
        }, [])
    );

    return {
        expenses,
        loading,
        reload: loadExpenses
    };
}