import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import PageHeader from "../../components/ui/PageHeader";
import BudgetForm from "../../components/budget/BudgetForm";

import * as budgetService from "../../services/budgetService";

function AddBudget() {
  const navigate = useNavigate();

  const [loading, setLoading] =
    useState(false);

  const handleSubmit = async (values) => {
    try {
      setLoading(true);

      await budgetService.createBudget(values);

      toast.success(
        "Budget added successfully."
      );

      // Go to budget list after successful creation
      navigate("/budgets");
    } catch (error) {
      console.error(
        "Add Budget Error:",
        error
      );

      toast.error(
        error?.response?.data?.message ||
          "Failed to add budget."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-w-0">
      <div className="mx-auto w-full max-w-5xl space-y-6 sm:space-y-8">

        <PageHeader
          title="Add Budget"
          subtitle="Create a monthly spending budget."
        />

        <div className="flex w-full justify-center">
          <BudgetForm
            onSubmit={handleSubmit}
            loading={loading}
          />
        </div>

      </div>
    </div>
  );
}

export default AddBudget;