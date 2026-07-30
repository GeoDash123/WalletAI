export interface Expense {
    amount: number;
    category: string;
    description: string;
}

export interface ExpenseRecord extends Expense {
    id: number;
    created_at: string;
}