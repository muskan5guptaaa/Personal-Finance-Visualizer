
import dbConnect from "@/lib/db";
import Budget from "@/lib/models/budget";
import Transaction from "@/lib/models/Transaction";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  await dbConnect();
  const now = new Date();
  const month = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;

  const transactions = await Transaction.aggregate([
    {
      $match: {
        date: {
          $gte: new Date(`${month}-01`),
          $lt: new Date(`${month}-31`)
        }
      }
    },
    {
      $group: {
        _id: "$category",
        actual: { $sum: "$amount" }
      }
    }
  ]);

  const budgets = await Budget.find({ month });

  const merged = budgets.map((b) => {
    const actual = transactions.find((t) => t._id === b.category)?.actual || 0;
    return {
      category: b.category,
      budget: b.amount,
      actual,
    };
  });

  return NextResponse.json(merged);
}
