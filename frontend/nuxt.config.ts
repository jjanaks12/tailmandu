import tailwindcss from "@tailwindcss/vite"

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  modules: [
    '@nuxt/fonts',
    '@pinia/nuxt',
    'shadcn-nuxt',
    '@vueuse/nuxt',
    'pinia-plugin-persistedstate',
    'nuxt-charts'
  ],

  css: ['@/assets/css/main.css'],

  shadcn: {
    prefix: '',
    componentDir: './components/ui'
  },

  vite: {
    plugins: [
      tailwindcss()
    ]
  },

  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
      bodyAttrs: {
        class: 'text-gray-400'
      }
    }
  },

  runtimeConfig: {
    public: {
      appName: process.env.NUXT_APP_NAME,
      apiUrl: process.env.NUXT_API_URL
    }
  },

  router: {
    options: {
      linkExactActiveClass: 'nav--active',
      linkActiveClass: ''
    }
  }
})