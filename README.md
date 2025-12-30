# KretruTosh Consulting - Headless CMS & Website
A bespoke, high-performance consulting website features a fully integrated Headless CMS admin panel. Built to enable "GTM Velocity" through a dynamic, block-based page builder and structured content management.

## 🚀 Key Features
Dynamic Block-Based Page Builder: Admins can construct pages (Home, About, etc.) by stacking and reordering custom components (Heroes, Grids, Sliders, CTAs).

### Structured Resource Management: Dedicated Admin CRUD interfaces for complex data types:

* Transformation Programs (5-Pillar Model)

* Proprietary Frameworks (Rich content with custom icons)

* Industries (Sector-specific deep dives)

* Impact & Case Studies (Filterable outcomes)

* Thought Leadership Hub: Centralized management for Books, Podcasts (YouTube integration), Whitepapers, Articles, and Assessments.

* Global Layout Control: Dynamic Header/Footer management, including logos, social links, and navigation dropdowns managed via the Admin Panel.

* Performance & SEO: Built on Vite for speed, with react-helmet-async for dynamic meta tags and Open Graph data per page.

### Visual Polish:

* Scroll-reveal animations (framer-motion)

* Live number counters (react-countup)

* Responsive, premium consulting aesthetic (Tailwind CSS + Ant Design).

## 🛠 Tech Stack
* Frontend Framework: React 18 + TypeScript + Vite

* Admin Framework: Refine (Ant Design Adapter)

* Styling: Tailwind CSS (Public Site) + Ant Design (Admin Panel)

* Backend / Database: Supabase (PostgreSQL)

* Authentication: Supabase Auth

* Storage: Supabase Storage (for images and assets)

* Icons: Lucide React

## 📦 Project Structure
```
src/
├── components/
│   ├── admin/          # Admin-specific components (PageBuilder, ImageUpload)
│   ├── blocks/         # The visual building blocks (Hero, StatsGrid, etc.)
│   ├── Footer.tsx      # Global Footer
│   └── Header.tsx      # Global Header
├── lib/                # Supabase client configuration
├── pages/
│   ├── admin/          # Admin CRUD pages (programs, industries, etc.)
│   ├── contact/        # Contact page logic
│   ├── frameworks/     # Public framework detail pages
│   ├── impact/         # Case studies grid page
│   ├── industries/     # Public industry detail pages
│   ├── programs/       # Public program detail pages
│   ├── resources/      # Book, Podcast, Articles pages
│   └── DynamicPage.tsx # The engine that renders pages based on Blocks
├── types/              # TypeScript interfaces for DB and Blocks
├── App.tsx             # Main Router and Layout configuration
└── BlockRenderer.tsx   # Maps JSON block data to React components
```
## 🚀 Getting Started
1. Prerequisites
Node.js (v18+)

A Supabase project (Free tier works fine)

2. Installation
Bash

# Clone the repository
git clone https://github.com/your-username/kretrutosh-website.git

# Navigate into the folder
cd kretrutosh-website

# Install dependencies
npm install
3. Environment Setup
Create a .env file in the root directory:

```
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```
4. Database Setup (Supabase)
Run the SQL scripts provided in the sql/ folder (or from the project documentation) to create the necessary tables:

* pages (Stores JSON layout for dynamic pages)

* programs, frameworks, industries (Rich content tables)

* case_studies, videos, articles, book, whitepapers, assessments

* page_contact (Global settings, logo, social links)

* Storage: Create a Public Bucket named images in Supabase Storage.

5. Run Local Server
```
npm run dev
```
The app will launch at http://localhost:5173.

Website: https://kretrutosh-website.vercel.app

Admin Panel: https://kretrutosh-website.vercel.app/admin (Requires login)

## 🌐 Deployment (Vercel)
This project is optimized for Vercel deployment.

* Push to GitHub.

* Import to Vercel: Select the repository.

* Build Settings:

* Framework Preset: Vite

* Output Directory: dist

* Environment Variables: Add your VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in Vercel settings.

* SPA Routing: The project includes a vercel.json file to handle client-side routing (fixing 404 errors on refresh).

* vercel.json content:

```
JSON
{
  "rewrites": [
    {
      "source": "/((?!api/.*).*)",
      "destination": "/index.html"
    }
  ]
}
```
## 📝 Admin Panel Guide
To access the CMS:

Go to https://kretrutosh-website.vercel.app/admin

Log in with your authenticated Supabase credentials.

* Website Pages: Edit the Home page layout using the drag-and-drop builder.

* Resources: Use the sidebar to manage Programs, Frameworks, Industries, etc.

Note: Complex sections (like Frameworks) use a tabbed interface to manage rich data (Hero, Process, Outcomes).

## 📄 License
Proprietary software developed for KretruTosh Consulting. All rights reserved.