module.exports = {
  darkMode: 'class', // Habilita modo escuro com classe .dark
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#FF5A00', // Laranja Casaé
        darkBg: '#0F172A',  // Azul escuro premium
        lightBg: '#FFFFFF',
        textLight: '#F1F5F9',
        textDark: '#1E293B',
      },
    },
  },
  plugins: [],
};
