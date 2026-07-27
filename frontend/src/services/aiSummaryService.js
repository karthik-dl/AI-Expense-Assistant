import api from "./api";

// Get AI Summary
export const getAISummary = async () => {
  const response = await api.get("/ai-summary");
  return response.data;
};

// Get Financial Health
export const getFinancialHealth = async () => {
  const response = await api.get("/financial-health");
  return response.data;
};

// Get Spending Prediction
export const getSpendingPrediction = async () => {
  const response = await api.get("/prediction");
  return response.data;
};

// Get Recommendations
export const getRecommendations = async () => {
  const response = await api.get("/recommendations");
  return response.data;
};