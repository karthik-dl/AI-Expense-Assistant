import { useEffect, useState } from "react";

import {
  getAISummary,
  getFinancialHealth,
  getRecommendations,
  getSpendingPrediction,
} from "../../services/aiSummaryService";

import AIInsightCard from "../../components/ai-summary/AIInsightCard";
import FinancialHealthCard from "../../components/ai-summary/FinancialHealthCard";
import RecommendationCard from "../../components/ai-summary/RecommendationCard";
import SpendingPrediction from "../../components/ai-summary/SpendingPrediction";

const AISummary = () => {
  const [loading, setLoading] = useState(false);

  const [insights, setInsights] = useState([]);
  const [health, setHealth] = useState({});
  const [recommendations, setRecommendations] = useState([]);
  const [prediction, setPrediction] = useState({});

  useEffect(() => {
    fetchAISummary();
  }, []);

  const fetchAISummary = async () => {
    try {
      setLoading(true);

      const [
        insightsRes,
        healthRes,
        recommendationsRes,
        predictionRes,
      ] = await Promise.all([
        getAISummary(),
        getFinancialHealth(),
        getRecommendations(),
        getSpendingPrediction(),
      ]);

      setInsights(insightsRes.insights || insightsRes || []);
      setHealth(healthRes || {});
      setRecommendations(
        recommendationsRes.recommendations ||
        recommendationsRes ||
        []
      );
      setPrediction(predictionRes || {});
    } catch (error) {
      console.error("Failed to load AI Summary", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="text-lg font-semibold">
          Loading AI Summary...
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">

      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">
          AI Financial Assistant
        </h1>
      </div>

      <FinancialHealthCard
        health={health}
      />

      <SpendingPrediction
        prediction={prediction}
      />

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

        <AIInsightCard
          insights={insights}
        />

        <RecommendationCard
          recommendations={recommendations}
        />

      </div>

    </div>
  );
};

export default AISummary;