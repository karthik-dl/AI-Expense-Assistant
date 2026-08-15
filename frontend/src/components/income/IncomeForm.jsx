import { useEffect } from "react";
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
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      amount: "",
      category: "",
      date: "",
      notes: "",
      ...defaultValues,
    },
  });

  useEffect(() => {
    reset({
      title: "",
      amount: "",
      category: "",
      date:
        defaultValues?.income_date ||
        defaultValues?.date ||
        "",
      notes: "",
      ...defaultValues,
    });
  }, [defaultValues, reset]);

  const selectClass =
    "h-11 w-full rounded-xl border border-slate-300 bg-white px-4 text-sm text-slate-900 outline-none transition hover:border-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100";

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-3xl rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6 lg:p-8"
    >
      <div className="mb-6 border-b border-slate-100 pb-5">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
            <Wallet size={20} />
          </div>

          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              Income Details
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Enter the details of your income.
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <Input
            label="Income Title"
            placeholder="e.g. Monthly Salary"
            error={errors.title?.message}
            {...register("title", {
              required:
                "Title is required",
            })}
          />
        </div>

        <Input
          type="number"
          min="1"
          step="0.01"
          label="Amount"
          placeholder="50000"
          leftIcon={
            <IndianRupee size={18} />
          }
          error={errors.amount?.message}
          {...register("amount", {
            required:
              "Amount is required",
            min: {
              value: 1,
              message:
                "Amount must be greater than 0",
            },
          })}
        />

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

            <option value="Others">
              Others
            </option>
          </select>

          {errors.category && (
            <p className="mt-1.5 text-xs font-medium text-red-600">
              {errors.category.message}
            </p>
          )}
        </div>

        <Input
          type="date"
          label="Date"
          leftIcon={
            <CalendarDays size={18} />
          }
          error={errors.date?.message}
          {...register("date", {
            required:
              "Date is required",
          })}
        />

        <div className="sm:col-span-2">
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Notes
          </label>

          <textarea
            rows={4}
            placeholder="Additional details..."
            {...register("notes")}
            className="w-full resize-y rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
          />
        </div>
      </div>

      <div className="mt-6 flex flex-col-reverse gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:justify-end">
        <Button
          type="submit"
          loading={loading}
          className="w-full sm:w-auto"
        >
          Save Income
        </Button>
      </div>
    </form>
  );
}

export default IncomeForm;