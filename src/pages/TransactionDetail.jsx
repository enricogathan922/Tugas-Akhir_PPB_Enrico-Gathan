import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "@/lib/api";
import {
  ArrowUpRight,
  ArrowDownLeft,
  Calendar,
  Tag,
  FileText,
  Wallet,
} from "lucide-react";

export default function TransactionDetail() {
  const { id } = useParams();
  const [tx, setTx] = useState(null);
  const navigate = useNavigate()

  useEffect(() => {
    loadDetail();
  }, []);

  const loadDetail = async () => {
    try {
      const res = await API.get(`/transactions/${id}`);
      console.log(res);
      setTx(res.data.data);
    } catch (error) {
      console.error("Gagal load detail:", error);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Yakin ingin hapus transaksi ini?")) return;

    try {
      await API.delete(`/transactions/${id}`);

      alert("Transaksi berhasil dihapus!");
      navigate("/transactions");
    } catch (error) {
      console.error("Gagal hapus:", error);
      alert("Gagal menghapus transaksi dari server");
    }
  };

  if (!tx) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent mb-4"></div>
          <p className="text-gray-600">Memuat detail transaksi...</p>
        </div>
      </div>
    );
  }

  const isIncome = tx.category === "INCOME";
  const formattedDate = new Date(tx.date).toLocaleDateString("id-ID", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        {/* Header Card */}
        <div
          className={`rounded-2xl shadow-lg p-8 mb-6 ${
            isIncome
              ? "bg-gradient-to-br from-green-500 to-emerald-600"
              : "bg-gradient-to-br from-red-500 to-rose-600"
          }`}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm">
                {isIncome ? (
                  <ArrowDownLeft className="w-6 h-6 text-white" />
                ) : (
                  <ArrowUpRight className="w-6 h-6 text-white" />
                )}
              </div>
              <div>
                <p className="text-white/80 text-sm font-medium">
                  {isIncome ? "Pemasukan" : "Pengeluaran"}
                </p>
                <p className="text-white/60 text-xs">{tx.group}</p>
              </div>
            </div>
            <div
              className={`px-4 py-1.5 rounded-full text-xs font-semibold ${
                isIncome
                  ? "bg-green-400/30 text-white"
                  : "bg-red-400/30 text-white"
              }`}
            >
              {tx.category}
            </div>
          </div>

          <div className="mt-6">
            <p className="text-white/80 text-sm mb-1">Total Nominal</p>
            <p className="text-4xl md:text-5xl font-bold text-white">
              Rp {tx.amount.toLocaleString("id-ID")}
            </p>
          </div>
        </div>

        {/* Detail Cards */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-6">
              Informasi Detail
            </h2>

            <div className="space-y-5">
              {/* Description */}
              <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                <div className="bg-blue-100 p-2.5 rounded-lg">
                  <FileText className="w-5 h-5 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-500 mb-1">Deskripsi</p>
                  <p className="font-semibold text-gray-800">
                    {tx.description}
                  </p>
                </div>
              </div>

              {/* Amount */}
              <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                <div className="bg-purple-100 p-2.5 rounded-lg">
                  <Wallet className="w-5 h-5 text-purple-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-500 mb-1">Jumlah</p>
                  <p className="font-semibold text-gray-800">
                    Rp {tx.amount.toLocaleString("id-ID")}
                  </p>
                </div>
              </div>

              {/* Category/Group */}
              <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                <div className="bg-amber-100 p-2.5 rounded-lg">
                  <Tag className="w-5 h-5 text-amber-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-500 mb-1">Kategori</p>
                  <p className="font-semibold text-gray-800">{tx.group}</p>
                </div>
              </div>

              {/* Date */}
              <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                <div className="bg-indigo-100 p-2.5 rounded-lg">
                  <Calendar className="w-5 h-5 text-indigo-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-500 mb-1">Tanggal</p>
                  <p className="font-semibold text-gray-800">{formattedDate}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 px-6 py-4 flex gap-3">
            <button
              onClick={handleDelete}
              className="flex-1 bg-white hover:bg-gray-100 text-gray-700 font-semibold py-3 px-4 rounded-xl border-2 border-gray-200 transition-colors"
            >
              Hapus
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
