import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Transaction from "@/lib/models/Transaction";

export async function GET() {
  await dbConnect();

  const total = await Transaction.aggregate([
    {
      $group: {
        _id: null,
        total: { $sum: "$amount" },
      },
    },
  ]);

  const categoryBreakdown = await Transaction.aggregate([
    {
      $group: {
        _id: "$category",
        total: { $sum: "$amount" },
      },
    },
    {
      $project: {
        _id: 0,
        name: "$_id",
        value: "$total",
      },
    },
  ]);

  const recent = await Transaction.find({})
    .sort({ date: -1 })
    .limit(5)
    .lean();

  return NextResponse.json({
    total: total[0]?.total || 0,
    categoryBreakdown,
    recent,
  });
}
