import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import PageHeader from "../../components/ui/PageHeader";
import BudgetForm from "../../components/budget/BudgetForm";

import { createBudget } from "../../services/budgetService";

function AddBudget() {
  const navigate = useNavigate();

  const [loading, setLoading] =
    useState(false);

  const handleSubmit = async (
    formData
  ) => {
    try {
      setLoading(true);

      await createBudget(formData);

      toast.success(
        "Budget created successfully."
      );

      navigate("/budgets");
    } catch (error) {
      console.error(
        "Create Budget Error:",
        error
      );

      toast.error(
        error?.response?.data?.message ||
          "Failed to create budget."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-w-0 space-y-6 sm:space-y-8">
      <PageHeader
        title="Add Budget"
        subtitle="Create a new monthly budget."
      />

      <BudgetForm
        onSubmit={handleSubmit}
        loading={loading}
      />
    </div>
  );
}

export default AddBudget;