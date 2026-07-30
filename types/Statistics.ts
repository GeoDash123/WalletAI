export interface CategoryStatistic {
    category: string;
    total: number;
}

export interface MonthlyStatistic {
    month: string;
    total: number;
}

export interface SummaryStatistic {
    total: number;
    average: number;
    count: number;
    highest: number;
}

export interface StatisticsResponse {
    statistics: {
        summary: SummaryStatistic;
        categories: CategoryStatistic[];
        monthly: MonthlyStatistic[];
    };
}