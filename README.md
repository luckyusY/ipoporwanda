Ipopo Rwanda is a fast Vercel-ready real estate marketplace for Kigali property rentals and sales.

## Stack

- Next.js App Router, React, TypeScript, Tailwind CSS
- Motion for tasteful page reveals
- Lenis for smooth scrolling
- MongoDB/Mongoose for listings
- Cloudinary for listing image uploads
- `next/image`, metadata, and JSON-LD for speed and SEO

## Environment

Copy `.env.example` to `.env.local` and fill in the real values:

```env
NEXT_PUBLIC_SITE_URL=
MONGODB_URI=
MONGODB_DB=ipoporwanda
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

Never commit `.env.local`. Add the same secrets in Vercel project settings for production and preview deployments.

## Development

```bash
npm run dev
```

Public pages fall back to sample property data when `MONGODB_URI` is missing, so the site can build before production secrets are configured. The admin listing studio requires MongoDB and Cloudinary env vars to save drafts.

## Routes

- `/` public landing page
- `/properties` searchable listing page
- `/properties/[slug]` SEO-friendly property details
- `/admin` owner listing studio with image previews

## Notes

Cars for sale and cars for rent are modeled in the category config but hidden from the public UI for now. Public navigation is focused on properties only.

Run checks before deploy:

```bash
npm run lint
npm run build
```
