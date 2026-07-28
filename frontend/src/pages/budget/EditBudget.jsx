import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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

  const [budget, setBudget] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadBudget();
  }, []);

  const loadBudget = async () => {
    try {
      setLoading(true);

      const { data } = await getBudget(id);

      setBudget(data.budget || data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load budget.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (formData) => {
    try {
      setSaving(true);

      await updateBudget(id, formData);

      toast.success("Budget updated successfully.");

      navigate("/budgets");
    } catch (error) {
      console.error(error);

      toast.error(
        error?.response?.data?.message ||
          "Failed to update budget."
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="space-y-8">
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