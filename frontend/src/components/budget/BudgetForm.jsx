import { useEffect } from "react";
import { useForm } from "react-hook-form";

import Card from "../ui/Card";
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

  return (
    <Card className="max-w-3xl mx-auto">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6"
      >
        {/* Category */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Category
          </label>

          <select
            {...register("category", {
              required: "Category is required",
            })}
            className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:border-blue-500 focus:outline-none"
          >
            <option value="">
              Select Category
            </option>

            {categories.map((category) => (
              <option
                key={category}
                value={category}
              >
                {category}
              </option>
            ))}
          </select>

          {errors.category && (
            <p className="mt-1 text-sm text-red-500">
              {errors.category.message}
            </p>
          )}
        </div>

        {/* Budget Amount */}
        <Input
          label="Budget Amount"
          type="number"
          placeholder="Enter budget amount"
          {...register("amount", {
            required: "Budget amount is required",
            min: {
              value: 1,
              message:
                "Amount must be greater than 0",
            },
          })}
          error={errors.amount?.message}
        />

        {/* Month */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Month
          </label>

          <select
            {...register("month", {
              required: "Month is required",
            })}
            className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:border-blue-500 focus:outline-none"
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
            <p className="mt-1 text-sm text-red-500">
              {errors.month.message}
            </p>
          )}
        </div>

        {/* Notes */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Notes
          </label>

          <textarea
            rows={4}
            placeholder="Optional notes..."
            {...register("notes")}
            className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:border-blue-500 focus:outline-none"
          />
        </div>

        {/* Submit */}
        <div className="flex justify-end">
          <Button
            type="submit"
            disabled={loading}
          >
            {loading
              ? "Saving..."
              : "Save Budget"}
          </Button>
        </div>
      </form>
    </Card>
  );
}

export default BudgetForm;