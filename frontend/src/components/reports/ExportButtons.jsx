import { useState } from "react";
import {
  Download,
  FileText,
  FileSpreadsheet,
} from "lucide-react";
import toast from "react-hot-toast";

import Button from "../ui/Button";
import {
  exportPdf,
  exportCsv,
} from "../../services/reportsService";

function ExportButtons({
  filters = {},
}) {
  const [pdfLoading, setPdfLoading] =
    useState(false);

  const [csvLoading, setCsvLoading] =
    useState(false);

  const downloadFile = (
    blob,
    filename
  ) => {
    const url = window.URL.createObjectURL(
      new Blob([blob])
    );

    const link =
      document.createElement("a");

    link.href = url;
    link.setAttribute(
      "download",
      filename
    );

    document.body.appendChild(link);

    link.click();

    link.remove();

    window.URL.revokeObjectURL(url);
  };

  const handlePdfExport = async () => {
    try {
      setPdfLoading(true);

      const response =
        await exportPdf(filters);

      downloadFile(
        response.data,
        "financial-report.pdf"
      );

      toast.success(
        "PDF report downloaded successfully."
      );
    } catch (error) {
      console.error(
        "PDF Export Error:",
        error
      );

      toast.error(
        error?.response?.data?.message ||
          "PDF export is not available yet."
      );
    } finally {
      setPdfLoading(false);
    }
  };

  const handleCsvExport = async () => {
    try {
      setCsvLoading(true);

      const response =
        await exportCsv(filters);

      downloadFile(
        response.data,
        "financial-report.csv"
      );

      toast.success(
        "CSV report downloaded successfully."
      );
    } catch (error) {
      console.error(
        "CSV Export Error:",
        error
      );

      toast.error(
        error?.response?.data?.message ||
          "CSV export is not available yet."
      );
    } finally {
      setCsvLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">

      <Button
        type="button"
        variant="outline"
        loading={pdfLoading}
        disabled={
          pdfLoading || csvLoading
        }
        onClick={handlePdfExport}
        leftIcon={
          !pdfLoading && (
            <FileText size={16} />
          )
        }
      >
        Export PDF
      </Button>

      <Button
        type="button"
        variant="outline"
        loading={csvLoading}
        disabled={
          pdfLoading || csvLoading
        }
        onClick={handleCsvExport}
        leftIcon={
          !csvLoading && (
            <FileSpreadsheet
              size={16}
            />
          )
        }
      >
        Export CSV
      </Button>

    </div>
  );
}

export default ExportButtons;