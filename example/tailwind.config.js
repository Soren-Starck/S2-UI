/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  safelist: [
    {
      pattern: /(bg|text|border|shadow)-(blue|gray|pink)-(50|200|300|500|600|800|900)/,
      variants: ['hover'],
    },
    {
      pattern: /(py|px|p|m|mx|my|mt|mb|mr|ml)-(1|2|3|4|6|8)/,
    },
    {
      pattern: /rounded(-md)?/,
    },
    {
      pattern: /(w|h)-full/,
    },
    {
      pattern: /(text)-(xs|sm|base|lg|xl|2xl|3xl)/,
    },
    {
      pattern: /(font)-(normal|medium|bold)/,
    },
    {
      pattern: /(grid-cols)-(1|2|3)/,
    },
    {
      pattern: /(gap)-(4)/,
    },
    {
      pattern: /(cursor)-(pointer|not-allowed)/,
    },
    {
      pattern: /(opacity)-(50)/,
    },
    {
      pattern: /(overflow)-(hidden)/,
    },
    {
      pattern: /(items)-(center)/,
    },
    {
      pattern: /(flex)/,
    },
    {
      pattern: /(container)/,
    },
    {
      pattern: /(transition)-(colors)/,
    },
  ],
}; 