import { SummaryStatistic } from "@/types/Statistics";
import StatisticsCard from "./StatisticsCard";

type Props = {
    summary: SummaryStatistic;
};

export default function SummaryCards({ summary }: Props) {

    return (
        <>
            <StatisticsCard
                title="Total Gastado"
                value="$0.00"
            />

            <StatisticsCard
                title="Número de Gastos"
                value="0"
            />
        </>
    );

}