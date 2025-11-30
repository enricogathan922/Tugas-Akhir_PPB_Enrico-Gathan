import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../lib/api";

export default function TransactionHistory() {
  const [allTransactions, setAllTransactions] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState("");
  const [groupFilter, setGroupFilter] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const res = await API.get("/transactions");
      const list = res.data?.data || [];
      setAllTransactions(list);
      setTransactions(list);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...allTransactions];

    if (categoryFilter) {
      filtered = filtered.filter((t) => t.category === categoryFilter);
    }

    if (groupFilter) {
      filtered = filtered.filter((t) =>
        t.group.toLowerCase().includes(groupFilter.toLowerCase())
      );
    }

    setTransactions(filtered);
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [categoryFilter, groupFilter, allTransactions]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Riwayat Transaksi</h1>
        <p className="text-gray-500 mt-1">
          Lihat semua pengeluaran & pemasukan Anda
        </p>
      </div>

      {/* Filter Section */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <select
          className="border rounded-lg px-3 py-2"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <option value="">Semua Kategori</option>
          <option value="INCOME">Income</option>
          <option value="OUTCOME">Outcome</option>
        </select>

        <input
          type="text"
          placeholder="Filter Group (ex: Makanan)"
          className="border rounded-lg px-3 py-2"
          value={groupFilter}
          onChange={(e) => setGroupFilter(e.target.value)}
        />

        <button
          onClick={() => {
            setCategoryFilter("");
            setGroupFilter("");
          }}
          className="bg-gray-700 text-white rounded-lg px-4 py-2"
        >
          Reset
        </button>
      </div>

      {/* Loading Indicator */}
      {loading && (
        <div className="text-center py-6">
          <div className="animate-spin h-8 w-8 border-4 border-gray-400 border-t-transparent rounded-full mx-auto"></div>
          <p className="text-gray-500 mt-2">Loading transaksi...</p>
        </div>
      )}

      {/* Transaction List */}
      {!loading && (
        <div className="bg-white shadow rounded-lg p-4">
          {transactions.length === 0 ? (
            <p className="text-gray-500 text-center py-4">
              Tidak ada transaksi ditemukan
            </p>
          ) : (
            <ul className="divide-y divide-gray-200">
              {transactions.map((t) => (
                <li
                  key={t.id}
                  className="py-4 flex justify-between items-center gap-4"
                >
                  {/* Left Section */}
                  <div>
                    <p className="text-lg font-semibold">{t.description}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(t.date).toLocaleDateString()}
                    </p>
                    <p className="text-sm text-gray-600">Group: {t.group}</p>
                  </div>

                  {/* Right Section */}
                  <div className="text-right">
                    <p
                      className={
                        t.category === "INCOME"
                          ? "text-green-600 font-bold"
                          : "text-red-600 font-bold"
                      }
                    >
                      {t.category === "INCOME" ? "+" : "-"} Rp{" "}
                      {t.amount.toLocaleString()}
                    </p>
                    <p className="text-xs text-gray-500">{t.category}</p>

                    {/* Detail Button */}
                    <Link
                      to={`/transactions/${t.id}`}
                      className="inline-block mt-2 text-sm text-blue-600 hover:underline"
                    >
                      Lihat Detail →
                    </Link>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
