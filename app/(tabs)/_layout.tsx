import { Tabs } from "expo-router";
import { Colors } from "@/constants/theme";
import MaterialCommunityIcons from "@expo/vector-icons/build/MaterialCommunityIcons";

export default function TabLayout() {

    return (

        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: Colors.light.tint,
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: "Registrar",
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons
                            name="plus-circle"
                            color={color}
                            size={size}
                        />
                    ),
                }}
            />

            <Tabs.Screen
                name="explore"
                options={{
                    title: "Historial",
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons
                            name="history"
                            color={color}
                            size={size}
                        />
                    ),
                }}
            />

            <Tabs.Screen
                name="statistics"
                options={{
                    title: "Estadísticas",
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons
                            name="chart-pie"
                            color={color}
                            size={size}
                        />
                    ),
                }}
            />

        </Tabs>

    );

}