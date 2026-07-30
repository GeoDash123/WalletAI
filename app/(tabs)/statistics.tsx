import { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, StyleSheet } from "react-native";
import { Colors } from "@/constants/colors";
import { getStatistics } from "@/services/statisticsService";
import { CategoryStatistic } from "@/types/Statistics";
import CategoryPieChart from "@/components/statistics/CategoryPieChart"

export default function StatisticsScreen() {

    const [data, setData] = useState<CategoryStatistic[]>([]);
    console.log(data);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        async function load() {

            try {

                const response = await getStatistics();

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

        <ScrollView contentContainerStyle={styles.container}>

            <CategoryPieChart data={data} />

        </ScrollView>

    );

}

const styles = StyleSheet.create({

    container: {
        flexGrow: 1,
        padding: 20,
        backgroundColor: Colors.background,
    },

});