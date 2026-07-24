import { ReactNode } from "react";
import { View, StyleSheet } from "react-native";

type Props = {
    children: ReactNode;
};

export default function Card({ children }: Props) {

    return (
        <View style={styles.card}>
            {children}
        </View>
    );

}

const styles = StyleSheet.create({

    card: {
        backgroundColor: "#FFFFFF",
        borderRadius: 16,
        padding: 20,
        marginBottom: 20,

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.08,
        shadowRadius: 8,

        elevation: 4,
    },

});