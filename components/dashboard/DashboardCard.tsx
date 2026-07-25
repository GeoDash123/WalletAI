import { StyleSheet, View } from "react-native";

import StatCard from "@/components/ui/StatCard";
import { Colors } from "@/constants/colors";
import { Dashboard } from "@/types/Dashboard";
import { formatCurrency } from "@/utils/currency";

type Props = {
  dashboard: Dashboard;
};

export default function DashboardCard({ dashboard }: Props) {
  return (
    <>
      <StatCard
        variant="large"
        icon="wallet"
        title="Total gastado"
        value={formatCurrency(Number(dashboard.total_amount))}
        color={Colors.success}
      />

      <View style={styles.row}>
        <StatCard
          style={{ flex: 1 }}
          variant="small"
          icon="receipt"
          title="Gastos"
          value={String(dashboard.total_expenses)}
        />

        <StatCard
          style={{ flex: 1 }}
          variant="small"
          icon="chart-line"
          title="Promedio"
          value={formatCurrency(Number(dashboard.average_amount))}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    gap: 12,
  },
});
