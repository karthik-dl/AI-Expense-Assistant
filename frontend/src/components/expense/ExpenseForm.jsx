import { useState } from "react";
import { useForm } from "react-hook-form";
import { Calendar, IndianRupee, Receipt, FileText } from "lucide-react";
import toast from "react-hot-toast";

import Input from "../ui/Input";
import Button from "../ui/Button";

function ExpenseForm({
  initialValues = {},
  onSubmit,
  submitText = "Save Expense",
}) {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: initialValues.title || "",
      amount: initialValues.amount || "",
      category: initialValues.category || "",
      date:
        initialValues.date?.split("T")[0] ||
        new Date().toISOString().split("T")[0],
      notes: initialValues.notes || "",
    },
  });

  const submitHandler = async (data) => {
    try {
      setLoading(true);

      await onSubmit(data);

      toast.success("Expense saved successfully.");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Unable to save expense."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(submitHandler)}
      className="space-y-6 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm"
    >
      <Input
        label="Expense Title"
        placeholder="Enter expense title"
        leftIcon={<Receipt size={18} />}
        error={errors.title?.message}
        {...register("title", {
          required: "Title is required",
        })}
      />

      <Input
        label="Amount"
        type="number"
        placeholder="0"
        leftIcon={<IndianRupee size={18} />}
        error={errors.amount?.message}
        {...register("amount", {
          required: "Amount is required",
          min: {
            value: 1,
            message: "Amount must be greater than 0",
          },
        })}
      />

      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">
          Category
        </label>

        <select
          className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          {...register("category", {
            required: "Category is required",
          })}
        >
          <option value="">Select Category</option>
          <option value="Food">Food</option>
          <option value="Travel">Travel</option>
          <option value="Shopping">Shopping</option>
          <option value="Bills">Bills</option>
          <option value="Healthcare">Healthcare</option>
          <option value="Education">Education</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Fuel">Fuel</option>
          <option value="Rent">Rent</option>
          <option value="Others">Others</option>
        </select>

        {errors.category && (
          <p className="mt-1 text-sm text-red-600">
            {errors.category.message}
          </p>
        )}
      </div>

      <Input
        label="Expense Date"
        type="date"
        leftIcon={<Calendar size={18} />}
        error={errors.date?.message}
        {...register("date", {
          required: "Date is required",
        })}
      />

      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">
          Notes
        </label>

        <textarea
          rows={4}
          placeholder="Additional notes..."
          className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          {...register("notes")}
        />
      </div>

      <div className="flex justify-end">
        <Button
          type="submit"
          loading={loading}
        >
          {submitText}
        </Button>
      </div>
    </form>
  );
}

export default ExpenseForm;