import { StyleSheet, Text, View } from "react-native";

import Card from "@/components/ui/Card";
import { Colors } from "@/constants/colors";

type Props = {
    title: string;
    value: string;
};

export default function StatisticsCard({
    title,
    value,
}: Props) {

    return (

        <Card>
            <View style={styles.container}>
                <Text style={styles.title}>
                    {title}
                </Text>

                <Text style={styles.value}>
                    {value}
                </Text>
            </View>
        </Card>

    );

}

const styles = StyleSheet.create({

    container: {
        alignItems: "center",
        paddingVertical: 10,
    },

    title: {
        color: Colors.secondaryText,
        fontSize: 14,
    },

    value: {
        marginTop: 6,
        fontSize: 22,
        fontWeight: "bold",
        color: Colors.primary,
    },

});