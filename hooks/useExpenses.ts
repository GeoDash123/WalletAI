import { useEffect, useState } from "react";
import { ExpenseRecord } from "../types/Expense";
import { getExpenses } from "../services/expenseService";

export function useExpenses() {

    const [expenses, setExpenses] = useState<ExpenseRecord[]>([]);
    const [loading, setLoading] = useState(true);

    async function loadExpenses() {

        try {

            const data = await getExpenses();

            setExpenses(data);

        } catch (error) {

            console.log(error);

        } finally {

            setLoading(false);

        }

    }

    useEffect(() => {

        loadExpenses();

    }, []);

    return {
        expenses,
        loading,
        reload: loadExpenses
    };

}