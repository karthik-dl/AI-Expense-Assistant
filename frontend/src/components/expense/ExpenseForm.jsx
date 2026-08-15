import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Calendar,
  IndianRupee,
  Receipt,
} from "lucide-react";
import toast from "react-hot-toast";

import Input from "../ui/Input";
import Button from "../ui/Button";

function ExpenseForm({
  initialValues = {},
  onSubmit,
  submitText = "Save Expense",
}) {
  const [loading, setLoading] =
    useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title:
        initialValues?.title || "",

      amount:
        initialValues?.amount || "",

      category:
        initialValues?.category || "",

      date:
        initialValues?.date?.split("T")[0] ||
        new Date()
          .toISOString()
          .split("T")[0],

      notes:
        initialValues?.notes || "",
    },
  });

  const submitHandler = async (data) => {
    try {
      setLoading(true);

      await onSubmit(data);

      toast.success(
        "Expense saved successfully."
      );
    } catch (error) {
      console.error(
        "Save Expense Error:",
        error
      );

      toast.error(
        error?.response?.data?.message ||
          "Unable to save expense."
      );
    } finally {
      setLoading(false);
    }
  };

  const selectClass =
    "h-11 w-full rounded-xl border border-slate-300 bg-white px-4 text-sm text-slate-900 outline-none transition-colors duration-200 hover:border-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100";

  const textareaClass =
    "w-full resize-y rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition-colors duration-200 placeholder:text-slate-400 hover:border-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100";

  return (
    <form
      onSubmit={handleSubmit(
        submitHandler
      )}
      className="w-full max-w-3xl rounded-2xl border border-slate-200 bg-white shadow-sm"
    >
      {/* Form Header */}
      <div className="border-b border-slate-100 px-5 py-5 sm:px-6 sm:py-6 lg:px-8">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
            <Receipt size={20} />
          </div>

          <div className="min-w-0">
            <h2 className="text-lg font-semibold text-slate-900">
              Expense Details
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Enter the details of your
              expense.
            </p>
          </div>
        </div>
      </div>

      {/* Form Body */}
      <div className="px-5 py-6 sm:px-6 lg:px-8">
        <div className="grid gap-5 sm:grid-cols-2">
          {/* Title */}
          <div className="sm:col-span-2">
            <Input
              label="Expense Title"
              type="text"
              placeholder="e.g. Grocery shopping"
              leftIcon={
                <Receipt size={18} />
              }
              error={
                errors.title?.message
              }
              {...register("title", {
                required:
                  "Title is required",
              })}
            />
          </div>

          {/* Amount */}
          <Input
            label="Amount"
            type="number"
            min="1"
            step="0.01"
            placeholder="0.00"
            leftIcon={
              <IndianRupee size={18} />
            }
            error={
              errors.amount?.message
            }
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

          {/* Category */}
          <div>
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

              <option value="Food">
                Food
              </option>

              <option value="Travel">
                Travel
              </option>

              <option value="Shopping">
                Shopping
              </option>

              <option value="Bills">
                Bills
              </option>

              <option value="Healthcare">
                Healthcare
              </option>

              <option value="Education">
                Education
              </option>

              <option value="Entertainment">
                Entertainment
              </option>

              <option value="Fuel">
                Fuel
              </option>

              <option value="Rent">
                Rent
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

          {/* Date */}
          <Input
            label="Expense Date"
            type="date"
            leftIcon={
              <Calendar size={18} />
            }
            error={
              errors.date?.message
            }
            {...register("date", {
              required:
                "Date is required",
            })}
          />

          {/* Notes */}
          <div className="sm:col-span-2">
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Notes
            </label>

            <textarea
              rows={4}
              placeholder="Add any additional notes..."
              className={textareaClass}
              {...register("notes")}
            />
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex flex-col-reverse gap-3 border-t border-slate-100 px-5 py-5 sm:flex-row sm:justify-end sm:px-6 lg:px-8">
        <Button
          type="submit"
          loading={loading}
          className="w-full sm:w-auto"
        >
          {submitText}
        </Button>
      </div>
    </form>
  );
}

export default ExpenseForm;