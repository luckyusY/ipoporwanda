export function formatMoney(price: number, currency: string) {
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
