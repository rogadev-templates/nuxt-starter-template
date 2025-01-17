// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/image-edge',
    '@nuxtjs/color-mode',
    '@nuxtjs/supabase',
    'nuxt-icon'
  ],
  image: {
    presets: {
      avatar: {
        modifiers: {
          format: 'jpg',
          width: 50,
          height: 50
        }
      }
    }
  },
  colorMode: {
    preference: 'system',
    fallback: 'light',
    classSuffix: ''
  },
  nuxtIcon: {
    size: '24px'
  }
});
