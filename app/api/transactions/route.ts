// app/api/transactions/route.ts
import dbConnect from "@/lib/db";
import Transaction from "../../../lib/models/Transaction";
import { NextResponse } from "next/server";

export async function GET() {
  await dbConnect();
  const transactions = await Transaction.find({}).sort({ date: -1 });
  return NextResponse.json(transactions);
}

export async function POST(req: Request) {
  await dbConnect();
  const body = await req.json();
  const newTransaction = await Transaction.create(body);
  return NextResponse.json(newTransaction);
}
