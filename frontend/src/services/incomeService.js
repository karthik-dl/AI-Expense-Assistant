import api from "./api";

export const getIncomes = () =>
  api.get("/incomes");

export const getIncome = (id) =>
  api.get(`/incomes/${id}`);

export const createIncome = (data) =>
  api.post("/incomes", data);

export const updateIncome = (id, data) =>
  api.put(`/incomes/${id}`, data);

export const deleteIncome = (id) =>
  api.delete(`/incomes/${id}`);

export const getTotalIncome = () =>
  api.get("/incomes/total");

export const getIncomeCategorySummary = () =>
  api.get("/incomes/category-summary");