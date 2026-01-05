import tailwindcss from "@tailwindcss/vite"

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  modules: [
    '@nuxt/fonts',
    '@pinia/nuxt',
    '@vite-pwa/nuxt',
    'shadcn-nuxt',
    '@vueuse/nuxt',
    'pinia-plugin-persistedstate',
    'nuxt-charts',
    'nuxt-tiptap-editor'
  ],

  css: ['@/assets/css/main.css', 'swiper/css'],


  app: {
    head: {
      title: 'Trailmandu',
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
      bodyAttrs: {
        class: 'text-gray-400'
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'format-detection', content: 'telephone=no' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      ]
    },
  },

  shadcn: {
    prefix: '',
    componentDir: './components/ui'
  },

  vite: {
    plugins: [
      tailwindcss()
    ],
    server: {
      allowedHosts: process.env.NUXT_ALLOWED_HOSTS
    }
  },

  runtimeConfig: {
    public: {
      appName: process.env.NUXT_APP_NAME,
      serverUrl: process.env.NUXT_SERVER_URL,
      apiUrl: process.env.NUXT_API_URL,
      mailAdmin: process.env.NUXT_MAIL_ADMIN,
    }
  },

  router: {
    options: {
      linkExactActiveClass: 'nav--active',
      linkActiveClass: ''
    }
  },

  pwa: {
    manifest: {
      name: 'Trailmandu Nepal Pvt. Ltd.',
      short_name: 'Trailmandu',
      start_url: '/',
      display: 'standalone',
      theme_color: '#f06723',
      background_color: '#ffffff',
      description: 'From the City to the Peaks: Trailmandu’s Adventure Runs in Nepal\'s Natural Scenic Routes',
      icons: [
        {
          src: '/android-chrome-192x192.png',
          sizes: '192x192',
          type: 'image/png'
        },
        {
          src: '/android-chrome-512x512.png',
          sizes: '512x512',
          type: 'image/png'
        }
      ]
    }
  }
})