import { useEffect, useState } from "react";
import {
  useNavigate,
  useParams,
} from "react-router-dom";
import toast from "react-hot-toast";

import PageHeader from "../../components/ui/PageHeader";
import Loader from "../../components/ui/Loader";
import BudgetForm from "../../components/budget/BudgetForm";

import * as budgetService from "../../services/budgetService";

function EditBudget() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [budget, setBudget] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const loadBudget = async () => {
      if (!id) {
        toast.error("Budget ID is missing.");
        navigate("/budgets");
        return;
      }

      try {
        setLoading(true);

        console.log("EDIT BUDGET ID:", id);

        const response =
          await budgetService.getBudget(id);

        console.log(
          "GET BUDGET RESPONSE:",
          response?.data
        );

        const data = response?.data;

        const budgetData =
          data?.budget ||
          data?.data?.budget ||
          data?.data ||
          data;

        console.log(
          "BUDGET DATA:",
          budgetData
        );

        if (!budgetData?.id) {
          throw new Error(
            "Budget not found."
          );
        }

        setBudget(budgetData);
      } catch (error) {
        console.error(
          "Load Budget Error:",
          error
        );

        console.error(
          "Server Response:",
          error?.response?.data
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

  const handleSubmit = async (values) => {
    if (!id) {
      toast.error("Budget ID is missing.");
      return;
    }

    try {
      setSaving(true);

      const formattedData = {
        category: values.category,
        amount: Number(values.amount),
        month: Number(values.month),
        year: Number(values.year),
      };

      console.log(
        "UPDATING BUDGET:",
        id,
        formattedData
      );

      const response =
        await budgetService.updateBudget(
          id,
          formattedData
        );

      console.log(
        "UPDATE RESPONSE:",
        response?.data
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

      console.error(
        "Server Response:",
        error?.response?.data
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
    <div className="w-full min-w-0">
      <div className="mx-auto w-full max-w-5xl space-y-6 sm:space-y-8">

        <PageHeader
          title="Edit Budget"
          subtitle="Update your budget details."
        />

        <div className="flex w-full justify-center">
          <BudgetForm
            initialValues={budget}
            onSubmit={handleSubmit}
            loading={saving}
          />
        </div>

      </div>
    </div>
  );
}

export default EditBudget;