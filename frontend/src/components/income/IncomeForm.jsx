import { useForm } from "react-hook-form";
import {
  IndianRupee,
  CalendarDays,
  Wallet,
} from "lucide-react";

import Input from "../ui/Input";
import Button from "../ui/Button";

function IncomeForm({
  defaultValues = {},
  onSubmit,
  loading = false,
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      source: defaultValues?.source || "",
      amount: defaultValues?.amount || "",
      category: defaultValues?.category || "",
      income_date:
        defaultValues?.income_date ||
        defaultValues?.date ||
        "",
      notes: defaultValues?.notes || "",
    },
  });

  const handleFormSubmit = async (data) => {
    const payload = {
      source: data.source?.trim() || "",
      category: data.category || "",
      amount: Number(data.amount),
      income_date: data.income_date || "",
      notes: data.notes?.trim() || "",
    };

    await onSubmit(payload);
  };

  const selectClass =
    "h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-700 outline-none transition-colors duration-200 hover:border-slate-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-100";

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="w-full max-w-3xl rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6 lg:p-8"
    >
      {/* Header */}
      <div className="mb-6 border-b border-slate-100 pb-5">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
            <Wallet size={20} />
          </div>

          <div className="min-w-0">
            <h2 className="text-lg font-semibold text-slate-900">
              Income Details
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Enter the details of your income.
            </p>
          </div>
        </div>
      </div>

      {/* Fields */}
      <div className="grid min-w-0 gap-5 sm:grid-cols-2">

        {/* Source */}
        <div className="sm:col-span-2">
          <Input
            label="Income Source"
            type="text"
            placeholder="e.g. Monthly Salary"
            error={errors.source?.message}
            {...register("source", {
              required:
                "Income source is required",
            })}
          />
        </div>

        {/* Amount */}
        <Input
          label="Amount"
          type="number"
          min="0"
          step="0.01"
          placeholder="50000"
          leftIcon={
            <IndianRupee size={18} />
          }
          error={errors.amount?.message}
          {...register("amount", {
            required:
              "Amount is required",
            min: {
              value: 0.01,
              message:
                "Amount must be greater than 0",
            },
            valueAsNumber: true,
          })}
        />

        {/* Category */}
        <div className="min-w-0">
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Category
          </label>

          <select
            className={selectClass}
            {...register("category", {
              required:
                "Category is required",
            })}
          >
            <option value="">
              Select Category
            </option>

            <option value="Salary">
              Salary
            </option>

            <option value="Freelancing">
              Freelancing
            </option>

            <option value="Business">
              Business
            </option>

            <option value="Investment">
              Investment
            </option>

            <option value="Bonus">
              Bonus
            </option>

            <option value="Rental">
              Rental
            </option>

            <option value="Interest">
              Interest
            </option>

            <option value="Gift">
              Gift
            </option>

            <option value="Other">
              Other
            </option>
          </select>

          {errors.category && (
            <p className="mt-1.5 text-xs font-medium text-red-600">
              {errors.category.message}
            </p>
          )}
        </div>

        {/* Income Date */}
        <Input
          label="Income Date"
          type="date"
          leftIcon={
            <CalendarDays size={18} />
          }
          error={errors.income_date?.message}
          {...register("income_date", {
            required:
              "Income date is required",
          })}
        />

        {/* Notes */}
        <div className="min-w-0 sm:col-span-2">
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Notes
          </label>

          <textarea
            rows={4}
            placeholder="Additional details..."
            className="w-full resize-y rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition-colors duration-200 placeholder:text-slate-400 hover:border-slate-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            {...register("notes")}
          />
        </div>
      </div>

      {/* Submit */}
      <div className="mt-6 flex flex-col gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:justify-end">
        <Button
          type="submit"
          loading={loading}
          disabled={loading}
          className="w-full sm:w-auto"
        >
          Save Income
        </Button>
      </div>
    </form>
  );
}

export default IncomeForm;