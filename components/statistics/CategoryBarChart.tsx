import { Dimensions } from "react-native";

import { BarChart } from "react-native-chart-kit";

import { CategoryStatistic } from "@/types/Statistics";

type Props = {
    data: CategoryStatistic[];
};

export default function CategoryBarChart({
    data,
}: Props) {

    return (

        <BarChart

            width={Dimensions.get("window").width - 40}

            height={250}

            data={{
                labels: data.map(item => item.category),

                datasets: [
                    {
                        data: data.map(item => Number(item.total))
                    }
                ]
            }}

            yAxisLabel="$"
            yAxisSuffix=""

            chartConfig={{
                backgroundGradientFrom: "#fff",
                backgroundGradientTo: "#fff",

                decimalPlaces: 0,

                color: opacity =>
                    `rgba(59,130,246,${opacity})`,
            }}

            fromZero

        />

    );

}