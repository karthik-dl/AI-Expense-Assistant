import api from "./api";

export const getAISummary = () => {
  return api.get("/ai-summary");
};

export const getSavingsTips = () => {
  return api.get("/ai/savings");
};

export const getBudgetAlerts = () => {
  return api.get("/ai/budget-alerts");
};