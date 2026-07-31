import { StyleSheet, View } from "react-native";

import StatisticsCard from "./StatisticsCard";

import { SummaryStatistic } from "@/types/Statistics";
import { formatCurrency } from "@/utils/currency";

type Props = {
    summary: SummaryStatistic;
};

export default function SummaryCards({ summary }: Props) {

    return (

        <>
            <StatisticsCard
                title="Total gastado"
                value={formatCurrency(summary.total)}
                icon="cash"
                color="#10B981"
                fullWidth
            />

            <View style={styles.row}>
                <StatisticsCard
                    title="Gastos"
                    value={summary.count.toString()}
                    icon="receipt"
                    color="#8B5CF6"
                />

                <StatisticsCard
                    title="Promedio"
                    value={formatCurrency(summary.average)}
                    icon="calculator"
                    color="#3B82F6"
                />
            </View>

            <StatisticsCard
                title="Mayor gasto"
                value={formatCurrency(summary.highest)}
                icon="trending-up"
                color="#F59E0B"
                fullWidth
            />
        </>

    );

}

const styles = StyleSheet.create({

    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 12,
    },

});