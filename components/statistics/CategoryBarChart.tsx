import { BarChart } from "react-native-gifted-charts";

import Card from "@/components/ui/Card";
import { CategoryStatistic } from "@/types/Statistics";

type Props = {
    data: CategoryStatistic[];
};

export default function CategoryBarChart({
    data,
}: Props) {

    const chartData = data.map(item => ({
        value: Number(item.total),
        label: item.category,
    }));

    return (

        <Card>

            <BarChart
                data={chartData}

                isAnimated

                frontColor="#3B82F6"

                roundedTop

                barWidth={34}

                spacing={22}

                noOfSections={5}

                maxValue={Math.max(...chartData.map(i => i.value))}

                yAxisThickness={0}

                xAxisThickness={0}

                hideRules={false}

                rulesColor="#E5E7EB"

                rulesType="dashed"

                xAxisLabelTextStyle={{
                    fontSize: 12,
                }}

                yAxisTextStyle={{
                    fontSize: 12,
                }}

            />

        </Card>

    );

}