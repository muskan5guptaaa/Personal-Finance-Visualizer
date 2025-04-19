import dbConnect from "@/lib/db";

import Budget from "@/lib/models/budget";
import { NextResponse } from "next/server";

export async function GET() {
  await dbConnect();
  const budgets = await Budget.find();
  return NextResponse.json(budgets);
}

export async function POST(req: Request) {
  await dbConnect();
  const data = await req.json();
  const budget = await Budget.create(data);
  return NextResponse.json(budget);
}
