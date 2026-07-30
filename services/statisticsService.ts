import { api } from "./api";
import { CategoryStatistic } from "@/types/Statistics";

export async function getStatistics(): Promise<CategoryStatistic[]> {

    const response = await api.get("/webhook/statistics");

    return response.data;

}