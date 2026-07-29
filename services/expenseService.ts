import { Expense } from "../types/Expense";
import { api } from "./api";

//Registrar gasto
export async function createExpense(expense: Expense) {
  const response = await api.post("/webhook/walletia", expense);
  return response.data;
}

//Consultar Historial
export async function getExpenses() {
  const response = await api.get("/webhook/expenses");
  return response.data;
}

//Actualizar gasto
export async function updateExpense(id: number, expense: Expense) {
  const response = await api.put(
    "/webhook/55afb5be-8280-4474-b397-fd816428709a/walletia/" + id,
    expense
  );

  return response.data;
}

//Consultar un gasto
export async function getExpense(id: number): Promise<Expense> {
  console.log("BaseURL:", api.defaults.baseURL);
  console.log("URL:", `/webhook/walletia?id=${id}`);

  const response = await api.get("/webhook/walletia", {
    params: { id },
  });

  console.log("Respuesta:", response.data);

  return response.data;
}