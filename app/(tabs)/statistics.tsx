import { useEffect, useState } from "react";
import {
    ActivityIndicator,
    ScrollView,
    StyleSheet,
} from "react-native";

import CategoryBarChart from "@/components/statistics/CategoryBarChart";
import CategoryPieChart from "@/components/statistics/CategoryPieChart";
import MonthlyLineChart from "@/components/statistics/MonthlyLineChart";
import SummaryCards from "@/components/statistics/SummaryCards";

import { Colors } from "@/constants/colors";

import { getStatistics } from "@/services/statisticsService";

import { CategoryStatistic } from "@/types/Statistics";

export default function StatisticsScreen() {

    const [data, setData] =
        useState<CategoryStatistic[]>([]);

    const [loading, setLoading] =
        useState(true);

    useEffect(() => {

        async function load() {

            try {

                const response =
                    await getStatistics();

                setData(response);

            } finally {

                setLoading(false);

            }

        }

        load();

    }, []);

    if (loading) {
        return <ActivityIndicator />;
    }

    return (

        <ScrollView
            contentContainerStyle={styles.container}
        >

            <SummaryCards />

            <CategoryPieChart
                data={data}
            />

            <CategoryBarChart
                data={data}
            />

            <MonthlyLineChart />

        </ScrollView>

    );

}

const styles = StyleSheet.create({

    container: {
        flexGrow: 1,
        padding: 20,
        backgroundColor: Colors.background,
        gap: 25,
    },

});