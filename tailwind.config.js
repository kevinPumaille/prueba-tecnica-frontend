/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors:{
        black: '#000000',
        white: '#fafafa',
        bgMain: '#f5f5f5',
        bgDetailPrimary: '#41022e',
        bgDetailHeader:'#5a0b35',
        colorLight: "#fafafa",
        hoverBtnClaro: '#933d79',
        hoverBtnAgregar: '#0b213511',
        bgInput: '#fdf8f8'
      },
      boxShadow: {
        custom: '0px 0px 15px -3px rgba(0,0,0,0.1)',
      }
    },
  },
  plugins: [],
}

