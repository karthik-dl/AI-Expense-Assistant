import api from "./api";

// Dashboard Analytics
export const getAnalytics = async (params = {}) => {
  const response = await api.get("/analytics", {
    params,
  });

  return response.data;
};

// Monthly Trend
export const getMonthlyTrend = async (params = {}) => {
  const response = await api.get("/analytics/monthly-trend", {
    params,
  });

  return response.data;
};

// Expense by Category
export const getCategoryAnalytics = async (params = {}) => {
  const response = await api.get("/analytics/category", {
    params,
  });

  return response.data;
};

// Income vs Expense
export const getIncomeExpenseComparison = async (params = {}) => {
  const response = await api.get("/analytics/comparison", {
    params,
  });

  return response.data;
};