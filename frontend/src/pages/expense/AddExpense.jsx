import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import PageHeader from "../../components/ui/PageHeader";
import ExpenseForm from "../../components/expense/ExpenseForm";

import * as expenseService from "../../services/expenseService";

function AddExpense() {
  const navigate = useNavigate();

  const handleCreate = async (expense) => {
    await expenseService.createExpense(expense);

    toast.success("Expense added successfully!");

    navigate("/expenses");
  };

  return (
    <div className="space-y-8">
      <PageHeader
        title="Add Expense"
        subtitle="Record a new expense."
      />

      <ExpenseForm
        onSubmit={handleCreate}
        submitText="Add Expense"
      />
    </div>
  );
}

export default AddExpense;