import { View, Text, StyleSheet } from "react-native";
import { Dashboard } from "@/types/Dashboard";

type Props = {
    dashboard: Dashboard;
};

export default function DashboardCard({ dashboard }: Props) {

    return (

        <View style={styles.card}>

            <Text>Total gastado</Text>
            <Text>${Number(dashboard.total_amount).toFixed(2)}</Text>

            <Text>Número de gastos</Text>
            <Text>{dashboard.total_expenses}</Text>

            <Text>Promedio</Text>
            <Text>${Number(dashboard.average_amount).toFixed(2)}</Text>

        </View>

    );

}

const styles = StyleSheet.create({

    card: {
        backgroundColor: "#fff",
        padding: 20,
        borderRadius: 12,
        marginBottom: 20,
        elevation: 3,
    },

});