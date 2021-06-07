const WorkboxPlugin = require("workbox-webpack-plugin");

module.exports = () => ({
  plugins: [
    new WorkboxPlugin.InjectManifest({
      swSrc: "./public/sw.js",
      exclude: [
        /\.map$/,
        /manifest$/,
        /\.htaccess$/,
        /service-worker\.js$/,
        /sw\.js$/,
      ],
    }),
  ],
});
