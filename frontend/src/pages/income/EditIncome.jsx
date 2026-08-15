import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import PageHeader from "../../components/ui/PageHeader";
import Loader from "../../components/ui/Loader";
import IncomeForm from "../../components/income/IncomeForm";

import * as incomeService from "../../services/incomeService";

function EditIncome() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [income, setIncome] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const loadIncome = async () => {
      try {
        setLoading(true);

        const { data } =
          await incomeService.getIncome(id);

        const incomeData =
          data?.income ||
          data?.data?.income ||
          data;

        setIncome(incomeData);
      } catch (error) {
        console.error(
          "Load Income Error:",
          error
        );

        toast.error(
          error.response?.data?.message ||
            "Failed to load income."
        );

        navigate("/income");
      } finally {
        setLoading(false);
      }
    };

    loadIncome();
  }, [id, navigate]);

  const handleSubmit = async (values) => {
    try {
      setSaving(true);

      await incomeService.updateIncome(
        id,
        values
      );

      toast.success(
        "Income updated successfully."
      );

      navigate("/income");
    } catch (error) {
      console.error(
        "Update Income Error:",
        error
      );

      toast.error(
        error.response?.data?.message ||
          "Failed to update income."
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-75 items-center justify-center">
        <Loader text="Loading income..." />
      </div>
    );
  }

  if (!income) {
    return null;
  }

  return (
    <div className="w-full min-w-0 space-y-6 sm:space-y-8">
      <PageHeader
        title="Edit Income"
        subtitle="Update your income details."
      />

      <IncomeForm
        defaultValues={income}
        onSubmit={handleSubmit}
        loading={saving}
      />
    </div>
  );
}

export default EditIncome;