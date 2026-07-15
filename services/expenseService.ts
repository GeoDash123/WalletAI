import { api } from "./api";
import { Expense } from "../types/Expense";

export async function createExpense(expense: Expense) {
    const response = await api.post("/webhook/walletia", expense);

    return response.data;
}