import {
    FlatList,
    View,
    ActivityIndicator,
    StyleSheet
} from "react-native";

import ExpenseCard from "../../components/expenses/ExpenseCard";
import { useExpenses } from "../../hooks/useExpenses";

export default function HistoryScreen() {

    const {
        expenses,
        loading
    } = useExpenses();

    if (loading) {

        return (

            <View style={styles.loading}>

                <ActivityIndicator size="large"/>

            </View>

        );

    }

    return (

        <FlatList

            data={expenses}

            keyExtractor={(item) => item.id!.toString()}

            renderItem={({ item }) => (

                <ExpenseCard expense={item}/>

            )}

            contentContainerStyle={styles.container}

        />

    );

}

const styles = StyleSheet.create({

    container: {

        padding: 15,

    },

    loading: {

        flex:1,

        justifyContent:"center",

        alignItems:"center"

    }

});