import api from "./api";

export const getAISummary = () =>
  api.get("/ai/summary");

export const getPredictions = () =>
  api.get("/ai/predictions");

export const getSavingsTips = () =>
  api.get("/ai/savings");

export const getBudgetAlerts = () =>
  api.get("/ai/budget-alerts");