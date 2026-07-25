import { Colors } from "@/constants/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

import Card from "@/components/ui/Card";
import { Dashboard } from "@/types/Dashboard";

type Props = {
  dashboard: Dashboard;
};

export default function DashboardCard({ dashboard }: Props) {
  return (
    <Card>
      <View style={styles.header}>
        <MaterialCommunityIcons
          name="wallet"
          size={26}
          color={Colors.primary}
        />

        <Text style={styles.title}>Total gastado</Text>
      </View>

      <Text style={styles.total}>
        ${Number(dashboard.total_amount).toFixed(2)}
      </Text>

      <View style={styles.divider} />

      <View style={styles.row}>
        <View style={styles.item}>
          <MaterialCommunityIcons
            name="receipt"
            size={22}
            color={Colors.secondaryText}
          />

          <Text style={styles.label}>Gastos</Text>

          <Text style={styles.value}>{dashboard.total_expenses}</Text>
        </View>

        <View style={styles.item}>
          <MaterialCommunityIcons
            name="chart-line"
            size={22}
            color={Colors.secondaryText}
          />

          <Text style={styles.label}>Promedio</Text>

          <Text style={styles.value}>
            ${Number(dashboard.average_amount).toFixed(2)}
          </Text>
        </View>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
  },

  title: {
    marginLeft: 10,
    fontSize: 18,
    fontWeight: "600",
    color: Colors.secondaryText,
  },

  total: {
    marginTop: 18,
    fontSize: 38,
    fontWeight: "bold",
    color: Colors.success,
  },

  divider: {
    height: 1,
    backgroundColor: Colors.divider,
    marginVertical: 22,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-around",
  },

  item: {
    alignItems: "center",
  },

  label: {
    marginTop: 8,
    color: "#6B7280",
    fontSize: 14,
  },

  value: {
    marginTop: 6,
    fontWeight: "bold",
    fontSize: 20,
    color: "#111827",
  },
});
