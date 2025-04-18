// models/budget.ts
import mongoose from "mongoose";

const BudgetSchema = new mongoose.Schema({
  category: { type: String, required: true },
  amount: { type: Number, required: true },
  month: { type: String, required: true }, // e.g. "2025-04"
});

export default mongoose.models.Budget || mongoose.model("Budget", BudgetSchema);
