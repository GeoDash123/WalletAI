import { Tabs } from "expo-router";
import React from "react";

import { HapticTab } from "@/components/haptic-tab";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { Colors } from "@/constants/theme";

export default function TabLayout() {

    return (

        <Tabs

            screenOptions={{

                tabBarActiveTintColor: Colors.light.tint,

                headerShown: false,

                tabBarButton: HapticTab,

            }}

        >

            <Tabs.Screen

                name="index"

                options={{

                    title: "Registrar",

                    tabBarIcon: ({ color }) => (

                        <IconSymbol
                            size={28}
                            name="plus.circle.fill"
                            color={color}
                        />

                    ),

                }}

            />

            <Tabs.Screen

                name="explore"

                options={{

                    title: "Historial",

                    tabBarIcon: ({ color }) => (

                        <IconSymbol
                            size={28}
                            name="list.bullet.rectangle.fill"
                            color={color}
                        />

                    ),

                }}

            />

        </Tabs>

    );

}