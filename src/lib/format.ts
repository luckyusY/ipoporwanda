export function formatMoney(price: number, currency: string) {
  if (currency === "RWF") {
    if (price >= 1_000_000_000) {
      const n = price / 1_000_000_000;
      return `Rwf ${parseFloat(n.toFixed(1))}B`;
    }
    if (price >= 1_000_000) {
      const n = price / 1_000_000;
      return `Rwf ${parseFloat(n.toFixed(1))}M`;
    }
    if (price >= 100_000) {
      return `Rwf ${Math.round(price / 1_000)}K`;
    }
    return `Rwf ${new Intl.NumberFormat("en-RW").format(price)}`;
  }
  return new Intl.NumberFormat("en-RW", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(price);
}

export function toWhatsappUrl(phone: string, title: string) {
  const normalized = phone.replace(/[^\d]/g, "");
  const message = encodeURIComponent(`Hello Ipopo Rwanda, I am interested in: ${title}`);
  return `https://wa.me/${normalized}?text=${message}`;
}

export function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
