// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: false },
  css: ["/public/css/main.css"],
  darkMode: "class",
  plugins: [{ src: "~/plugins/vue-apexcharts", mode: "client" }],
  vite: {
    plugins: [tailwindcss()],
    variants: {
      extend: {
        display: ["focus-group"],
      },
    },
  },
  app: {
    head: {
      title: "Manager Pro",

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
        { name: "robots", content: "index, follow" },
      ],
      link: [
        {
          rel: "stylesheet",
          href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css",
        },
        { rel: "icon", type: "image/png", href: "/images/logo.png" },
      ],
      htmlAttrs: {
        class: "dark",
      },
    },
  },
  // axios: {
  //   baseURL: 'https://dummyjson.com/auth/login', 
  // },
});
