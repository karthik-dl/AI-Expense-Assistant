import {
  PiggyBank,
  Lightbulb,
  Wallet,
  BadgeDollarSign,
} from "lucide-react";

import Card from "../ui/Card";

function SavingsSuggestions({ summary }) {
  const suggestions =
    summary?.savingsSuggestions || [];

  const getIcon = (type) => {
    switch (type) {
      case "saving":
        return (
          <PiggyBank
            size={22}
            className="text-green-600"
          />
        );

      case "budget":
        return (
          <Wallet
            size={22}
            className="text-blue-600"
          />
        );

      case "investment":
        return (
          <BadgeDollarSign
            size={22}
            className="text-purple-600"
          />
        );

      default:
        return (
          <Lightbulb
            size={22}
            className="text-yellow-500"
          />
        );
    }
  };

  return (
    <Card>
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-slate-800">
          AI Savings Suggestions
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Personalized recommendations to improve
          your savings.
        </p>
      </div>

      {suggestions.length === 0 ? (
        <div className="rounded-2xl bg-slate-50 p-8 text-center text-slate-500">
          No savings suggestions available.
        </div>
      ) : (
        <div className="space-y-4">
          {suggestions.map((item, index) => (
            <div
              key={`${item.type}-${index}`}
              className="flex items-start gap-4 rounded-2xl border border-slate-200 p-4 transition hover:shadow-md"
            >
              <div className="shrink-0 rounded-xl bg-slate-100 p-3">
                {getIcon(item.type)}
              </div>

              <div className="min-w-0 flex-1">
                <h3 className="font-semibold text-slate-800">
                  {item.title}
                </h3>

                <p className="mt-1 text-sm leading-6 text-slate-600">
                  {item.description}
                </p>

                {Number(item.potentialSaving || 0) > 0 && (
                  <div className="mt-3 inline-flex rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
                    Potential Saving: ₹
                    {Number(
                      item.potentialSaving
                    ).toLocaleString("en-IN")}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}

export default SavingsSuggestions;