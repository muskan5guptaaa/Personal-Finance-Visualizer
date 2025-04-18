// app/api/transactions/[id]/route.ts
import dbConnect from "@/lib/db";
import Transaction from "@/lib/models/Transaction";
import { NextResponse } from "next/server";

export async function PUT(req: Request, { params }: any) {
  await dbConnect();
  const body = await req.json();
  const updated = await Transaction.findByIdAndUpdate(params.id, body, { new: true });
  return NextResponse.json(updated);
}

export async function DELETE(_: Request, { params }: any) {
  await dbConnect();
  await Transaction.findByIdAndDelete(params.id);
  return NextResponse.json({ success: true });
}
