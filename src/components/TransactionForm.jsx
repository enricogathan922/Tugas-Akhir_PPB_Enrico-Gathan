import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpCircle, ArrowDownCircle, Plus } from "lucide-react";
import API from "../lib/api";

export default function TransactionForm({ onTransactionAdded }) {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("expense");
  const [category, setCategory] = useState("Makanan");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);

  function sendNotification(title, body) {
    if (Notification.permission === "granted") {
      new Notification(title, {
        body,
        icon: "/icons/icon.png",
      });
    }
  }

  const categories = {
    income: ["Gaji", "Bonus", "Investasi", "Freelance", "Lainnya"],
    expense: [
      "Makanan",
      "Transport",
      "Belanja",
      "Tagihan",
      "Hiburan",
      "Kesehatan",
      "Lainnya",
    ],
  };

  const addTransaction = async () => {
    if (!description.trim() || !amount || Number(amount) <= 0) {
      alert("Mohon isi semua field dengan benar!");
      return;
    }

    try {
      const payload = {
        description: description.trim(),
        group: category,
        amount: Number(amount),
        category: type === "income" ? "INCOME" : "OUTCOME",
        date: date,
      };

      const response = await API.post("/transactions", payload);

      setDescription("");
      setAmount("");
      setCategory(type === "income" ? "Gaji" : "Makanan");
      setDate(new Date().toISOString().split("T")[0]);

      if (onTransactionAdded) onTransactionAdded();

      sendNotification(
        type === "income" ? "Pemasukan Ditambahkan" : "Pengeluaran Ditambahkan",
        `${description} - Rp${Number(amount).toLocaleString()}`
      );

      console.log("Transaksi tersimpan:", response.data);

      alert(response.data.message)

    } catch (error) {
      console.error("Gagal menyimpan transaksi:", error);
      alert("Gagal menyimpan transaksi ke server!");
    }
  };

  return (
    <Card className="lg:sticky lg:top-24">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
            <Plus className="w-5 h-5 text-primary" />
          </div>
          Tambah Transaksi
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-2 p-1 bg-muted rounded-lg">
          <Button
            type="button"
            variant={type === "income" ? "default" : "ghost"}
            className={
              type === "income"
                ? "bg-green-600 hover:bg-green-700"
                : "hover:bg-transparent"
            }
            onClick={() => {
              setType("income");
              setCategory("Gaji");
            }}
          >
            <ArrowUpCircle className="w-4 h-4 mr-2" />
            Pemasukan
          </Button>
          <Button
            type="button"
            variant={type === "expense" ? "default" : "ghost"}
            className={
              type === "expense"
                ? "bg-red-600 hover:bg-red-700"
                : "hover:bg-transparent"
            }
            onClick={() => {
              setType("expense");
              setCategory("Makanan");
            }}
          >
            <ArrowDownCircle className="w-4 h-4 mr-2" />
            Pengeluaran
          </Button>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Deskripsi</Label>
          <Input
            id="description"
            type="text"
            placeholder="Contoh: Gaji bulanan, Beli groceries..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        {/* Amount */}
        <div className="space-y-2">
          <Label htmlFor="amount">Jumlah (Rp)</Label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">
              Rp
            </span>
            <Input
              id="amount"
              type="number"
              className="pl-10"
              placeholder="0"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              min="0"
              step="1000"
            />
          </div>
        </div>

        {/* Category */}

        {/* Date */}
        <div className="space-y-2">
          <Label htmlFor="date">Tanggal</Label>
          <Input
            id="date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        {/* Category */}
        <div className="space-y-2">
          <Label htmlFor="category">Kategori</Label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 bg-background text-foreground shadow-sm focus:ring-2 focus:ring-primary focus:outline-none"
          >
            {categories[type].map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <Button
          onClick={addTransaction}
          className={`w-full ${
            type === "income"
              ? "bg-green-600 hover:bg-green-700"
              : "bg-red-600 hover:bg-red-700"
          }`}
        >
          Tambah {type === "income" ? "Pemasukan" : "Pengeluaran"}
        </Button>
      </CardContent>
    </Card>
  );
}
