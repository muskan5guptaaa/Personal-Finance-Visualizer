"use client";

import { useState } from "react";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Input } from "@/src/components/ui/input";
import { Button } from "@/src/components/ui/button";
import { Label } from "recharts";
const categories = ["Groceries", "Rent", "Entertainment", "Dining Out", "Transportation"];

export default function BudgetForm({ onSuccess }: { onSuccess: () => void }) {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [month, setMonth] = useState("");
  const [comparisonData, setComparisonData] = useState([]);


  const handleSubmit = async () => {
    await fetch("/api/budgets", {
      method: "POST",
      body: JSON.stringify({ amount: Number(amount), category, month }),
    });
    setAmount("");
    setCategory("");
    setMonth("");
    onSuccess();
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Set Monthly Budget</h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
        <div>
          <Label>Category</Label>
          <Select onValueChange={setCategory}>
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat}>{cat}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>Amount</Label>
          <Input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
        </div>

        <div>
          <Label>Month</Label>
          <Input
            type="month"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
          />
        </div>
      </div>

      <Button onClick={handleSubmit}>Save Budget</Button>
    </div>
  );
}
