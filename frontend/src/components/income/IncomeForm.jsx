import { useEffect } from "react";
import { useForm } from "react-hook-form";

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
      date: "",
      notes: "",
      ...defaultValues,
    });
  }, [defaultValues, reset]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 rounded-3xl bg-white p-8 shadow-sm"
    >
      <div className="grid gap-6 md:grid-cols-2">
        <Input
          label="Title"
          placeholder="Salary"
          error={errors.title?.message}
          {...register("title", {
            required: "Title is required",
          })}
        />

        <Input
          type="number"
          label="Amount"
          placeholder="50000"
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
            {...register("category", {
              required: "Category is required",
            })}
            className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:border-blue-500 focus:outline-none"
          >
            <option value="">Select Category</option>
            <option value="Salary">Salary</option>
            <option value="Freelancing">Freelancing</option>
            <option value="Business">Business</option>
            <option value="Investment">Investment</option>
            <option value="Bonus">Bonus</option>
            <option value="Rental">Rental</option>
            <option value="Interest">Interest</option>
            <option value="Gift">Gift</option>
            <option value="Others">Others</option>
          </select>

          {errors.category && (
            <p className="mt-1 text-sm text-red-500">
              {errors.category.message}
            </p>
          )}
        </div>

        <Input
          type="date"
          label="Date"
          error={errors.date?.message}
          {...register("date", {
            required: "Date is required",
          })}
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">
          Notes
        </label>

        <textarea
          rows={4}
          placeholder="Additional details..."
          {...register("notes")}
          className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:border-blue-500 focus:outline-none"
        />
      </div>

      <div className="flex justify-end">
        <Button
          type="submit"
          loading={loading}
        >
          Save Income
        </Button>
      </div>
    </form>
  );
}

export default IncomeForm;