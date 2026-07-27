import api from "./api";

// Get Budgets
export const getBudgets = async (params = {}) => {
  const response = await api.get("/budgets", {
    params,
  });

  return response.data;
};

// Get Single Budget
export const getBudgetById = async (id) => {
  const response = await api.get(`/budgets/${id}`);

  return response.data;
};

// Create Budget
export const createBudget = async (budgetData) => {
  const response = await api.post(
    "/budgets",
    budgetData
  );

  return response.data;
};

// Update Budget
export const updateBudget = async (
  id,
  budgetData
) => {
  const response = await api.put(
    `/budgets/${id}`,
    budgetData
  );

  return response.data;
};

// Delete Budget
export const deleteBudget = async (id) => {
  const response = await api.delete(
    `/budgets/${id}`
  );

  return response.data;
};