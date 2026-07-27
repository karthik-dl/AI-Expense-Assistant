import api from "./api";

// Get Incomes with Filters & Pagination
export const getIncomes = async (params = {}) => {
  const response = await api.get("/incomes", {
    params,
  });

  return response.data;
};

// Get Single Income
export const getIncomeById = async (id) => {
  const response = await api.get(`/incomes/${id}`);

  return response.data;
};

// Create Income
export const createIncome = async (incomeData) => {
  const response = await api.post(
    "/incomes",
    incomeData
  );

  return response.data;
};

// Update Income
export const updateIncome = async (
  id,
  incomeData
) => {
  const response = await api.put(
    `/incomes/${id}`,
    incomeData
  );

  return response.data;
};

// Delete Income
export const deleteIncome = async (id) => {
  const response = await api.delete(
    `/incomes/${id}`
  );

  return response.data;
};