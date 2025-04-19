"use client";

import { useEffect, useState } from "react";
import { TransactionForm } from "./components/TransactionForm";
import { TransactionList } from "./components/TransactionList";
import { MonthlyChart } from "./components/MonthlyChart";
import Dashboard from "./components/dashboard";
import BudgetForm from "./components/BudgetForm";
import BudgetComparisonChart from "./components/BudgetComparisonChart";
export default function TransactionsPage() {
  const [transactions, setTransactions] = useState([]);
  const [comparisonData, setComparisonData] = useState([]);

  const fetchTransactions = async () => {
    const res = await fetch("/api/transactions");
    const data = await res.json();
    setTransactions(data);
  };

  const fetchBudgetSummary = async () => {
    const res = await fetch("/api/budgets/summary");
    const data = await res.json();
    setComparisonData(data);
    console.log(data);
  };

  useEffect(() => {
    fetchTransactions();
    fetchBudgetSummary();
  }, []);

  return (
    <div className="p-4 max-w-5xl mx-auto space-y-10">
      <h1 className="text-2xl font-bold">Personal Finance Tracker</h1>

      {/* Stage 1 */}
      <TransactionForm onSuccess={fetchTransactions} />
      <MonthlyChart transactions={transactions} />
      <TransactionList
        transactions={transactions}
        onChange={fetchTransactions}
      />

      {/* Stage 2 */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Dashboard Overview</h2>
        <Dashboard />
      </section>

      {/* Stage 3 */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Monthly Budgeting</h2>
        <BudgetForm onSuccess={fetchBudgetSummary} />
        <BudgetComparisonChart data={comparisonData} />
      </section>
    </div>
  );
}
