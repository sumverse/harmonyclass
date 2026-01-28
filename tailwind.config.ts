import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: [
    {
      pattern: /bg-(red|orange|yellow|blue|purple|pink|green|gray|white)-(50|100|200|300|400|500|600|700|800|900)/,
    },
    {
      pattern: /text-(red|orange|yellow|blue|purple|pink|green|gray|white)-(50|100|200|300|400|500|600|700|800|900)/,
    },
    {
      pattern: /border-(red|orange|yellow|blue|purple|pink|green|gray|white)-(50|100|200|300|400|500|600|700|800|900)/,
    },
    {
      pattern: /from-(purple|pink)-(50|100|500|600)/,
    },
    {
      pattern: /to-(purple|pink)-(50|100|500|600)/,
    },
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['BodyFont', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        title: ['TitleFont', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        body: ['BodyFont', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;
