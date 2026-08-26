import api from "./api";

export const getMonthlyReport = (
  month,
  year
) =>
  api.get("/reports/monthly", {
    params: {
      month,
      year,
    },
  });

export const getYearlyReport = (year) =>
  api.get("/reports/yearly", {
    params: {
      year,
    },
  });

export const getCategoryAnalysis = (
  month,
  year
) =>
  api.get("/reports/category-analysis", {
    params: {
      month,
      year,
    },
  });

export const getCashFlow = (year) =>
  api.get("/reports/cash-flow", {
    params: {
      year,
    },
  });

export const getTopExpenses = (limit = 5) =>
  api.get("/reports/top-expenses", {
    params: {
      limit,
    },
  });

export const getSavingsAnalysis = (year) =>
  api.get("/reports/savings-analysis", {
    params: {
      year,
    },
  });

export const exportPdf = (params = {}) =>
  api.get("/reports/export/pdf", {
    params,
    responseType: "blob",
  });

export const exportCsv = (params = {}) =>
  api.get("/reports/export/csv", {
    params,
    responseType: "blob",
  });