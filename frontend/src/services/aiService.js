import api from "./api";

export const getAISummary = () =>
  api.get("/ai/summary");

export const getSavingsTips = () =>
  api.get("/ai/savings");

export const getBudgetAlerts = () =>
  api.get("/ai/budget-alerts");