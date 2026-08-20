import api from "./api";

export const getBudgets = () =>
  api.get("/budgets");

export const getBudget = (id) =>
  api.get(`/budgets/${id}`);

export const createBudget = (data) =>
  api.post("/budgets", data);

export const updateBudget = (id, data) =>
  api.put(`/budgets/${id}`, data);

export const deleteBudget = (id) =>
  api.delete(`/budgets/${id}`);

export const getRemainingBudget = (
  month,
  year
) =>
  api.get("/budgets/remaining", {
    params: {
      month,
      year,
    },
  });

export const getBudgetUtilization = (
  month,
  year
) =>
  api.get("/budgets/utilization", {
    params: {
      month,
      year,
    },
  });