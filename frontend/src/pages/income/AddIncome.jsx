import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import PageHeader from "../../components/ui/PageHeader";
import IncomeForm from "../../components/income/IncomeForm";

import * as incomeService from "../../services/incomeService";

function AddIncome() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values) => {
    try {
      setLoading(true);

      await incomeService.createIncome(values);

      toast.success("Income added successfully.");

      navigate("/income");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to add income."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <PageHeader
        title="Add Income"
        subtitle="Record a new income source."
      />

      <IncomeForm
        onSubmit={handleSubmit}
        loading={loading}
      />
    </div>
  );
}

export default AddIncome;