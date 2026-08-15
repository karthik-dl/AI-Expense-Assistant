import { useEffect, useState } from "react";
import {
  useNavigate,
  useParams,
} from "react-router-dom";
import toast from "react-hot-toast";

import Loader from "../../components/ui/Loader";
import PageHeader from "../../components/ui/PageHeader";
import ExpenseForm from "../../components/expense/ExpenseForm";

import * as expenseService from "../../services/expenseService";

function EditExpense() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] =
    useState(true);

  const [expense, setExpense] =
    useState(null);

  useEffect(() => {
    const fetchExpense = async () => {
      try {
        setLoading(true);

        const { data } =
          await expenseService.getExpense(id);

        const expenseData =
          data?.expense ||
          data?.data?.expense ||
          data;

        setExpense(expenseData);
      } catch (error) {
        console.error(
          "Load Expense Error:",
          error
        );

        toast.error(
          error?.response?.data?.message ||
            "Expense not found."
        );

        navigate("/expenses");
      } finally {
        setLoading(false);
      }
    };

    fetchExpense();
  }, [id, navigate]);

  const handleUpdate = async (values) => {
    try {
      await expenseService.updateExpense(
        id,
        values
      );

      toast.success(
        "Expense updated successfully!"
      );

      navigate("/expenses");
    } catch (error) {
      throw error;
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-75 items-center justify-center">
        <Loader text="Loading expense..." />
      </div>
    );
  }

  if (!expense) {
    return null;
  }

  return (
    <div className="w-full min-w-0 space-y-6 sm:space-y-8">
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