import { Dashboard } from "@/types/Dashboard";
import { api } from "./api";

export async function getDashboard(): Promise<Dashboard> {
  //const response = await api.get("/webhook-test/dashboard");
  const response = await api.get("/webhook/dashboard");

  return response.data;
}
