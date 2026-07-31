import { useState, useCallback } from "react";
import {
    ActivityIndicator,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";

import CategoryBarChart from "@/components/statistics/CategoryBarChart";
import CategoryPieChart from "@/components/statistics/CategoryPieChart";
import SummaryCards from "@/components/statistics/SummaryCards";
import { Colors } from "@/constants/colors";
import { getStatistics } from "@/services/statisticsService";
import { StatisticsResponse } from "@/types/Statistics";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect } from "expo-router";

export default function StatisticsScreen() {

    const [data, setData] =
    useState<StatisticsResponse | null>(null);

    const [loading, setLoading] =
        useState(true);

    useFocusEffect(
        useCallback(() => {

            async function load() {

                setLoading(true);

                try {

                    const response = await getStatistics();
                    setData(response[0]);

                } finally {

                    setLoading(false);

                }

            }

            load();

        }, [])
    );

    if (loading) {
        return <ActivityIndicator />;
    }

    if (!data) {
        return null;
    }

    function SectionTitle({
        title,
        icon,
    }: {
        title: string;
        icon: keyof typeof MaterialCommunityIcons.glyphMap;
    }) {
        return (
            <View style={styles.sectionHeader}>
                <MaterialCommunityIcons
                    name={icon}
                    size={22}
                    color={Colors.primary}
                />

                <Text style={styles.heading}>
                    {title}
                </Text>
            </View>
        );
    }

    return (

        <SafeAreaView
            style={styles.safeArea}
            edges={["top"]}
        >

            <ScrollView
            contentContainerStyle={styles.container}
            >

                <SectionTitle
                    title="Resumen"
                    icon="view-dashboard"
                />

                <SummaryCards
                    summary={data.statistics.summary}
                />

                <SectionTitle
                    title="Distribución por categoría"
                    icon="chart-pie"
                />

                <CategoryPieChart
                    data={data.statistics.categories}
                />

                <SectionTitle
                    title="Gastos por categoría"
                    icon="chart-bar"
                />

                <CategoryBarChart
                    data={data.statistics.categories}
                />

            </ScrollView>


        </SafeAreaView>

        

    );

}

const styles = StyleSheet.create({

    container: {
        flexGrow: 1,
        padding: 20,
        gap: 20,
    },

    heading: {
        fontSize: 22,
        fontWeight: "700",
        color: Colors.text,
        lineHeight: 24,
        includeFontPadding: false,
        textAlignVertical: "center",
    },

    sectionHeader: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        marginBottom: -10,
    },

    safeArea: {
        flex: 1,
        backgroundColor: Colors.background,
    },

});