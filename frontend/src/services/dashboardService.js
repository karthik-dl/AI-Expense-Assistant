import api from "./api";

export const getDashboardSummary = async () => {
    const response = await api.get("/dashboard/summary");
    return response.data;
};

export const getMonthlySummary = async () => {
    const response = await api.get("/dashboard/monthly-summary");
    return response.data;
};

export const getCategoryExpenses = async () => {
    const response = await api.get("/dashboard/category-expenses");
    return response.data;
};

export const getRecentTransactions = async () => {
    const response = await api.get("/dashboard/recent-transactions");
    return response.data;
};