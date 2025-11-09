# </> Hackumi

A **modern, full-stack-ready web application** built using **React, TypeScript, and Vite** to manage and organize hackathons efficiently.  
It features a clean UI built with **TailwindCSS** and **shadcn/ui**, ensuring scalability, responsiveness, and ease of customization.

---

## 🚀 Features

- 🔐 Authentication pages — Sign In / Sign Up  
- 🏁 Landing page with hero sections and feature highlights  
- ⚙️ Modular, reusable components with shadcn/ui integration  
- 🎨 Neo-brutalist theme powered by TailwindCSS  
- 📊 Prebuilt UI utilities (charts, accordions, modals, etc.)  
- ⚡ Lightning-fast development with Vite + React Query  

---

## 🧰 Tech Stack

| Category        | Technology |
|-----------------|-----------|
| Frontend Framework | [React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/) |
| Bundler         | [Vite](https://vitejs.dev/) |
| Styling         | [TailwindCSS](https://tailwindcss.com/) + [PostCSS](https://postcss.org/) |
| UI Components   | [shadcn/ui](https://ui.shadcn.com/) + [Radix UI](https://www.radix-ui.com/) |
| Icons           | [Lucide React](https://lucide.dev/) |
| State & Data    | [TanStack Query](https://tanstack.com/query/latest) |
| Charts          | [Recharts](https://recharts.org/en-US/) |

---

## 🗂️ Project Structure

```bash
.
├── README.md
├── package.json
├── vite.config.ts
├── tailwind.config.ts
├── public/
│   └── robots.txt
└── src/
    ├── App.tsx
    ├── main.tsx
    ├── components/
    │   ├── Navbar.tsx
    │   ├── FeatureCard.tsx
    │   └── ui/        ← Shadcn-based UI library
    ├── hooks/
    │   ├── use-mobile.tsx
    │   └── use-toast.ts
    ├── lib/
    │   └── utils.ts
    └── pages/
        ├── Landing.tsx
        ├── SignIn.tsx
        ├── SignUp.tsx
        └── NotFound.tsx
```

## ⚙️ Setup & Installation
1️⃣ Clone the repository
```git clone https://github.com/navinnaz/hackathon-management-system.git```
```cd hackathon-management-system```

2️⃣ Install dependencies
```npm install```

3️⃣ Run development server
```npm run dev```

App runs at 👉 http://localhost:8080

4️⃣ Build for production
```npm run build```

## 🧩 Scripts
Command	Description
npm run dev	Start development server
npm run build	Build production bundle
npm run preview	Preview production build
npm run lint	Run ESLint checks

## 🎨 Design System

Font: Inter, Space Grotesk
Theme: Neo-brutalism (flat colors, bold borders, strong contrasts)

Colors:

Navy: #11224E
Orange: #F87B1B

Green: #CBD99B

Off-White: #EEEEEE

## 💡 Developer Notes

Uses @/ aliases for cleaner imports.
UI logic follows modular and reusable patterns.
Hooks like use-toast and use-mobile provide interactivity.
Each UI element in src/components/ui is isolated and theme-aware.
