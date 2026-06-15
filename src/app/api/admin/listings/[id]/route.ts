import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getMongo } from "@/lib/mongodb";
import { ListingModel } from "@/lib/listing-model";
import { getCloudinary } from "@/lib/cloudinary";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!process.env.MONGODB_URI) {
    return NextResponse.json({ error: "MONGODB_URI is not configured." }, { status: 500 });
  }

  const { id } = await params;
  const updates = await request.json().catch(() => ({}));

  try {
    await getMongo();
    const listing = await ListingModel.findOneAndUpdate(
      { id },
      { $set: updates },
      { new: true },
    );

    if (!listing) {
      return NextResponse.json({ error: "Listing not found." }, { status: 404 });
    }

    revalidatePath("/", "layout");
    return NextResponse.json({ listing });
  } catch (error) {
    console.error("Admin patch error:", error);
    return NextResponse.json({ error: "Could not update listing." }, { status: 500 });
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!process.env.MONGODB_URI) {
    return NextResponse.json({ error: "MONGODB_URI is not configured." }, { status: 500 });
  }

  const { id } = await params;

  try {
    await getMongo();
    const listing = await ListingModel.findOneAndDelete({ id });

    if (!listing) {
      return NextResponse.json({ error: "Listing not found." }, { status: 404 });
    }

    // Best-effort: remove images from Cloudinary
    try {
      const cloudinary = getCloudinary();
      await Promise.all(
        listing.images
          .map((url: string) => {
            // Extract public_id: everything after /upload/vNNN/ up to the extension
            const match = url.match(/\/upload\/(?:v\d+\/)?(.+)\.[a-z]+$/);
            return match ? cloudinary.uploader.destroy(match[1]) : null;
          })
          .filter(Boolean),
      );
    } catch (e) {
      console.warn("Cloudinary cleanup partial failure:", e);
    }

    revalidatePath("/", "layout");
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Admin delete error:", error);
    return NextResponse.json({ error: "Could not delete listing." }, { status: 500 });
  }
}
