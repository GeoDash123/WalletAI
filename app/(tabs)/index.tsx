import { ScrollView, StyleSheet, Text, ActivityIndicator, Alert, View } from "react-native";
import ExpenseForm from "@/components/expenses/ExpenseForm";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "@/constants/colors";
import * as ImagePicker from "expo-image-picker";
import PrimaryButton from "@/components/ui/PrimaryButton";
import { scanReceipt } from "@/services/aiService";
import { useState } from "react";

export default function HomeScreen() {

    type ScannedExpense = {
        amount: number;
        description: string;
        category: string;
    };

    const [scanning, setScanning] = useState(false);

    const [scannedExpense, setScannedExpense] =
    useState<ScannedExpense | null>(null);

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

    async function scanTicket() {

        try {

            const permission =
                await ImagePicker.requestCameraPermissionsAsync();

            if (!permission.granted) {
                Alert.alert(
                    "Permiso requerido",
                    "Se necesita permiso para usar la cámara."
                );
                return;
            }

            const result =
                await ImagePicker.launchCameraAsync({
                    quality: 0.4,
                    base64: true,
                });

            if (result.canceled) {
                return;
            }

            setScanning(true);

            const response = await scanReceipt(result.assets[0]);

            setScannedExpense(response);

        } catch (error) {

            console.error("Error al analizar ticket:", error);

            Alert.alert(
                "No se pudo analizar el ticket",
                "Ocurrió un error al procesar la imagen. Inténtalo nuevamente."
            );

        } finally {

            setScanning(false);

        }
    }

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

                <PrimaryButton
                    title="📷 Escanear ticket con IA"
                    onPress={scanTicket}
                />

                <ExpenseForm scannedValues={scannedExpense} />

            </ScrollView>

            {scanning && (
                <View style={styles.loadingOverlay}>

                    <ActivityIndicator
                        size="large"
                    />

                    <Text style={styles.loadingText}>
                        Analizando ticket...
                    </Text>

                    <Text style={styles.loadingSubtext}>
                        Esto puede tardar unos segundos
                    </Text>

                </View>
            )}

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

    loadingOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "rgba(0, 0, 0, 0.55)",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 999,
    },

    loadingText: {
        marginTop: 15,
        fontSize: 18,
        fontWeight: "600",
        color: "white",
    },

    loadingSubtext: {
        marginTop: 8,
        fontSize: 14,
        color: "#E5E7EB",
    },

});