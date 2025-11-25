import { useState } from "react";
import TransactionForm from "../components/TransactionForm";
import TransactionList from "../components/TransactionList";

export default function Transactions() {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleTransactionAdded = () => {
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Transaksi</h1>
        <p className="text-gray-500 mt-1">
          Kelola semua pemasukan dan pengeluaran
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <TransactionForm onTransactionAdded={handleTransactionAdded} />
        </div>

        <div className="lg:col-span-2">
          <TransactionList
            key={refreshKey}
            onTransactionDeleted={handleTransactionAdded}
          />
        </div>
      </div>
    </div>
  );
}
