import { useEffect, useState } from "react";
import { Dashboard } from "@/types/Dashboard";
import { getDashboard } from "@/services/dashboardService";

export function useDashboard() {

    const [dashboard, setDashboard] = useState<Dashboard | null>(null);
    const [loading, setLoading] = useState(true);

    async function loadDashboard() {

        try {

            const data = await getDashboard();

            setDashboard(data);

        } catch (error) {

            console.log(error);

        } finally {

            setLoading(false);

        }

    }

    useEffect(() => {

        loadDashboard();

    }, []);

    return {
        dashboard,
        loading,
        reload: loadDashboard,
    };

}