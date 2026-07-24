import { ScrollView, StyleSheet } from "react-native";

import DashboardCard from "@/components/dashboard/DashboardCard";
import ExpenseForm from "@/components/expenses/ExpenseForm";
import { useDashboard } from "@/hooks/useDashboard";

export default function HomeScreen() {

    const { dashboard } = useDashboard();

    return (

        <ScrollView contentContainerStyle={styles.container}>

            {dashboard && (
                <DashboardCard dashboard={dashboard} />
            )}

            <ExpenseForm />

        </ScrollView>

    );

}

const styles = StyleSheet.create({

    container: {
        padding: 20,
        backgroundColor: "#F3F4F6",
        flexGrow: 1,
    },

});