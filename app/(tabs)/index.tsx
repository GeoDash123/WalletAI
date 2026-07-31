import { ScrollView, StyleSheet, Text } from "react-native";
import ExpenseForm from "@/components/expenses/ExpenseForm";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "@/constants/colors";

export default function HomeScreen() {

    function getGreeting() {
        const hour = new Date().getHours();

        if (hour >= 5 && hour < 12) {
            return "Buenos días";
        }

        if (hour >= 12 && hour < 19) {
            return "Buenas tardes";
        }

        return "Buenas noches";
    }

    const greeting = getGreeting();

    return (

        <SafeAreaView style={styles.container}>

            <ScrollView
                contentContainerStyle={styles.content}
            >

                <Text style={styles.greeting}>
                    {greeting}
                </Text>

                <Text style={styles.subtitle}>
                    ¿Qué gasto deseas registrar hoy?
                </Text>

                <ExpenseForm />

            </ScrollView>

        </SafeAreaView>

    );

}

const styles = StyleSheet.create({

    screen: {
        backgroundColor: "#F3F4F6",
    },

    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },

    content: {
        paddingHorizontal: 20,
        paddingTop: 25,
        paddingBottom: 40,
        gap: 25,
    },

    greeting: {
        fontSize: 28,
        fontWeight: "700",
        marginBottom: 10,
    },

    subtitle: {
        fontSize: 16,
        color: "#6B7280",
        marginBottom: 20,
    },

});