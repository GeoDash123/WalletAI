import StatisticsCard from "./StatisticsCard";

export default function SummaryCards() {

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