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
  { value: 1, label: "January" },
  { value: 2, label: "February" },
  { value: 3, label: "March" },
  { value: 4, label: "April" },
  { value: 5, label: "May" },
  { value: 6, label: "June" },
  { value: 7, label: "July" },
  { value: 8, label: "August" },
  { value: 9, label: "September" },
  { value: 10, label: "October" },
  { value: 11, label: "November" },
  { value: 12, label: "December" },
];

function BudgetForm({
  initialValues = {},
  onSubmit,
  loading = false,
}) {
  const currentYear =
    new Date().getFullYear();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      category:
        initialValues.category || "",

      amount:
        initialValues.amount || "",

      month:
        initialValues.month
          ? String(initialValues.month)
          : String(
              new Date().getMonth() + 1
            ),

      year:
        initialValues.year
          ? String(initialValues.year)
          : String(currentYear),
    },
  });

  useEffect(() => {
    reset({
      category:
        initialValues.category || "",

      amount:
        initialValues.amount || "",

      month:
        initialValues.month
          ? String(initialValues.month)
          : String(
              new Date().getMonth() + 1
            ),

      year:
        initialValues.year
          ? String(initialValues.year)
          : String(currentYear),
    });
  }, [
    initialValues,
    reset,
    currentYear,
  ]);

  const handleFormSubmit = async (
    data
  ) => {
    const formData = {
      category: data.category,
      amount: Number(data.amount),
      month: Number(data.month),
      year: Number(data.year),
    };

    await onSubmit(formData);
  };

  const selectClass =
    "h-11 w-full rounded-xl border border-slate-300 bg-white px-4 text-sm text-slate-900 outline-none transition hover:border-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100";

  return (
    <form
      onSubmit={handleSubmit(
        handleFormSubmit
      )}
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
            <span className="ml-1 text-red-500">
              *
            </span>
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
          required
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
            <span className="ml-1 text-red-500">
              *
            </span>
          </label>

          <select
            {...register("month", {
              required:
                "Month is required",
            })}
            className={selectClass}
          >
            {months.map((month) => (
              <option
                key={month.value}
                value={month.value}
              >
                {month.label}
              </option>
            ))}
          </select>

          {errors.month && (
            <p className="mt-1.5 text-xs font-medium text-red-600">
              {errors.month.message}
            </p>
          )}
        </div>

        {/* Year */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Year
            <span className="ml-1 text-red-500">
              *
            </span>
          </label>

          <select
            {...register("year", {
              required:
                "Year is required",
            })}
            className={selectClass}
          >
            <option
              value={currentYear - 1}
            >
              {currentYear - 1}
            </option>

            <option
              value={currentYear}
            >
              {currentYear}
            </option>

            <option
              value={currentYear + 1}
            >
              {currentYear + 1}
            </option>

            <option
              value={currentYear + 2}
            >
              {currentYear + 2}
            </option>
          </select>

          {errors.year && (
            <p className="mt-1.5 text-xs font-medium text-red-600">
              {errors.year.message}
            </p>
          )}
        </div>
      </div>

      {/* Submit */}
      <div className="mt-6 flex flex-col-reverse gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:justify-end">
        <Button
          type="submit"
          loading={loading}
          disabled={loading}
          className="w-full sm:w-auto"
        >
          Save Budget
        </Button>
      </div>
    </form>
  );
}

export default BudgetForm;