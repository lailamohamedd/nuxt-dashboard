// Nuxt Configuration File
// Documentation: https://nuxt.com/docs/api/configuration/nuxt-config

import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  ssr: false,
  // Compatibility date for Nuxt features and updates
  compatibilityDate: "2024-11-01",

  // Enable or disable Nuxt DevTools
  devtools: { enabled: false },

  // Global CSS files to be included
  css: ["/public/css/main.css"],

  // Enable dark mode using CSS class
  darkMode: "class",

  // Define Nuxt plugins and their mode (client-side only)
  plugins: [
    { src: '~/plugins/vue-apexcharts', mode: 'client' }, // Client-side only plugin
    '~/plugins/i18n.js', // This will run on both client and server
  ],

  // Runtime configuration for secure environment variables
  runtimeConfig: {
    jwtSecret: process.env.JWT_SECRET || "supersecret", // JWT secret key
  },

  // Vite configuration for additional plugins and extensions
  vite: {
    plugins: [tailwindcss()],
    variants: {
      extend: {
        display: ["focus-group"], // Extend Tailwind CSS variants
      },
    },
  },

  // Global application settings
  app: {
    head: {
      title: "Manager Pro", // Default page title

      // Scripts to be included in the HTML head
      script: [
        {
          innerHTML: `
            (function() {
              const theme = localStorage.getItem("theme") || "light";
              document.documentElement.classList.toggle("dark", theme === "dark");
            })();
          `,
          type: "text/javascript",
        },
      ],

      // Meta tags for SEO optimization
      meta: [
        {
          name: "description",
          content:
            "A modern and responsive admin dashboard for managing application data efficiently.",
        },
        {
          name: "keywords",
          content:
            "Admin Panel, Dashboard, Nuxt, Vue, TailwindCSS, Control Panel",
        },
        { name: "author", content: "Laila Mohamed" },
        {
          property: "og:title",
          content: "Admin Dashboard - Powerful Control Panel",
        },
        {
          property: "og:description",
          content:
            "Manage your application efficiently with our intuitive and responsive admin dashboard.",
        },
        { property: "og:image", content: "/images/logo.png" },
        { name: "robots", content: "index, follow" }, // Allow indexing by search engines
      ],

      // External stylesheets and icons
      link: [
        {
          rel: "stylesheet",
          href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css",
        },
        { rel: "icon", type: "image/png", href: "/images/logo.png" }, // Favicon
      ],

      // Default HTML attributes
      htmlAttrs: {
        class: "dark", // Enable dark mode by default
      },
    },
  },

  // Nuxt modules to be used in the project
  modules: ['@pinia/nuxt'], // State management with Pinia
});
