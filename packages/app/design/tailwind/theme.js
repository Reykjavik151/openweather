const { COLORS } = require('./colors');
const { FONTS } = require('./fonts');

// Lowercased value of the font family as the key
// and the font family as the value
const fontFamilies = Object.keys(FONTS).reduce((acc, key) => {
  acc[FONTS[key].toLowerCase()] = [FONTS[key], 'sans-serif'];
  return acc;
}, {});

/** @type {import('tailwindcss').Config['theme']} */
const theme = {
  // edit your tailwind theme here!
  // https://tailwindcss.com/docs/adding-custom-styles
  extend: {
    colors: COLORS,
    fontFamily: fontFamilies,
  },
};

module.exports = {
  theme,
};
