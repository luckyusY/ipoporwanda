import { NextResponse } from "next/server";
import { getMongo } from "@/lib/mongodb";
import { ListingModel } from "@/lib/listing-model";

export async function GET() {
  if (!process.env.MONGODB_URI) {
    return NextResponse.json({ error: "MONGODB_URI is not configured." }, { status: 500 });
  }

  try {
    await getMongo();
    const listings = await ListingModel.find({})
      .sort({ createdAt: -1 })
      .lean();
    return NextResponse.json({ listings });
  } catch (error) {
    console.error("Admin listings fetch error:", error);
    return NextResponse.json({ error: "Could not load listings." }, { status: 500 });
  }
}
