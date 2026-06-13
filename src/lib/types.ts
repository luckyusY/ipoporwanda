export type ListingGroup = "properties" | "cars";
export type ListingPurpose = "rent" | "sale";
export type ListingStatus = "draft" | "published";

export type ListingCategory =
  | "house"
  | "apartment"
  | "villa"
  | "land"
  | "office"
  | "retail"
  | "car";

export type PropertyListing = {
  id: string;
  title: string;
  slug: string;
  group: ListingGroup;
  purpose: ListingPurpose;
  category: ListingCategory;
  status: ListingStatus;
  location: string;
  district: string;
  price: number;
  currency: "USD" | "RWF";
  bedrooms?: number;
  bathrooms?: number;
  areaSqm?: number;
  images: string[];
  summary: string;
  features: string[];
  agentName: string;
  phone: string;
  whatsapp: string;
  featured?: boolean;
  createdAt: string;
};

export type CategoryConfig = {
  label: string;
  group: ListingGroup;
  purpose: ListingPurpose;
  category?: ListingCategory;
  visible: boolean;
};
