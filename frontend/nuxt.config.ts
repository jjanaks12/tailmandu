import { nodePolyfills } from 'vite-plugin-node-polyfills'
import tailwindcss from "@tailwindcss/vite"

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  site: {
    url: process.env.NUXT_PUBLIC_SITE_URL || 'https://trailmandu.com',
  },
  sitemap: {
    exclude: ['/dashboard/**']
  },
  modules: [
    '@nuxt/fonts',
    '@pinia/nuxt',
    '@vite-pwa/nuxt',
    'shadcn-nuxt',
    '@vueuse/nuxt',
    'pinia-plugin-persistedstate',
    'nuxt-charts',
    'nuxt-tiptap-editor',
    '@nuxtjs/i18n',
    'nuxt-swiper',
    '@nuxtjs/sitemap'
  ],

  css: ['@/assets/css/main.css', 'swiper/css', 'vue-sonner/style.css'],

  i18n: {
    locales: [{
      code: 'en',
      file: 'en.json',
      name: 'English'
    }, {
      code: 'np',
      file: 'np.json',
      name: 'Nepali'
    }],
    defaultLocale: 'en'
  },

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
      tailwindcss(),
      nodePolyfills({
        include: ["url"],
        globals: {
          process: true
        }
      })
    ],
    server: {
      allowedHosts: (process.env.NUXT_ALLOWED_HOSTS ?? []) as string[]
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
    workbox: {
      navigateFallback: null
    },
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
  },

  hooks: {
    'components:extend'(components: any[]) {
      // Group all components by name
      const componentGroups: Record<string, any[]> = {}
      for (const c of components) {
        if (!componentGroups[c.pascalName || c.name]) {
          componentGroups[c.pascalName || c.name] = []
        }
        componentGroups[c.pascalName || c.name].push(c)
      }
      
      // Deduplicate any component that has been registered multiple times
      for (const [name, duplicates] of Object.entries(componentGroups)) {
        if (duplicates.length > 1) {
          // Prefer keeping the local component from components/ui/
          const toKeep = duplicates.find(c => c.filePath.includes('components/ui')) || duplicates[0]
          
          // Remove all duplicate instances
          for (let i = components.length - 1; i >= 0; i--) {
            if ((components[i].pascalName || components[i].name) === name) {
              components.splice(i, 1)
            }
          }
          
          // Re-add the chosen one to suppress the overriding warning
          components.push(toKeep)
        }
      }
    }
  }
})