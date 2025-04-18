// app/transactions/components/TransactionList.tsx
"use client";
import { Button } from "@/src/components/ui/button";

export function TransactionList({ transactions, onChange }: any) {
  const handleDelete = async (id: string) => {
    await fetch(`/api/transactions/${id}`, { method: "DELETE" });
    onChange();
  };

  return (
    <div className="space-y-2">
      <h2 className="text-xl font-semibold">Transactions</h2>
      {transactions.map((t: any) => (
        <div key={t._id} className="p-2 border rounded flex justify-between items-center">
          <div>
            <p className="font-medium">{t.description}</p>
            <p className="text-sm text-muted-foreground">
              ${t.amount} — {new Date(t.date).toLocaleDateString()}
            </p>
          </div>
          <Button variant="destructive" size="sm" onClick={() => handleDelete(t._id)}>Delete</Button>
        </div>
      ))}
    </div>
  );
}
