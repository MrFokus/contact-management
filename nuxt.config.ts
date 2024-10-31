// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  ssr:false,
  css: ['~/assets/styles/main.css'],
  modules: ['@vueuse/nuxt','@nuxtjs/tailwindcss'],
  devtools: { enabled: false }
})