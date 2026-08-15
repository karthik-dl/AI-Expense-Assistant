import { useEffect, useState } from "react";
import {
  useNavigate,
  useParams,
} from "react-router-dom";
import toast from "react-hot-toast";

import PageHeader from "../../components/ui/PageHeader";
import Loader from "../../components/ui/Loader";
import BudgetForm from "../../components/budget/BudgetForm";

import {
  getBudget,
  updateBudget,
} from "../../services/budgetService";

function EditBudget() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [budget, setBudget] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  useEffect(() => {
    const loadBudget = async () => {
      try {
        setLoading(true);

        const { data } =
          await getBudget(id);

        const budgetData =
          data?.budget ||
          data?.data?.budget ||
          data;

        setBudget(budgetData);
      } catch (error) {
        console.error(
          "Load Budget Error:",
          error
        );

        toast.error(
          error?.response?.data?.message ||
            "Failed to load budget."
        );

        navigate("/budgets");
      } finally {
        setLoading(false);
      }
    };

    loadBudget();
  }, [id, navigate]);

  const handleSubmit = async (
    formData
  ) => {
    try {
      setSaving(true);

      await updateBudget(
        id,
        formData
      );

      toast.success(
        "Budget updated successfully."
      );

      navigate("/budgets");
    } catch (error) {
      console.error(
        "Update Budget Error:",
        error
      );

      toast.error(
        error?.response?.data?.message ||
          "Failed to update budget."
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-75 items-center justify-center">
        <Loader text="Loading budget..." />
      </div>
    );
  }

  if (!budget) {
    return null;
  }

  return (
    <div className="w-full min-w-0 space-y-6 sm:space-y-8">
      <PageHeader
        title="Edit Budget"
        subtitle="Update your monthly budget."
      />

      <BudgetForm
        initialValues={budget}
        onSubmit={handleSubmit}
        loading={saving}
      />
    </div>
  );
}

export default EditBudget;