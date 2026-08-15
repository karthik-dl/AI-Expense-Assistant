import { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  Wallet,
  IndianRupee,
} from "lucide-react";

import Input from "../ui/Input";
import Button from "../ui/Button";

const categories = [
  "Food",
  "Transport",
  "Shopping",
  "Entertainment",
  "Bills",
  "Healthcare",
  "Education",
  "Travel",
  "Investment",
  "Others",
];

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function BudgetForm({
  initialValues = {},
  onSubmit,
  loading = false,
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      category: "",
      amount: "",
      month: "",
      notes: "",
      ...initialValues,
    },
  });

  useEffect(() => {
    reset({
      category: "",
      amount: "",
      month: "",
      notes: "",
      ...initialValues,
    });
  }, [initialValues, reset]);

  const selectClass =
    "h-11 w-full rounded-xl border border-slate-300 bg-white px-4 text-sm text-slate-900 outline-none transition hover:border-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100";

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-3xl rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6 lg:p-8"
    >
      {/* Header */}
      <div className="mb-6 border-b border-slate-100 pb-5">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
            <Wallet size={20} />
          </div>

          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              Budget Details
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Set a monthly spending limit.
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        {/* Category */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Category
          </label>

          <select
            {...register("category", {
              required:
                "Category is required",
            })}
            className={selectClass}
          >
            <option value="">
              Select Category
            </option>

            {categories.map(
              (category) => (
                <option
                  key={category}
                  value={category}
                >
                  {category}
                </option>
              )
            )}
          </select>

          {errors.category && (
            <p className="mt-1.5 text-xs font-medium text-red-600">
              {errors.category.message}
            </p>
          )}
        </div>

        {/* Amount */}
        <Input
          label="Budget Amount"
          type="number"
          min="1"
          step="0.01"
          placeholder="Enter amount"
          leftIcon={
            <IndianRupee size={17} />
          }
          error={
            errors.amount?.message
          }
          {...register("amount", {
            required:
              "Budget amount is required",
            min: {
              value: 1,
              message:
                "Amount must be greater than 0",
            },
          })}
        />

        {/* Month */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Month
          </label>

          <select
            {...register("month", {
              required:
                "Month is required",
            })}
            className={selectClass}
          >
            <option value="">
              Select Month
            </option>

            {months.map((month) => (
              <option
                key={month}
                value={month}
              >
                {month}
              </option>
            ))}
          </select>

          {errors.month && (
            <p className="mt-1.5 text-xs font-medium text-red-600">
              {errors.month.message}
            </p>
          )}
        </div>

        {/* Notes */}
        <div className="sm:col-span-2">
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Notes
          </label>

          <textarea
            rows={4}
            placeholder="Optional notes..."
            {...register("notes")}
            className="w-full resize-y rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
          />
        </div>
      </div>

      {/* Submit */}
      <div className="mt-6 flex flex-col-reverse gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:justify-end">
        <Button
          type="submit"
          loading={loading}
          className="w-full sm:w-auto"
        >
          Save Budget
        </Button>
      </div>
    </form>
  );
}

export default BudgetForm;