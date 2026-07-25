import { Expense } from "../types/Expense";
import { api } from "./api";

//Registrar gasto
export async function createExpense(expense: Expense) {
  //const response = await api.post("/webhook-test/walletia", expense);
  const response = await api.post("/webhook/walletia", expense);
  return response.data;
}

//Consultar Historial
export async function getExpenses() {
  const response = await api.get("/webhook-test/expenses");
  return response.data;
}

/*
export async function updateExpense(...) { }
export async function deleteExpense(...) { }
*/
