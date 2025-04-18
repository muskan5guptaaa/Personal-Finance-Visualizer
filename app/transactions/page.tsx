// app/transactions/page.tsx
"use client";
import { useEffect, useState } from "react";
import { TransactionForm } from "./components/TransactionForm";
import { TransactionList } from "./components/TransactionList";
import { MonthlyChart } from "./components/MonthlyChart";
import Dashboard from "./components/dashboard";


export default function TransactionsPage() {
  const [transactions, setTransactions] = useState([]);

  const fetchTransactions = async () => {
    const res = await fetch("/api/transactions");
    const data = await res.json();
    setTransactions(data);
  };

  
  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <div className="p-4 max-w-3xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Personal Finance Tracker</h1>
      <TransactionForm onSuccess={fetchTransactions} />
      <MonthlyChart transactions={transactions} />
      <TransactionList transactions={transactions} onChange={fetchTransactions} />
      <section className="pt-10">
        <h2 className="text-2xl font-bold mb-4">Dashboard Overview</h2>
        <Dashboard />
      </section>

    </div>
  );
}
