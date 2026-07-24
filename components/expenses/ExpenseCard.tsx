import { View, Text, StyleSheet } from "react-native";
import { Expense } from "../../types/Expense";

type Props = {
    expense: Expense;
};

export default function ExpenseCard({ expense }: Props) {

    const date = expense.created_at
        ? new Date(expense.created_at).toLocaleDateString()
        : "";

    return (

        <View style={styles.card}>

            <View style={styles.row}>

                <Text style={styles.category}>
                    {expense.category}
                </Text>

                <Text style={styles.amount}>
                    ${expense.amount.toFixed(2)}
                </Text>

            </View>

            <Text style={styles.description}>
                {expense.description}
            </Text>

            <Text style={styles.date}>
                {date}
            </Text>

        </View>

    );

}

const styles = StyleSheet.create({

    card: {
        backgroundColor: "white",
        borderRadius: 12,
        padding: 18,
        marginBottom: 15,
        elevation: 3,
    },

    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    category: {
        fontSize: 18,
        fontWeight: "700",
    },

    amount: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#16a34a",
    },

    description: {
        marginTop: 10,
        fontSize: 15,
    },

    date: {
        marginTop: 12,
        color: "#888",
        fontSize: 12,
    },

});