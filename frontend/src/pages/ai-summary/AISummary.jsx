import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import PageHeader from "../../components/ui/PageHeader";
import Loader from "../../components/ui/Loader";

import SummaryCard from "../../components/ai-summary/SummaryCard";
import FinancialHealth from "../../components/ai-summary/FinancialHealth";
import PredictionCard from "../../components/ai-summary/PredictionCard";
import SpendingInsights from "../../components/ai-summary/SpendingInsights";
import BudgetAlerts from "../../components/ai-summary/BudgetAlerts";
import SavingsSuggestions from "../../components/ai-summary/SavingsSuggestions";
import AIChatSummary from "../../components/ai-summary/AIChatSummary";

import { getAISummary } from "../../services/aiService";

function AISummary() {
  const [loading, setLoading] = useState(true);

  const [summary, setSummary] = useState(null);

  const loadAISummary = async () => {
    try {
      setLoading(true);

      const response = await getAISummary();

      console.log(
        "AI Summary Response:",
        response.data
      );

      // Backend response:
      //
      // {
      //   success: true,
      //   message: "...",
      //   data: {
      //     financialScore: ...,
      //     totalIncome: ...,
      //     totalExpense: ...,
      //     savings: ...,
      //     prediction: {...},
      //     ...
      //   }
      // }

      setSummary(response.data.data);
    } catch (error) {
      console.error(
        "AI Summary Error:",
        error
      );

      toast.error(
        error?.response?.data?.message ||
          "Failed to load AI summary."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAISummary();
  }, []);

  if (loading) {
    return (
      <Loader text="Loading AI insights..." />
    );
  }

  if (!summary) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center">
        <p className="text-sm text-slate-500">
          No AI summary available.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-[1600px] space-y-6">

      {/* Page Header */}
      <PageHeader
        title="AI Financial Summary"
        subtitle="Understand your financial health with smart insights and recommendations."
      />

      {/* Main Summary */}
      <SummaryCard
        summary={summary}
      />

      {/* Financial Health */}
      <FinancialHealth
        summary={summary}
      />

      {/* Financial Prediction */}
      <PredictionCard
        summary={summary}
      />

      {/* Spending Insights */}
      <SpendingInsights
        summary={summary}
      />

      {/* Budget Alerts */}
      <BudgetAlerts
        summary={summary}
      />

      {/* Savings Suggestions */}
      <SavingsSuggestions
        summary={summary}
      />

      {/* AI Summary */}
      <AIChatSummary
        summary={summary}
      />

    </div>
  );
}

export default AISummary;