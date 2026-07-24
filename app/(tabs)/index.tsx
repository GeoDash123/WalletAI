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

    screen: {
        backgroundColor: "#F3F4F6",
    },

    container: {
        paddingHorizontal: 20,
        paddingTop: 25,
        paddingBottom: 40,
        flexGrow: 1,
    },

});