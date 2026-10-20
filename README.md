# MedExpert — Medical Expert Search & Recommendation System

A frontend-only medical expert system that helps people in Nigeria figure out which doctor to see. You describe your symptoms, and the app suggests possible conditions, the right type of specialist, and hospitals near you that have that specialist. It also gives basic self-care advice for each condition.

Built by **@Praiseogooluwa** as a final year Computer Science project for **Abdulmumin Maryam**.

## What it does

- Symptom checker with 30+ symptoms grouped by category
- Rule based matching against a knowledge base of 20+ medical conditions
- Ranked results with a confidence score for each possible condition
- Recommended specialist for each result, with urgency level (low, moderate, high)
- Hospital finder covering Lagos, Abuja, Port Harcourt, Ibadan, and Kano
- Therapy guide with self-care steps and clear warning signs
- Book appointment form that emails the request and saves it locally
- Admin panel for editing the knowledge base, password protected

## Tech stack

- Vite + React 19 + TypeScript
- TanStack Start (file based routing, SSR ready)
- Tailwind CSS v4
- Motion (Framer Motion) for animations
- Lucide React for icons
- EmailJS for sending contact and booking emails
- Shadcn UI primitives

## How the data works

There is no real backend. The "database" is a set of static TypeScript files under `src/data/`:

- `symptoms.ts` — list of recognized symptoms
- `diseases.ts` — conditions, linked to symptom IDs, with specialist and urgency
- `specialists.ts` — specialist types
- `hospitals.ts` — Nigerian hospitals with the specialists they offer
- `therapy.ts` — self-care advice for each condition

The matching logic lives in `src/lib/matcher.ts`. It compares your selected symptoms against each disease's symptom list, computes a confidence percentage, and returns ranked results.

Admin edits are saved to `localStorage`. The app always checks `localStorage` first and falls back to the default files. The admin panel has a "Reset to Defaults" button that clears those overrides.

## Run it locally

```
npm install
npm run dev
```

Then open the dev URL printed in your terminal.

To build for production:

```
npm run build
```

## EmailJS

The contact form and the book appointment form both use the same EmailJS template. The credentials live in `src/lib/emailjs.ts`:

- `EMAILJS_SERVICE_ID`
- `EMAILJS_TEMPLATE_ID`
- `EMAILJS_PUBLIC_KEY`

If you want to point them at your own EmailJS service, replace those three values. The template expects: `form_type`, `name`, `email`, `phone`, `hospital`, `specialist`, `date`, `time`, `message`.

## Folder structure

```
src/
  components/          shared UI and layout
    layout/            navbar and footer
    ui/                shadcn primitives
  data/                knowledge base (symptoms, diseases, hospitals, etc)
  lib/                 matcher, emailjs, router shim, utils
  routes/              every page is a file under here
    index.tsx          /
    symptom-checker.tsx
    specialists.tsx
    hospitals.tsx
    therapy-guide.tsx
    book-appointment.tsx
    admin.tsx
    about.tsx
  styles.css           tailwind + design tokens
```

## Admin panel

There is a password protected admin panel at `/admin` for editing the knowledge base and reviewing appointment requests submitted from the booking form. Ask the project author for the password.

## Limitations

- Data persists per browser via `localStorage`, so edits made in the admin panel will not be visible on another device.
- This is a prototype, not a real medical product. It gives guidance, not a diagnosis. Always consult a qualified healthcare professional for any medical concerns.

```
https://medexpert-xi.vercel.app
