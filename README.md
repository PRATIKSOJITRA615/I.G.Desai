# I.G. Desai Vidyasankul - Official Web Portal

Welcome to the official repository for the **I.G. Desai Vidyasankul** website and administration portal. This is a modern, highly responsive Single-Page Application (SPA) built with React and Vite. It serves as the primary digital presence for the school, offering resources for students, parents, and teachers, alongside a built-in admin dashboard for content management.

## 🌟 Key Features

*   **Custom Dynamic Routing**: A lightweight, custom-built routing solution using native `window.history.pushState` and `popstate` events, allowing for seamless page transitions and deep-linking without external heavy router dependencies.
*   **Public Facing Pages**:
    *   **Home Overview**: Featuring a dynamic Hero Carousel showcasing school events, toppers, and facilities.
    *   **About Us & Vision**: Detailed mission and history of the institution.
    *   **Educational Staff**: Categorized views of teachers, trustees, and principals.
    *   **E-Corner**: Specialized portals for Students, Teachers, and Parents.
    *   **Blog Articles**: A beautiful, modular reading layout for school news and PR.
    *   **Vocational Skills & Awards**: Showcasing extracurriculars and achievements.
*   **Secure Admin Dashboard**: 
    *   Accessible via `/admin` routes.
    *   **Staff Management**: Add, edit, and remove faculty members with native image upload capabilities.
    *   **Blog Management**: Create and manage blog posts and PR events.
    *   **Contact Entries**: View inquiries submitted from the public contact form.
*   **Premium Vanilla CSS**: The entire project is styled using highly organized, modern Vanilla CSS variables and utility classes, completely avoiding Tailwind for deeper control over the bespoke "Forest Green and Cream" aesthetic.

## 📂 Project Architecture

```text
src/
├── assets/            # Static images, logos, and background banners
├── components/        # Reusable UI elements
│   ├── blog/          # Modular components for the Blog Article layout (Header, Content, CTAs)
│   ├── Header.jsx     # Main responsive navigation bar
│   ├── Footer.jsx     # Comprehensive bottom navigation and coordinates
│   └── HeroCarousel.jsx # Automated slider for the homepage
├── pages/             # Main public-facing views (Home, About, Events, etc.)
│   └── admin/         # Admin portal views and management screens
│       ├── AdminWrapper.jsx
│       ├── AdminDashboard.jsx
│       ├── BlogManager.jsx
│       └── StaffManager.jsx
├── App.jsx            # Core routing logic and layout shell
├── index.css          # Global CSS variables, resets, and animations
└── main.jsx           # React entry point
```

## 🛠️ Technology Stack

*   **Framework**: React.js 18
*   **Build Tool**: Vite
*   **Styling**: Modern Vanilla CSS3 (Flexbox, Grid, CSS Variables)
*   **Icons**: Lucide React
*   **Deployment**: Ready for Vercel, Netlify, or Firebase Hosting.

## 🚀 Getting Started

To run this project locally on your machine, follow these steps:

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your computer.

### Installation

1. **Clone or Download the Repository**
2. **Navigate to the project directory**:
   ```bash
   cd I.G.Desai
   ```
3. **Install Dependencies**:
   ```bash
   npm install
   ```
4. **Start the Development Server**:
   ```bash
   npm run dev
   ```
5. **View in Browser**: Open your browser and navigate to `http://localhost:5173`.

---
*Designed & Developed by Expert Senior React Developers.*
