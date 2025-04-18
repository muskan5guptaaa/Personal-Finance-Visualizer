"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CategoryPieChart from "./CategoryPieChart";

export default function Dashboard() {
  const [summary, setSummary] = useState<null | {
    total: number;
    categoryBreakdown: { name: string; value: number }[];
    recent: any[];
  }>(null);

  useEffect(() => {
    fetch("/api/transactions/summary")
      .then((res) => res.json())
      .then(setSummary);
  }, []);

  if (!summary) return <p>Loading...</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Total Spent</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-semibold">${summary.total}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>By Category</CardTitle>
        </CardHeader>
        <CardContent>
          <CategoryPieChart data={summary.categoryBreakdown} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="text-sm space-y-1">
            {summary.recent.map((tx) => (
              <li key={tx._id}>
                {tx.description} - ${tx.amount} ({tx.category})
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
