
const config = {
  darkMode: 'media', // Enable dark mode based on OS preference
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './src/app/**/*.tsx',
    './src/components/**/*.tsx',
    './src/app/**/*.js',
    './src/components/**/*.js',
    './src/**/*.html',
  ],
  theme: {
    extend: {
      colors: {
        // Primary accent colors inspired by Shack UI
        accent: '#0EA5E9', // cyan‑500
        foreground: '#111827', // gray‑900
        background: '#F9FAFB', // gray‑50
        muted: '#6B7280', // gray‑500
      },
      borderRadius: {
        xl: '1.5rem',
      },
      backdropBlur: {
        xs: '4px',
        sm: '8px',
        md: '12px',
        lg: '16px',
      },
    },
  },
  plugins: [],
};

export default config;
