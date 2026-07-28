import api from "./api";

export const getReportSummary = (params = {}) =>
  api.get("/reports/summary", {
    params,
  });

export const getMonthlyReport = (params = {}) =>
  api.get("/reports/monthly", {
    params,
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