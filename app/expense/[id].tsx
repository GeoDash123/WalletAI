import ExpenseForm from "@/components/expenses/ExpenseForm";
import { getExpense } from "@/services/expenseService";
import { Expense } from "@/types/Expense";

import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";

import {
    ActivityIndicator,
    ScrollView,
    StyleSheet,
} from "react-native";

import { Colors } from "@/constants/colors";

export default function EditExpenseScreen() {

    const { id } = useLocalSearchParams();

    const router = useRouter();

    const [expense, setExpense] = useState<Expense | null>(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        async function loadExpense() {

            try {

                const data = await getExpense(Number(id));

                setExpense(data);

            } finally {

                setLoading(false);

            }

        }

        loadExpense();

    }, [id]);

    if (loading) {
        return <ActivityIndicator />;
    }

    if (!expense) {
        return null;
    }

    return (

        <ScrollView contentContainerStyle={styles.container}>

            <ExpenseForm
                mode="edit"
                initialValues={expense}
                onSuccess={() => router.back()}
            />

        </ScrollView>

    );

}

const styles = StyleSheet.create({

    container: {
        flexGrow: 1,
        padding: 20,
        backgroundColor: Colors.background,
    },

});