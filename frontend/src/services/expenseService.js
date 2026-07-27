import api from "./api";

// Get Expenses with Filters & Pagination
export const getExpenses = async (params = {}) => {
  const response = await api.get("/expenses", {
    params,
  });

  return response.data;
};

// Get Single Expense
export const getExpenseById = async (id) => {
  const response = await api.get(`/expenses/${id}`);

  return response.data;
};

// Create Expense
export const createExpense = async (expenseData) => {
  const response = await api.post(
    "/expenses",
    expenseData
  );

  return response.data;
};

// Update Expense
export const updateExpense = async (
  id,
  expenseData
) => {
  const response = await api.put(
    `/expenses/${id}`,
    expenseData
  );

  return response.data;
};

// Delete Expense
export const deleteExpense = async (id) => {
  const response = await api.delete(
    `/expenses/${id}`
  );

  return response.data;
};