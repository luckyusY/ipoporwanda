"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { UploadCloud } from "lucide-react";
import { propertyCategories } from "@/lib/sample-data";

type SubmitState = "idle" | "submitting" | "success" | "error";

export function ListingForm() {
  const [previews, setPreviews] = useState<string[]>([]);
  const [state, setState] = useState<SubmitState>("idle");
  const [message, setMessage] = useState("");

  const canSubmit = useMemo(() => previews.length > 0 && state !== "submitting", [previews, state]);

  async function onFiles(files: FileList | null) {
    if (!files) return;

    const selected = Array.from(files).slice(0, 8);
    const encoded = await Promise.all(
      selected.map(
        (file) =>
          new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(String(reader.result));
            reader.onerror = reject;
            reader.readAsDataURL(file);
          }),
      ),
    );

    setPreviews(encoded);
  }

  async function submit(formData: FormData) {
    setState("submitting");
    setMessage("");

    const payload = {
      title: formData.get("title"),
      purpose: formData.get("purpose"),
      category: formData.get("category"),
      location: formData.get("location"),
      district: formData.get("district"),
      price: Number(formData.get("price")),
      currency: formData.get("currency"),
      bedrooms: Number(formData.get("bedrooms") || 0) || undefined,
      bathrooms: Number(formData.get("bathrooms") || 0) || undefined,
      areaSqm: Number(formData.get("areaSqm") || 0) || undefined,
      summary: formData.get("summary"),
      features: String(formData.get("features") || "")
        .split(",")
        .map((feature) => feature.trim())
        .filter(Boolean),
      phone: formData.get("phone"),
      whatsapp: formData.get("whatsapp"),
      images: previews,
    };

    const response = await fetch("/api/properties", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      setState("success");
      setMessage("Property saved as a draft for review.");
      setPreviews([]);
      return;
    }

    const result = await response.json().catch(() => null);
    setState("error");
    setMessage(result?.error ?? "Could not save this listing. Check your environment variables.");
  }

  return (
    <form action={submit} className="grid gap-5 rounded-lg border border-line bg-surface p-5 shadow-sm">
      <div className="grid gap-4 md:grid-cols-2">
        <label className="grid gap-2 text-sm font-semibold">
          Property title
          <input name="title" required className="h-12 rounded-md border border-line bg-background px-4 font-normal outline-none focus:border-brand" />
        </label>
        <label className="grid gap-2 text-sm font-semibold">
          Location
          <input name="location" required placeholder="Kibagabaga" className="h-12 rounded-md border border-line bg-background px-4 font-normal outline-none focus:border-brand" />
        </label>
        <label className="grid gap-2 text-sm font-semibold">
          District
          <input name="district" required placeholder="Gasabo" className="h-12 rounded-md border border-line bg-background px-4 font-normal outline-none focus:border-brand" />
        </label>
        <label className="grid gap-2 text-sm font-semibold">
          Category
          <select name="category" className="h-12 rounded-md border border-line bg-background px-4 font-normal capitalize outline-none focus:border-brand">
            {propertyCategories.map((category) => <option key={category} value={category}>{category}</option>)}
          </select>
        </label>
        <label className="grid gap-2 text-sm font-semibold">
          Purpose
          <select name="purpose" className="h-12 rounded-md border border-line bg-background px-4 font-normal outline-none focus:border-brand">
            <option value="rent">For rent</option>
            <option value="sale">For sale</option>
          </select>
        </label>
        <label className="grid gap-2 text-sm font-semibold">
          Currency
          <select name="currency" className="h-12 rounded-md border border-line bg-background px-4 font-normal outline-none focus:border-brand">
            <option value="RWF">RWF</option>
          </select>
        </label>
        <label className="grid gap-2 text-sm font-semibold">
          Price
          <input name="price" type="number" min="0" required className="h-12 rounded-md border border-line bg-background px-4 font-normal outline-none focus:border-brand" />
        </label>
        <label className="grid gap-2 text-sm font-semibold">
          Area sqm
          <input name="areaSqm" type="number" min="0" className="h-12 rounded-md border border-line bg-background px-4 font-normal outline-none focus:border-brand" />
        </label>
        <label className="grid gap-2 text-sm font-semibold">
          Bedrooms
          <input name="bedrooms" type="number" min="0" className="h-12 rounded-md border border-line bg-background px-4 font-normal outline-none focus:border-brand" />
        </label>
        <label className="grid gap-2 text-sm font-semibold">
          Bathrooms
          <input name="bathrooms" type="number" min="0" className="h-12 rounded-md border border-line bg-background px-4 font-normal outline-none focus:border-brand" />
        </label>
        <label className="grid gap-2 text-sm font-semibold">
          Call phone
          <input name="phone" required placeholder="+250..." className="h-12 rounded-md border border-line bg-background px-4 font-normal outline-none focus:border-brand" />
        </label>
        <label className="grid gap-2 text-sm font-semibold">
          WhatsApp phone
          <input name="whatsapp" required placeholder="+250..." className="h-12 rounded-md border border-line bg-background px-4 font-normal outline-none focus:border-brand" />
        </label>
      </div>

      <label className="grid gap-2 text-sm font-semibold">
        Short description
        <textarea name="summary" required rows={4} className="rounded-md border border-line bg-background p-4 font-normal outline-none focus:border-brand" />
      </label>
      <label className="grid gap-2 text-sm font-semibold">
        Features, separated by commas
        <input name="features" placeholder="Furnished, Rooftop, Parking" className="h-12 rounded-md border border-line bg-background px-4 font-normal outline-none focus:border-brand" />
      </label>

      <label className="grid min-h-36 cursor-pointer place-items-center rounded-lg border border-dashed border-brand/50 bg-brand-soft/50 p-6 text-center">
        <input type="file" accept="image/*" multiple className="sr-only" onChange={(event) => onFiles(event.target.files)} />
        <span className="grid gap-2 justify-items-center text-brand-dark">
          <UploadCloud size={28} />
          <strong>Upload listing images</strong>
          <span className="text-sm text-muted">Owners see previews before saving. First image becomes the card cover.</span>
        </span>
      </label>

      {previews.length ? (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {previews.map((preview, index) => (
            <div key={preview.slice(0, 40)} className="relative aspect-[4/3] overflow-hidden rounded-md border border-line bg-surface-soft">
              <Image src={preview} alt={`Preview ${index + 1}`} fill className="object-cover" unoptimized />
            </div>
          ))}
        </div>
      ) : null}

      {message ? (
        <p className={state === "error" ? "text-sm font-semibold text-red-700" : "text-sm font-semibold text-brand"}>
          {message}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={!canSubmit}
        className="h-12 rounded-full bg-brand px-6 text-sm font-bold text-white transition hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-50"
      >
        {state === "submitting" ? "Saving listing..." : "Save listing draft"}
      </button>
    </form>
  );
}
