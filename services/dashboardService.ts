import { api } from "./api";
import { Dashboard } from "@/types/Dashboard";

export async function getDashboard(): Promise<Dashboard> {

    const response = await api.get("/webhook-test/dashboard");

    return response.data;

}