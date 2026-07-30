import { Dimensions } from "react-native";
import { PieChart } from "react-native-chart-kit";

import { CategoryStatistic } from "@/types/Statistics";

type Props = {
    data: CategoryStatistic[];
};

const COLORS = [
    "#4F46E5",
    "#10B981",
    "#F59E0B",
    "#EF4444",
    "#8B5CF6",
    "#06B6D4",
    "#EC4899",
];

export default function CategoryPieChart({ data }: Props) {

    const chartData = data.map((item, index) => ({
        name: item.category,
        population: Number(item.total),
        color: COLORS[index % COLORS.length],
        legendFontColor: "#444",
        legendFontSize: 14,
    }));

    return (
        <PieChart
            data={chartData}
            width={Dimensions.get("window").width - 40}
            height={220}
            accessor="population"
            backgroundColor="transparent"
            paddingLeft="15"
            absolute
            chartConfig={{
                color: () => "#000",
            }}
        />
    );

}