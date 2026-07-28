import { useCallback, useEffect, useState } from "react";

import Loader from "../../components/ui/Loader";
import PageHeader from "../../components/ui/PageHeader";

import SummaryCard from "../../components/ai-summary/SummaryCard";
import FinancialHealth from "../../components/ai-summary/FinancialHealth";
import SpendingInsights from "../../components/ai-summary/SpendingInsights";
import SavingsSuggestions from "../../components/ai-summary/SavingsSuggestions";
import BudgetAlerts from "../../components/ai-summary/BudgetAlerts";
import PredictionCard from "../../components/ai-summary/PredictionCard";
import AIChatSummary from "../../components/ai-summary/AIChatSummary";

import { getAISummary } from "../../services/aiService";

function AISummary() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [summary, setSummary] = useState({
    spendingInsights: [],
    savingsSuggestions: [],
    budgetAlerts: [],
    prediction: {},
  });

  const loadSummary = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const { data } = await getAISummary();

      setSummary(data);
    } catch (err) {
      console.error(err);
      setError("Unable to load AI summary. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadSummary();
  }, [loadSummary]);

  return (
    <div className="space-y-8">
      <PageHeader
        title="AI Financial Summary"
        subtitle="AI-powered insights into your finances."
      >
        <button
          onClick={loadSummary}
          disabled={loading}
          className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Refreshing..." : "Refresh"}
        </button>
      </PageHeader>

      {loading ? (
        <Loader />
      ) : error ? (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-center text-red-600">
          <p className="mb-4">{error}</p>

          <button
            onClick={loadSummary}
            className="rounded-xl bg-red-600 px-4 py-2 text-white transition hover:bg-red-700"
          >
            Try Again
          </button>
        </div>
      ) : (
        <>
          <SummaryCard summary={summary} />

          <div className="grid gap-6 xl:grid-cols-2">
            <FinancialHealth summary={summary} />
            <PredictionCard summary={summary} />
          </div>

          <SpendingInsights summary={summary} />

          <SavingsSuggestions summary={summary} />

          <BudgetAlerts summary={summary} />

          <AIChatSummary summary={summary} />
        </>
      )}
    </div>
  );
}

export default AISummary;