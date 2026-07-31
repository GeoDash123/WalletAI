import { useState, useCallback } from "react";
import { Dashboard } from "@/types/Dashboard";
import { getDashboard } from "@/services/dashboardService";
import { useFocusEffect } from "expo-router";

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

    useFocusEffect(
        useCallback(() => {
            loadDashboard();
        }, [])
    );

    return {
        dashboard,
        loading,
        reload: loadDashboard,
    };

}