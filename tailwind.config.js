module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      keyframes: {
        show: {
          '0%': { visibility: 'hidden', opacity: '0' },
          '15%': { visibility: 'hidden', opacity: '0' },
          '100%': { visibility: 'visible', opacity: '100' },
        },
        fade: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 }
        },
        rumble: {
          '0%': {
            transform: 'translate(0px)'
          },
          '25%': {
            transform: 'translate(3px)'
          },
          '50%': {
            transform: 'translate(0px)'
          },
          '75%': {
            transform: 'translate(-3px)'
          },
          '100%': {
            transform: 'translate(0px)'
          }
        }
      },
      animation: {
        show: 'show 0.3s ease forwards',
        fadeIn: 'fade 0.1s linear forwards',
        fadeOut: 'fade 0.1s linear forwards reverse',
        rumble: 'rumble 0.2s linear'
      }
    },
  },
  variants: {
    extend: {
      animation: ['hover', 'group-hover'],
    },
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          "primary": "#C20024",
          "secondary": "#224B8F",
          "base-100": "#FFFFFD",
          "base-200": "#F6F7F8",
          "accent": "#525252",
          "error": "#FFFFFD",
        },
      },
    ],
  },
  plugins: [
    require("daisyui")
  ],
}
