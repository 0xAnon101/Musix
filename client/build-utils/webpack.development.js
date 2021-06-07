const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = () => ({
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
            },
          },
          "sass-loader",
        ],
      },
    ],
  },
  plugins: [
    // Copy empty ServiceWorker so install doesn't blow up
    new CopyWebpackPlugin({ patterns: ["./public/sw.js"] }),
  ],
  devtool: "source-map",
});
