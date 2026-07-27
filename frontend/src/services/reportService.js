import api from "./api";

// Get Report Data
export const getReports = async (params = {}) => {
  const response = await api.get("/reports", {
    params,
  });

  return response.data;
};

// Export CSV
export const exportCSV = async (params = {}) => {
  const response = await api.get("/reports/export/csv", {
    params,
    responseType: "blob",
  });

  return response.data;
};

// Export PDF
export const exportPDF = async (params = {}) => {
  const response = await api.get("/reports/export/pdf", {
    params,
    responseType: "blob",
  });

  return response.data;
};