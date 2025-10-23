# AudioVault — Next.js E-commerce

A full-stack shopping platform built with **Next.js 15**, **React 19**, **TypeScript**, **Prisma + PostgreSQL**, and **Vercel**.
It implements real payments (**Stripe** + **PayPal**), file uploads (**UploadThing**), transactional email (**Resend**), authentication, an admin dashboard, and more.

---

## Features

- ⚛️ **Next.js 15 (App Router) + React 19**
- 🔐 **Auth** with sessions, JWT & cookies (NextAuth)
- 🗄️ **PostgreSQL** database with **Prisma** ORM & schema migrations
- 🛒 Products, categories, cart, checkout, orders, users
- 💳 **Stripe** & **PayPal** integrations (sandbox ready)
- ✉️ **Resend** for order and account emails
- 🖼️ **UploadThing** for secure image uploads
- 📊 **Admin dashboard**: products, orders, users, stats
- ✅ Type-safe forms with **React Hook Form** + **Zod**
- 🚀 CI-friendly, Vercel-ready deployment

---

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript, Next/Image, Tailwind
- **State / Data**: Server Actions, fetch, React Hook Form
- **Validation**: Zod
- **Backend**: Next.js Route Handlers, Prisma
- **DB**: PostgreSQL (Neon)
- **Payments**: Stripe, PayPal
- **Email**: Resend
- **Uploads**: UploadThing
- **Auth**: NextAuth
- **Deploy**: Vercel

---

## Local Setup

### 1) Clone & install

```bash
git clone https://github.com/paulkochuiev/audio-vault.git
cd audiovault
npm install
```

### 2) Environment variables

Create a `.env` file in the project root:

```env
# App
NEXT_PUBLIC_APP_NAME="AudioVault"
NEXT_PUBLIC_APP_DESC="E-commerce platform for music equipment distribution"
NEXT_PUBLIC_SERVER_URL="http://localhost:3000"
AUTH_TRUST_HOST=true

# Database
DATABASE_URL="postgresql://<user>:<password>@<host>/<db>?sslmode=require"

# NextAuth
NEXTAUTH_SECRET="<strong-random-string>"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_URL_INTERNAL="http://localhost:3000"

# Payments
PAYMENT_METHOD="PayPal, Stripe, CashOnDelivery"
DEFAULT_PAYMENT_METHOD="PayPal"

# PayPal (sandbox)
PAYPAL_CLIENT_ID="<sandbox-client-id>"
PAYPAL_APP_SECRET="<sandbox-secret>"
PAYPAL_API_URL="https://api-m.sandbox.paypal.com"

# Stripe (test)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."   # if using webhooks locally

# UploadThing
UPLOADTHING_TOKEN="sk_live_or_dev_..."
UPLOADTHING_SECRET="sk_live_or_dev_..."
UPLOADTHING_APPID="..."

# Resend
RESEND_API_KEY="re_..."
EMAIL_FROM="no-reply@your-domain.com"

# Optional: UploadThing callback if using another domain
UPLOADTHING_CALLBACK_URL="http://localhost:3000/api/uploadthing"
```

> Tip: Use **Neon** for a quick Postgres and **Stripe/PayPal sandbox** keys for testing.

### 3) Database & seed

```bash
pnpm prisma generate
pnpm prisma migrate dev
# optionally: npm prisma db seed
```

### 4) Run the app

```bash
npm run dev
```

---

## Useful Scripts

```json
{
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "lint": "next lint",
  "prisma:studio": "prisma studio",
  "prisma:migrate": "prisma migrate dev"
}
```

---

## Payments

### Stripe

- Uses Checkout/Payment Intents (test keys).
- Webhook endpoint example: `/api/stripe/webhooks`.
- On `charge.succeeded`, order is marked as paid and confirmation email is sent.

### PayPal

- Sandbox client/secret via `.env`.
- Classic server-side capture flow during checkout.

---

## Email (Resend)

Transactional messages (order confirmation, etc.) are sent through **Resend**.
Configure `RESEND_API_KEY` and `EMAIL_FROM`, then call your email sender utility inside order flows.

---

## Uploads (UploadThing)

Product and profile images are uploaded to **UploadThing** with server-side validation.
Set `UPLOADTHING_*` vars. The default callback API route is `/api/uploadthing`.

---

## Testing Cheats

- **Stripe test cards**: 4242 4242 4242 4242 (any future exp, any CVC)
- **PayPal sandbox buyer**: create in developer dashboard
- **Image uploads**: try PNG/JPG within configured limits

---

## Deployment

- Push to GitHub and connect the repo to **Vercel**.
- Set all environment variables in Vercel Project Settings.
- Add a production **Stripe webhook** that points to your deployed `/api/stripe/webhooks`.
- Ensure DB connection string points to a production Postgres (Neon, RDS, etc.).

---

## Troubleshooting

- **Stripe 404/405 on webhook**: confirm the route path and `STRIPE_WEBHOOK_SECRET`; forward events locally with `stripe listen`.
- **Uploads fail**: check `UPLOADTHING_*` keys and callback URL.
- **Emails not sending**: verify `RESEND_API_KEY` and allowed sender domain.
- **Auth callbacks**: make sure `NEXTAUTH_URL` matches your current origin.

---
