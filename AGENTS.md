# Prixair Project Information

## Summary
Prixair is a multi-subsidiary conglomerate web application built with **Next.js 15** and **Payload CMS 3**. It manages various business units including Buka (food), Farms, Homes, Real Estate, and more. The project utilizes a **PostgreSQL** database and **S3-compatible storage** (specifically Supabase) for media management.

## Structure
- [./app/](./app/): Contains the Next.js App Router for both the frontend and Payload CMS admin panel.
- [./collections/](./collections/): Defines Payload CMS collections (Users, Media, Products, Orders, etc.).
- [./components/](./components/): Shared React components, including cart and checkout logic.
- [./public/](./public/): Static assets organized by subsidiary and category.
- [./scripts/](./scripts/): Seeding scripts for initializing subsidiary-specific data and integration tests.
- [./types/](./types/): Global TypeScript definitions and external API types (e.g., Shipday).

## Language & Runtime
**Language**: TypeScript  
**Version**: ^5 (TypeScript), Node.js (Runtime)  
**Build System**: Next.js (Turbopack in development)  
**Package Manager**: npm

## Dependencies
**Main Dependencies**:
- `next`: 15.5.7
- `payload`: ^3.70.0
- `react`/`react-dom`: 19.1.0
- `@payloadcms/db-postgres`: ^3.70.0
- `@payloadcms/storage-s3`: ^3.70.0
- `shipday`: ^1.1.0 (Delivery management)
- `@paystack/inline-js`: ^2.22.7 (Payment processing)
- `framer-motion`: ^12.23.24 (Animations)

**Development Dependencies**:
- `typescript`: ^5
- `tailwindcss`: ^4
- `eslint`: ^9

## Build & Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm build

# Start production server
npm run start
```

## Testing

**Framework**: No formal testing framework (e.g., Jest/Vitest) is currently configured.
**Test Location**: [./scripts/test-shipday.ts](./scripts/test-shipday.ts)
**Integration Scripts**:
- `seed`: General data seeding.
- `seed:toastpan`, `seed:gavi`, `seed:seaside`: Subsidiary-specific seeding.

**Run Command**:
```bash
# Run specific test/seed script
npx tsx scripts/test-shipday.ts
```