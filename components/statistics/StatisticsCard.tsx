import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

import Card from "@/components/ui/Card";
import { Colors } from "@/constants/colors";

type Props = {
    title: string;
    value: string;
    icon: keyof typeof MaterialCommunityIcons.glyphMap;
    color: string;
    fullWidth?: boolean;
};

export default function StatisticsCard({
    title,
    value,
    icon,
    color,
    fullWidth,
}: Props) {

    return (

        <Card style={fullWidth ? styles.fullCard : styles.smallCard}>

            <View style={styles.container}>

                <View
                    style={[
                        styles.iconContainer,
                        { backgroundColor: color + "20" },
                    ]}
                >
                    <MaterialCommunityIcons
                        name={icon}
                        size={24}
                        color={color}
                    />
                </View>

                <View style={styles.info}>

                    <Text
                        numberOfLines={1}
                        style={styles.title}
                    >
                        {title}
                    </Text>

                    <Text
                        numberOfLines={1}
                        adjustsFontSizeToFit
                        style={styles.value}
                    >
                        {value}
                    </Text>

                </View>

            </View>

        </Card>

    );

}

const styles = StyleSheet.create({

    container: {
        flexDirection: "row",
        alignItems: "center",
    },

    iconContainer: {
        width: 44,
        height: 44,
        borderRadius: 22,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 12,
    },

    info: {
        flex: 1,
    },

    title: {
        fontSize: 13,
        color: Colors.secondaryText,
    },

    value: {
        marginTop: 4,
        fontSize: 20,
        fontWeight: "bold",
        color: Colors.text,
    },

    smallCard: {
        flex: 1,
    },

    fullCard: {
        width: "100%",
    },

});