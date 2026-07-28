import toast from "react-hot-toast";
import { Download, FileText, FileSpreadsheet } from "lucide-react";

import Button from "../ui/Button";

import {
  exportPdf,
  exportCsv,
} from "../../services/reportsService";

function ExportButtons({ filters }) {
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

  const handlePdfExport = async () => {
    try {
      const { data } = await exportPdf(filters);

      downloadFile(data, "financial-report.pdf");

      toast.success("PDF exported successfully.");
    } catch (error) {
      console.error(error);

      toast.error("Failed to export PDF.");
    }
  };

  const handleCsvExport = async () => {
    try {
      const { data } = await exportCsv(filters);

      downloadFile(data, "financial-report.csv");

      toast.success("CSV exported successfully.");
    } catch (error) {
      console.error(error);

      toast.error("Failed to export CSV.");
    }
  };

  return (
    <div className="flex flex-wrap justify-end gap-4">
      <Button
        variant="secondary"
        onClick={handlePdfExport}
      >
        <FileText size={18} />
        Export PDF
      </Button>

      <Button
        onClick={handleCsvExport}
      >
        <FileSpreadsheet size={18} />
        Export CSV
      </Button>
    </div>
  );
}

export default ExportButtons;