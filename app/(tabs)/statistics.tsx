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

import { StatisticsResponse } from "@/types/Statistics";

export default function StatisticsScreen() {

    const [data, setData] =
    useState<StatisticsResponse | null>(null);

    const [loading, setLoading] =
        useState(true);

    useEffect(() => {

        async function load() {

            try {

                const response = await getStatistics();

                setData(response[0]);

            } finally {

                setLoading(false);

            }

        }

        load();

    }, []);

    if (loading) {
        return <ActivityIndicator />;
    }

    if (!data) {
        return null;
    }

    return (

        <ScrollView
            contentContainerStyle={styles.container}
        >

            <SummaryCards
                summary={data.statistics.summary}
            />

            <CategoryPieChart
                data={data.statistics.categories}
            />

            <CategoryBarChart
                data={data.statistics.categories}
            />

            <MonthlyLineChart
                data={data.statistics.monthly}
            />

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