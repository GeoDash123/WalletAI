import ExpenseForm from "@/components/expenses/ExpenseForm";
import { getExpense } from "@/services/expenseService";
import { ExpenseRecord } from "@/types/Expense";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

import {
    ActivityIndicator,
    ScrollView,
    StyleSheet,
    Pressable,
    Text,
    View
} from "react-native";

import { Colors } from "@/constants/colors";

export default function EditExpenseScreen() {

    const { id } = useLocalSearchParams<{ id: string }>();
    const router = useRouter();
    const [expense, setExpense] = useState<ExpenseRecord | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        async function loadExpense() {

            try {
                const data = await getExpense(Number(id));
                setExpense(data);
            } catch (error) {
                console.log(error);
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

        <SafeAreaView style={styles.container}>

            <View style={styles.header}>
                <Pressable onPress={() => router.back()}>
                    <MaterialCommunityIcons
                        name="arrow-left"
                        size={28}
                        color={Colors.text}
                    />
                </Pressable>

                <Text style={styles.title}>
                    Editar gasto
                </Text>
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                <ExpenseForm
                    mode="edit"
                    initialValues={expense}
                    onSuccess={() => router.back()}
                />
            </ScrollView>

        </SafeAreaView>

    );

}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },

    content: {
        paddingHorizontal: 20,
        paddingTop: 25,
        paddingBottom: 40,
        gap: 25,
    },

    header: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 20,
        paddingTop: 10,
        paddingBottom: 10,
    },

    title: {
        fontSize: 24,
        fontWeight: "700",
        color: Colors.text,
        marginLeft: 16,
    },

});