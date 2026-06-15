import { Schema, models, model } from "mongoose";
import type { PropertyListing } from "@/lib/types";

const listingSchema = new Schema<PropertyListing>(
  {
    id: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    group: { type: String, required: true, enum: ["properties", "cars"], default: "properties" },
    purpose: { type: String, required: true, enum: ["rent", "sale"] },
    category: { type: String, required: true },
    status: { type: String, required: true, enum: ["draft", "published"], default: "draft" },
    location: { type: String, required: true },
    district: { type: String, required: true },
    price: { type: Number, required: true },
    currency: { type: String, required: true, enum: ["RWF"], default: "RWF" },
    bedrooms: Number,
    bathrooms: Number,
    areaSqm: Number,
    images: [{ type: String, required: true }],
    summary: { type: String, required: true },
    features: [{ type: String }],
    agentName: { type: String, required: true, default: "Ipopo Rwanda" },
    phone: { type: String, required: true },
    whatsapp: { type: String, required: true },
    featured: { type: Boolean, default: false },
    createdAt: { type: String, required: true },
  },
  { collection: "listings" },
);

export const ListingModel =
  models.Listing || model<PropertyListing>("Listing", listingSchema);
