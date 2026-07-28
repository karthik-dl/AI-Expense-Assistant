import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import Loader from "../../components/ui/Loader";
import PageHeader from "../../components/ui/PageHeader";
import ExpenseForm from "../../components/expense/ExpenseForm";

import * as expenseService from "../../services/expenseService";

function EditExpense() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const [expense, setExpense] = useState(null);

  useEffect(() => {
    fetchExpense();
  }, []);

  const fetchExpense = async () => {
    try {
      setLoading(true);

      const { data } = await expenseService.getExpense(id);

      setExpense(data.expense || data);
    } catch (error) {
      toast.error("Expense not found.");

      navigate("/expenses");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (values) => {
    await expenseService.updateExpense(id, values);

    toast.success("Expense updated successfully!");

    navigate("/expenses");
  };

  if (loading) {
    return <Loader text="Loading expense..." />;
  }

  return (
    <div className="space-y-8">
      <PageHeader
        title="Edit Expense"
        subtitle="Update your expense details."
      />

      <ExpenseForm
        initialValues={expense}
        onSubmit={handleUpdate}
        submitText="Update Expense"
      />
    </div>
  );
}

export default EditExpense;