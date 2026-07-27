import { useState } from "react";
import { exportCSV, exportPDF } from "../../services/reportService";

const ExportButtons = ({ filters }) => {
  const [csvLoading, setCsvLoading] = useState(false);
  const [pdfLoading, setPdfLoading] = useState(false);

  const downloadFile = (blob, filename) => {
    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = filename;

    document.body.appendChild(link);
    link.click();

    link.remove();
    window.URL.revokeObjectURL(url);
  };

  const handleExportCSV = async () => {
    try {
      setCsvLoading(true);

      const blob = await exportCSV(filters);

      downloadFile(blob, "Expense_Report.csv");
    } catch (error) {
      console.error("CSV Export Failed", error);
    } finally {
      setCsvLoading(false);
    }
  };

  const handleExportPDF = async () => {
    try {
      setPdfLoading(true);

      const blob = await exportPDF(filters);

      downloadFile(blob, "Expense_Report.pdf");
    } catch (error) {
      console.error("PDF Export Failed", error);
    } finally {
      setPdfLoading(false);
    }
  };

  return (
    <div className="flex flex-wrap gap-4 justify-end mb-6">
      <button
        onClick={handleExportCSV}
        disabled={csvLoading}
        className="bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white px-5 py-2 rounded-lg transition"
      >
        {csvLoading ? "Exporting..." : "Export CSV"}
      </button>

      <button
        onClick={handleExportPDF}
        disabled={pdfLoading}
        className="bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white px-5 py-2 rounded-lg transition"
      >
        {pdfLoading ? "Exporting..." : "Export PDF"}
      </button>
    </div>
  );
};

export default ExportButtons;