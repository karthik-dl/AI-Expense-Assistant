import api from "./api";

export const getAISummary = () =>
  api.get("/ai-summary");