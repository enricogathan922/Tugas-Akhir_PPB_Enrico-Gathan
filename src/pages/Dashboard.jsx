import { useState, useEffect } from "react";
import API from "../lib/api";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [data, setData] = useState([]);
  const [timeRange, setTimeRange] = useState("all");
  const navigate = useNavigate();

  useEffect(() => {
    loadTransactions();
  }, []);

  const loadTransactions = async () => {
    try {
      const res = await API.get("/transactions");

      const mapped = res.data.data.map((item) => ({
        id: item.id,
        description: item.description,
        amount: item.amount,
        type: item.category === "INCOME" ? "income" : "expense",
        category: item.group,
        date: item.date.split("T")[0],
      }));

      setData(mapped);
    } catch (error) {
      console.error("Gagal load transaksi:", error);
    }
  };

  // Filter by time range
  const getFilteredData = () => {
    const now = new Date();
    return data.filter((t) => {
      if (timeRange === "all") return true;
      const txDate = new Date(t.date);
      if (timeRange === "month") {
        return (
          txDate.getMonth() === now.getMonth() &&
          txDate.getFullYear() === now.getFullYear()
        );
      }
      if (timeRange === "week") {
        const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        return txDate >= weekAgo;
      }
      return true;
    });
  };

  const filteredData = getFilteredData();
  const income = filteredData
    .filter((t) => t.type === "income")
    .reduce((a, b) => a + b.amount, 0);
  const expense = filteredData
    .filter((t) => t.type === "expense")
    .reduce((a, b) => a + b.amount, 0);
  const balance = income - expense;

  // Recent transactions
  const recentTransactions = [...filteredData]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  // Category breakdown for expenses
  const categoryBreakdown = filteredData
    .filter((t) => t.type === "expense")
    .reduce((acc, t) => {
      const cat = t.category || "Other";
      acc[cat] = (acc[cat] || 0) + t.amount;
      return acc;
    }, {});

  const topCategories = Object.entries(categoryBreakdown)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500 mt-1">Ringkasan keuangan kamu</p>
        </div>

        {/* Time range filter */}
        <div className="flex gap-2 bg-gray-100 p-1 rounded-lg">
          <button
            onClick={() => setTimeRange("week")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              timeRange === "week"
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            7 Hari
          </button>
          <button
            onClick={() => setTimeRange("month")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              timeRange === "month"
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Bulan Ini
          </button>
          <button
            onClick={() => setTimeRange("all")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              timeRange === "all"
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Semua
          </button>
        </div>
      </div>

      {/* Balance Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* Income Card */}
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-100">
          <div className="flex items-start justify-between mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <svg
                className="w-6 h-6 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 11l5-5m0 0l5 5m-5-5v12"
                />
              </svg>
            </div>
            <span className="text-xs font-medium text-green-700 bg-green-100 px-2 py-1 rounded-full">
              Pemasukan
            </span>
          </div>
          <div className="space-y-1">
            <p className="text-2xl font-bold text-gray-900">
              Rp {income.toLocaleString("id-ID")}
            </p>
            <p className="text-sm text-gray-600">
              {filteredData.filter((t) => t.type === "income").length} transaksi
            </p>
          </div>
        </div>

        {/* Expense Card */}
        <div className="bg-gradient-to-br from-red-50 to-rose-50 rounded-2xl p-6 border border-red-100">
          <div className="flex items-start justify-between mb-4">
            <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
              <svg
                className="w-6 h-6 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 13l-5 5m0 0l-5-5m5 5V6"
                />
              </svg>
            </div>
            <span className="text-xs font-medium text-red-700 bg-red-100 px-2 py-1 rounded-full">
              Pengeluaran
            </span>
          </div>
          <div className="space-y-1">
            <p className="text-2xl font-bold text-gray-900">
              Rp {expense.toLocaleString("id-ID")}
            </p>
            <p className="text-sm text-gray-600">
              {filteredData.filter((t) => t.type === "expense").length}{" "}
              transaksi
            </p>
          </div>
        </div>

        {/* Balance Card */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
          <div className="flex items-start justify-between mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <svg
                className="w-6 h-6 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <span className="text-xs font-medium text-blue-700 bg-blue-100 px-2 py-1 rounded-full">
              Saldo
            </span>
          </div>
          <div className="space-y-1">
            <p
              className={`text-2xl font-bold ${
                balance >= 0 ? "text-gray-900" : "text-red-600"
              }`}
            >
              Rp {balance.toLocaleString("id-ID")}
            </p>
            <p className="text-sm text-gray-600">
              {balance >= 0 ? "Kondisi sehat" : "Perlu perhatian"}
            </p>
          </div>
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Recent Transactions */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Transaksi Terbaru
          </h2>

          {recentTransactions.length === 0 ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg
                  className="w-8 h-8 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <p className="text-gray-500 text-sm">Belum ada transaksi</p>
            </div>
          ) : (
            <div className="space-y-3">
              {recentTransactions.map((tx, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        tx.type === "income" ? "bg-green-100" : "bg-red-100"
                      }`}
                    >
                      {tx.type === "income" ? (
                        <svg
                          className="w-5 h-5 text-green-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M7 11l5-5m0 0l5 5m-5-5v12"
                          />
                        </svg>
                      ) : (
                        <svg
                          className="w-5 h-5 text-red-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 13l-5 5m0 0l-5-5m5 5V6"
                          />
                        </svg>
                      )}
                    </div>

                    <div>
                      <p className="font-medium text-gray-900 text-sm">
                        {tx.description ||
                          (tx.type === "income" ? "Pemasukan" : "Pengeluaran")}
                      </p>
                      <p className="text-xs text-gray-500">
                        {new Date(tx.date).toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "short",
                        })}
                      </p>
                    </div>
                  </div>
                  <p
                    className={`font-semibold ${
                      tx.type === "income" ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {tx.type === "income" ? "+" : "-"}Rp{" "}
                    {tx.amount.toLocaleString("id-ID")}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Top Categories */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Kategori Pengeluaran
          </h2>

          {topCategories.length === 0 ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg
                  className="w-8 h-8 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
              <p className="text-gray-500 text-sm">Belum ada pengeluaran</p>
            </div>
          ) : (
            <div className="space-y-4">
              {topCategories.map(([category, amount], idx) => {
                const percentage = expense > 0 ? (amount / expense) * 100 : 0;
                return (
                  <div key={idx}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-gray-900 text-sm">
                        {category}
                      </span>
                      <span className="text-sm text-gray-600">
                        Rp {amount.toLocaleString("id-ID")}
                      </span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-indigo-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      {percentage.toFixed(1)}% dari total
                    </p>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Quick Stats */}
      {filteredData.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <p className="text-xs text-gray-500 mb-1">Rata-rata Pengeluaran</p>
            <p className="text-lg font-bold text-gray-900">
              Rp{" "}
              {expense > 0
                ? Math.round(
                    expense /
                      filteredData.filter((t) => t.type === "expense").length
                  ).toLocaleString("id-ID")
                : 0}
            </p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <p className="text-xs text-gray-500 mb-1">Transaksi Terbesar</p>
            <p className="text-lg font-bold text-gray-900">
              Rp{" "}
              {Math.max(...filteredData.map((t) => t.amount), 0).toLocaleString(
                "id-ID"
              )}
            </p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <p className="text-xs text-gray-500 mb-1">Total Transaksi</p>
            <p className="text-lg font-bold text-gray-900">
              {filteredData.length}
            </p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <p className="text-xs text-gray-500 mb-1">Saving Rate</p>
            <p className="text-lg font-bold text-gray-900">
              {income > 0 ? Math.round(((income - expense) / income) * 100) : 0}
              %
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
