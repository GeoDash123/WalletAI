import Card from "@/components/ui/Card";
import { CategoryStatistic } from "@/types/Statistics";
import { PieChart } from "react-native-gifted-charts";
import {
    StyleSheet,
    Text,
    View,
} from "react-native";

type Props = {
    data: CategoryStatistic[];
};

const COLORS = [
    "#3B82F6",
    "#10B981",
    "#F59E0B",
    "#EF4444",
    "#8B5CF6",
    "#06B6D4",
    "#EC4899",
];

export default function CategoryPieChart({ data }: Props) {

    const pieData = data.map((item, index) => ({
        value: Number(item.total),
        text: `${Math.round(
            (Number(item.total) /
                data.reduce((sum, c) => sum + Number(c.total), 0)) * 100
        )}%`,
        color: COLORS[index % COLORS.length],
        label: item.category,
    }));

    return (
        <Card>
            <View style={styles.chartContainer}>
                <PieChart
                    data={pieData}
                    donut
                    radius={95}
                    innerRadius={55}
                    textColor="white"
                    textSize={13}
                    showText
                    focusOnPress
                    isAnimated
                />
            </View>

            <View style={styles.legend}>
                {pieData.map((item) => (
                    <View key={item.label} style={styles.legendItem}>
                        <View
                            style={[
                                styles.legendColor,
                                { backgroundColor: item.color },
                            ]}
                        />

                        <Text style={styles.legendText}>
                            {item.label}
                        </Text>
                    </View>
                ))}
            </View>

        </Card>
    );
}


const styles = StyleSheet.create({
    legend: {
        marginTop: 20,
        gap: 10,
    },

    legendItem: {
        flexDirection: "row",
        alignItems: "center",
    },

    legendColor: {
        width: 14,
        height: 14,
        borderRadius: 7,
        marginRight: 10,
    },

    legendText: {
        fontSize: 15,
    },

    chartContainer: {
    alignItems: "center",
    },
});