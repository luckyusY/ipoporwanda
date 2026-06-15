import { NextResponse } from "next/server";
import { z } from "zod";
import { getCloudinary } from "@/lib/cloudinary";
import { slugify } from "@/lib/format";
import { ListingModel } from "@/lib/listing-model";
import { getMongo } from "@/lib/mongodb";

const listingSchema = z.object({
  group: z.enum(["properties", "cars"]).default("properties"),
  title: z.string().min(5),
  purpose: z.enum(["rent", "sale"]),
  category: z.enum(["house", "apartment", "villa", "land", "office", "retail", "car"]),
  location: z.string().min(2),
  district: z.string().min(2),
  price: z.number().positive(),
  currency: z.enum(["RWF"]).default("RWF"),
  bedrooms: z.number().optional(),
  bathrooms: z.number().optional(),
  areaSqm: z.number().optional(),
  summary: z.string().min(20),
  features: z.array(z.string()).default([]),
  phone: z.string().min(8),
  whatsapp: z.string().min(8),
  images: z.array(z.string().startsWith("data:image/")).min(1).max(8),
});

export async function POST(request: Request) {
  if (!process.env.MONGODB_URI) {
    return NextResponse.json({ error: "MONGODB_URI is missing." }, { status: 500 });
  }

  const parsed = listingSchema.safeParse(await request.json());

  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid listing." },
      { status: 400 },
    );
  }

  try {
    const cloudinary = getCloudinary();
    const uploads = await Promise.all(
      parsed.data.images.map((image) =>
        cloudinary.uploader.upload(image, {
          folder: "ipoporwanda/listings",
          resource_type: "image",
          transformation: [{ quality: "auto", fetch_format: "auto" }],
        }),
      ),
    );

    await getMongo();

    const now = new Date().toISOString();
    const slug = `${slugify(parsed.data.title)}-${Date.now().toString(36)}`;

    const { images: _images, ...rest } = parsed.data;

    const listing = await ListingModel.create({
      ...rest,
      id: crypto.randomUUID(),
      slug,
      status: "draft",
      images: uploads.map((u) => u.secure_url),
      agentName: "Ipopo Rwanda",
      featured: false,
      createdAt: now,
    });

    return NextResponse.json({ listing }, { status: 201 });
  } catch (error) {
    console.error("POST /api/properties error:", error);
    return NextResponse.json({ error: "Could not create the listing." }, { status: 500 });
  }
}
