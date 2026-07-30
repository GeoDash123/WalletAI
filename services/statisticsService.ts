import { api } from "./api";
import { StatisticsResponse } from "@/types/Statistics";

export async function getStatistics(): Promise<StatisticsResponse[]> {

    const response = await api.get("/webhook/statistics");

    return response.data;

}