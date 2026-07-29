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
  const response = await api.get("/webhook/walletia", {
    params: { id },
  });
  return response.data;
}

//Borrar un gasto
export async function deleteExpense(id: number) {
  const response = await api.delete(
    `/webhook/2f922fdd-0fe7-468a-9157-38582ba4d9b0/walletia/${id}`
  );

  return response.data;
}