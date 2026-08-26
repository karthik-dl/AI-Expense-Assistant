import { Bot, Sparkles } from "lucide-react";
import Card from "../ui/Card";

function AIChatSummary({ summary }) {
  const report =
    summary?.aiSummary ||
    "No AI summary is available yet. Add more income, expenses, and budgets to generate personalized financial insights.";

  return (
    <Card>
      {/* Header */}
      <div className="mb-6 flex items-center gap-3">
        <div className="rounded-2xl bg-blue-100 p-3">
          <Bot
            size={24}
            className="text-blue-600"
          />
        </div>

        <div>
          <h2 className="text-xl font-semibold text-slate-800">
            AI Financial Summary
          </h2>

          <p className="text-sm text-slate-500">
            Your financial report generated from
            your financial data.
          </p>
        </div>
      </div>

      {/* AI Report */}
      <div className="rounded-3xl bg-linear-to-br from-blue-50 to-slate-50 p-6">
        <div className="mb-4 flex items-center gap-2">
          <Sparkles
            size={20}
            className="text-yellow-500"
          />

          <span className="font-semibold text-slate-700">
            AI Insights
          </span>
        </div>

        <p className="whitespace-pre-line leading-8 text-slate-700">
          {report}
        </p>
      </div>
    </Card>
  );
}

export default AIChatSummary;