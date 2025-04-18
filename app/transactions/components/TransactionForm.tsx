"use client";

import { Input } from "@/src/components/ui/input";
import { useState } from "react";
import { Button } from "@/src/components/ui/button";

interface TransactionFormProps {
  onSuccess: () => void;
}

export function TransactionForm({ onSuccess }: TransactionFormProps) {
  const [amount, setAmount] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [category, setCategory] = useState<string>("");


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!amount || !date || !description) {
      setError("All fields are required.");
      return;
    }

    const res = await fetch("/api/transactions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        amount: parseFloat(amount),
        date,
        description,
        category,
      }),
    });

    if (!res.ok) {
      setError("Failed to add transaction.");
      return;
    }

    setAmount("");
    setDate("");
    setDescription("");
    setError(null);
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <Input type="number" placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
      <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
      <Input placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
      <select
  value={category}
  onChange={(e) => setCategory(e.target.value)}
  className="border rounded px-2 py-1 w-full"
>
  <option value="">Select category</option>
  <option value="Food">Food</option>
  <option value="Utilities">Utilities</option>
  <option value="Transport">Transport</option>
  <option value="Entertainment">Entertainment</option>
  <option value="Other">Other</option>
</select>
<Button type="submit">Add Transaction</Button>

    </form>

  );
}
