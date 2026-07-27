import { useState } from "react";
import IncomeTable from "../../components/income/IncomeTable";
import IncomeModal from "../../components/income/IncomeModal";
import IncomeFilters from "../../components/income/IncomeFilters";

const Income = () => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedIncome, setSelectedIncome] = useState(null);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Income</h1>

        <button
          onClick={() => {
            setSelectedIncome(null);
            setOpenModal(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          Add Income
        </button>
      </div>

      <IncomeFilters />

      <IncomeTable
        onEdit={(income) => {
          setSelectedIncome(income);
          setOpenModal(true);
        }}
      />

      <IncomeModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        income={selectedIncome}
      />
    </div>
  );
};

export default Income;