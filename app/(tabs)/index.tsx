import { ScrollView, StyleSheet } from "react-native";
import DashboardCard from "@/components/dashboard/DashboardCard";
import ExpenseForm from "@/components/expenses/ExpenseForm";
import { useDashboard } from "@/hooks/useDashboard";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {

    const { dashboard } = useDashboard();

    return (

        <SafeAreaView style={styles.container}>

            <ScrollView>

            {dashboard && (
                <DashboardCard dashboard={dashboard} />
            )}

            <ExpenseForm />

            </ScrollView>

        </SafeAreaView>

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