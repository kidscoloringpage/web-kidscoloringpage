const plugin = require('tailwindcss/plugin');
const { fontFamily } = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"DM Sans"', ...fontFamily.sans],
        sansita: ['Sansita'],
        wonderbar: ['Wonderbar'],
      },

    },
  },
  plugins: [
    plugin(function ({ addBase }) {
      addBase({
        '@font-face': {
          fontFamily: 'Wonderbar',
          src: 'url(/fonts/wonderbar.otf)'
        }
      })
    }),
    plugin(function ({ addBase }) {
      addBase({
        '@font-face': {
          fontFamily: 'Damion',
          fontWeight: '400',
          src: 'url(https://fonts.gstatic.com/s/damion/v10/hv-XlzJ3KEUe_YZkamw2.woff2) format(\'woff2\')'
        }
      })
    }),
  ],
};