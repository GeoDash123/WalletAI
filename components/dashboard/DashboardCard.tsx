import SummaryCards from "@/components/statistics/SummaryCards";
import { Dashboard } from "@/types/Dashboard";

type Props = {
    dashboard: Dashboard;
};

export default function DashboardCard({ dashboard }: Props) {

    return (

        <SummaryCards
            summary={{
                total: Number(dashboard.total_amount),
                average: Number(dashboard.average_amount),
                count: dashboard.total_expenses,
                highest: Number(dashboard.highest_amount),
            }}
        />

    );

}