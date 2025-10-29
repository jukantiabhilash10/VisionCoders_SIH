// CommonJS PostCSS config so Node loads it when package.json uses "type": "module"
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
