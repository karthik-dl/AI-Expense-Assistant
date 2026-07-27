function Input({
  label,
  type = "text",
  placeholder,
  register,
  name,
  errors,
}) {
  return (
    <div className="mb-5">
      <label className="block text-sm font-medium text-slate-700 mb-2">
        {label}
      </label>

      <input
        type={type}
        placeholder={placeholder}
        {...register(name)}
        className={`w-full rounded-lg border px-4 py-3 outline-none transition
        ${
          errors?.[name]
            ? "border-red-500 focus:ring-2 focus:ring-red-300"
            : "border-slate-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-200"
        }`}
      />

      {errors?.[name] && (
        <p className="mt-1 text-sm text-red-500">
          {errors[name].message}
        </p>
      )}
    </div>
  );
}

export default Input;