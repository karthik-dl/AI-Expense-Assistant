import api from "./api";

export const getExpenses = (params) => {
  return api.get("/expenses", {
    params,
  });
};

export const getExpense = (id) => {
  return api.get(`/expenses/${id}`);
};

export const createExpense = (data) => {
  return api.post("/expenses", {
    description: data.title,
    amount: Number(data.amount),
    category: data.category,
    expense_date: data.date,
  });
};

export const updateExpense = (id, data) => {
  return api.put(`/expenses/${id}`, {
    description: data.title,
    amount: Number(data.amount),
    category: data.category,
    expense_date: data.date,
  });
};

export const deleteExpense = (id) => {
  return api.delete(`/expenses/${id}`);
};