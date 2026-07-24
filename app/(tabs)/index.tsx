import { View, StyleSheet } from "react-native";

import ExpenseForm from "../../components/expenses/ExpenseForm";

export default function HomeScreen() {

    return (

        <View style={styles.container}>

            <ExpenseForm />

        </View>

    );

}

const styles = StyleSheet.create({

    container: {
        flex: 1,
    },

});