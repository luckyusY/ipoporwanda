"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { UploadCloud, X } from "lucide-react";
import { propertyCategories } from "@/lib/sample-data";

type SubmitState = "idle" | "submitting" | "success" | "error";

const LOCATIONS = [
  "Kigali", "Kibagabaga", "Kacyiru", "Nyarutarama", "Gacuriro",
  "Kiyovu", "Kimihurura", "Remera", "Rebero", "Kimironko", "Kicukiro",
];

export function ListingForm({ onSuccess }: { onSuccess?: () => void }) {
  const [group, setGroup] = useState<"properties" | "cars">("properties");
  const [previews, setPreviews] = useState<string[]>([]);
  const [state, setState] = useState<SubmitState>("idle");
  const [message, setMessage] = useState("");
  const [formKey, setFormKey] = useState(0);

  const isCar = group === "cars";
  const canSubmit = useMemo(
    () => previews.length > 0 && state !== "submitting",
    [previews, state],
  );

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
    setPreviews((prev) => [...prev, ...encoded].slice(0, 8));
  }

  function removePreview(index: number) {
    setPreviews((prev) => prev.filter((_, i) => i !== index));
  }

  async function submit(formData: FormData) {
    setState("submitting");
    setMessage("");

    const payload = {
      group,
      title: formData.get("title"),
      purpose: formData.get("purpose"),
      category: isCar ? "car" : formData.get("category"),
      location: formData.get("location"),
      district: formData.get("district"),
      price: Number(formData.get("price")),
      currency: "RWF",
      bedrooms: !isCar ? (Number(formData.get("bedrooms") || 0) || undefined) : undefined,
      bathrooms: !isCar ? (Number(formData.get("bathrooms") || 0) || undefined) : undefined,
      areaSqm: Number(formData.get("areaSqm") || 0) || undefined,
      summary: formData.get("summary"),
      features: String(formData.get("features") || "")
        .split(",")
        .map((f) => f.trim())
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
      setMessage("Listing saved as draft. You can publish it from the dashboard.");
      setPreviews([]);
      setFormKey((k) => k + 1); // reset form fields
      onSuccess?.();
      return;
    }

    const result = await response.json().catch(() => null);
    setState("error");
    setMessage(result?.error ?? "Could not save listing. Check your environment variables.");
  }

  return (
    <form
      key={formKey}
      action={submit}
      className="grid gap-5 rounded-2xl border border-line bg-surface p-5 shadow-sm"
    >
      {/* ── Group selector ──────────────────────────────────────────── */}
      <div>
        <p className="mb-2 text-sm font-semibold">Listing type</p>
        <div className="flex gap-2">
          {(["properties", "cars"] as const).map((g) => (
            <button
              key={g}
              type="button"
              onClick={() => setGroup(g)}
              className={`flex-1 rounded-xl border py-2.5 text-sm font-bold capitalize transition ${
                group === g
                  ? "border-brand bg-brand text-white"
                  : "border-line bg-background text-muted hover:border-brand/40 hover:text-foreground"
              }`}
            >
              {g === "properties" ? "🏠 Property" : "🚗 Car"}
            </button>
          ))}
        </div>
      </div>

      {/* ── Main fields ─────────────────────────────────────────────── */}
      <div className="grid gap-4 md:grid-cols-2">
        <label className="grid gap-2 text-sm font-semibold md:col-span-2">
          {isCar ? "Car title" : "Property title"}
          <input
            name="title"
            required
            placeholder={isCar ? "Range Rover Sport HSE for executive hire" : "Furnished villa in Kibagabaga"}
            className="h-12 rounded-xl border border-line bg-background px-4 font-normal outline-none focus:border-brand focus:ring-4 focus:ring-brand/10"
          />
        </label>

        <label className="grid gap-2 text-sm font-semibold">
          Purpose
          <select name="purpose" className="h-12 rounded-xl border border-line bg-background px-4 font-normal outline-none focus:border-brand">
            <option value="rent">For rent</option>
            <option value="sale">For sale</option>
          </select>
        </label>

        {!isCar && (
          <label className="grid gap-2 text-sm font-semibold">
            Category
            <select name="category" className="h-12 rounded-xl border border-line bg-background px-4 font-normal capitalize outline-none focus:border-brand">
              {propertyCategories.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </label>
        )}

        <label className="grid gap-2 text-sm font-semibold">
          Location / neighbourhood
          <input
            name="location"
            required
            list="location-list"
            placeholder="Kibagabaga"
            className="h-12 rounded-xl border border-line bg-background px-4 font-normal outline-none focus:border-brand"
          />
          <datalist id="location-list">
            {LOCATIONS.map((loc) => <option key={loc} value={loc} />)}
          </datalist>
        </label>

        <label className="grid gap-2 text-sm font-semibold">
          District
          <input
            name="district"
            required
            placeholder="Gasabo"
            className="h-12 rounded-xl border border-line bg-background px-4 font-normal outline-none focus:border-brand"
          />
        </label>

        <label className="grid gap-2 text-sm font-semibold">
          Price (RWF)
          <input
            name="price"
            type="number"
            min="0"
            required
            placeholder={isCar ? "230000" : "3200000"}
            className="h-12 rounded-xl border border-line bg-background px-4 font-normal outline-none focus:border-brand"
          />
        </label>

        <label className="grid gap-2 text-sm font-semibold">
          Area m² {isCar ? "(optional)" : ""}
          <input
            name="areaSqm"
            type="number"
            min="0"
            className="h-12 rounded-xl border border-line bg-background px-4 font-normal outline-none focus:border-brand"
          />
        </label>

        {!isCar && (
          <>
            <label className="grid gap-2 text-sm font-semibold">
              Bedrooms
              <input
                name="bedrooms"
                type="number"
                min="0"
                className="h-12 rounded-xl border border-line bg-background px-4 font-normal outline-none focus:border-brand"
              />
            </label>

            <label className="grid gap-2 text-sm font-semibold">
              Bathrooms
              <input
                name="bathrooms"
                type="number"
                min="0"
                className="h-12 rounded-xl border border-line bg-background px-4 font-normal outline-none focus:border-brand"
              />
            </label>
          </>
        )}

        <label className="grid gap-2 text-sm font-semibold">
          Call phone
          <input
            name="phone"
            required
            placeholder="+250788334207"
            defaultValue="+250788334207"
            className="h-12 rounded-xl border border-line bg-background px-4 font-normal outline-none focus:border-brand"
          />
        </label>

        <label className="grid gap-2 text-sm font-semibold">
          WhatsApp phone
          <input
            name="whatsapp"
            required
            placeholder="+250788334207"
            defaultValue="+250788334207"
            className="h-12 rounded-xl border border-line bg-background px-4 font-normal outline-none focus:border-brand"
          />
        </label>
      </div>

      <label className="grid gap-2 text-sm font-semibold">
        Short description (min 20 characters)
        <textarea
          name="summary"
          required
          rows={4}
          placeholder="Describe the listing clearly — location benefits, features, nearby landmarks…"
          className="rounded-xl border border-line bg-background p-4 font-normal leading-relaxed outline-none focus:border-brand"
        />
      </label>

      <label className="grid gap-2 text-sm font-semibold">
        Features — comma separated
        <input
          name="features"
          placeholder={isCar ? "Driver option, Airport pickup, 4x4, Automatic" : "Furnished, Rooftop, Parking, Generator"}
          className="h-12 rounded-xl border border-line bg-background px-4 font-normal outline-none focus:border-brand"
        />
      </label>

      {/* ── Image upload ─────────────────────────────────────────────── */}
      <div>
        <label className="grid cursor-pointer place-items-center rounded-xl border-2 border-dashed border-brand/30 bg-brand-soft/30 p-6 text-center transition hover:border-brand/60 hover:bg-brand-soft/50">
          <input
            type="file"
            accept="image/*"
            multiple
            className="sr-only"
            onChange={(e) => onFiles(e.target.files)}
          />
          <span className="grid gap-2 justify-items-center text-brand-dark">
            <UploadCloud size={28} />
            <strong className="text-sm">Click to upload images</strong>
            <span className="text-xs text-muted">
              {previews.length > 0
                ? `${previews.length} / 8 images selected`
                : "Up to 8 images — first becomes the card cover"}
            </span>
          </span>
        </label>

        {previews.length > 0 && (
          <div className="mt-3 grid grid-cols-4 gap-2 sm:grid-cols-6 lg:grid-cols-8">
            {previews.map((src, i) => (
              <div key={i} className="group relative aspect-square overflow-hidden rounded-lg border border-line bg-surface-soft">
                <Image src={src} alt={`Preview ${i + 1}`} fill className="object-cover" unoptimized />
                {i === 0 && (
                  <span className="absolute bottom-0 left-0 right-0 bg-brand py-0.5 text-center text-[9px] font-black text-white">
                    COVER
                  </span>
                )}
                <button
                  type="button"
                  onClick={() => removePreview(i)}
                  className="absolute right-1 top-1 hidden size-5 items-center justify-center rounded-full bg-black/60 text-white group-hover:flex"
                >
                  <X size={10} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── Feedback ─────────────────────────────────────────────────── */}
      {message && (
        <p
          className={`rounded-xl px-4 py-3 text-sm font-semibold ${
            state === "error" ? "bg-red-50 text-red-700" : "bg-emerald-50 text-emerald-700"
          }`}
        >
          {message}
        </p>
      )}

      <button
        type="submit"
        disabled={!canSubmit}
        className="h-12 rounded-full bg-brand px-6 text-sm font-bold text-white transition hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-50"
      >
        {state === "submitting" ? "Uploading & saving…" : "Save listing draft"}
      </button>
    </form>
  );
}
