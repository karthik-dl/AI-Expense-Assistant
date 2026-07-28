import { motion } from "framer-motion";

function PageHeader({
  title,
  subtitle,
  action,
  secondaryAction,
  children,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between"
    >
      {/* Left Section */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          {title}
        </h1>

        {subtitle && (
          <p className="mt-2 max-w-2xl text-sm text-slate-500">
            {subtitle}
          </p>
        )}
      </div>

      {/* Right Section */}
      <div className="flex flex-wrap items-center gap-3">
        {children}

        {secondaryAction}

        {action}
      </div>
    </motion.div>
  );
}

export default PageHeader;