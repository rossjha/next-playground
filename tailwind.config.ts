import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      'link-default': '#047e76',
      'white': '#ffffff',
      'forest-900': '#082f2f',
      'forest-100': '#f2f6f6',
      'gray-900': '#141414',
      'gray-800': '#212121',
      'gray-700': '#666666',
      'gray-600': '#8d8d8d',
      'gray-500': '#b3b3b3',
      'gray-400': '#d9d9d9',
      'gray-300': '#e8e8e8',
      'gray-200': '#f2f2f2',
      'gray-100': '#f5f5f5',
      'deep-forest': '#082321',
      'forest-green': '#00494b',
      'mauve-700': '#963c75',
      'mauve-200': '#f8ebf3',
    },
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
export default config
