import { unstable_cache } from "next/cache";
import { getMongo } from "@/lib/mongodb";
import { ListingModel } from "@/lib/listing-model";
import { sampleListings } from "@/lib/sample-data";
import type { PropertyListing } from "@/lib/types";

async function loadListings() {
  if (!process.env.MONGODB_URI) {
    return sampleListings;
  }

  try {
    await getMongo();
    const listings = await ListingModel.find({ status: "published", group: "properties" })
      .sort({ featured: -1, createdAt: -1 })
      .lean<PropertyListing[]>();

    return listings.length ? listings : sampleListings;
  } catch (error) {
    console.error("Falling back to sample listings", error);
    return sampleListings;
  }
}

export const getListings = unstable_cache(loadListings, ["published-property-listings"], {
  revalidate: 300,
  tags: ["listings"],
});
