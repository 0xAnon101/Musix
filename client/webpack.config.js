const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const copyWebpackPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const { merge: webpackMerge } = require("webpack-merge");
const Path = require("path");

const modeConfig = (env) =>
  require(`./build-utils/webpack.${env.mode}.js`)(env);

const miniCssPlugin = new MiniCssExtractPlugin({
  filename: "[name].[hash].css",
  chunkFilename: "[id].[hash].css",
});

const htmlPlugin = new HtmlWebPackPlugin({
  template: "./public/index.html",
  filename: "./index.html",
});

const cleanPlugin = new CleanWebpackPlugin();

const copyPlugin = new copyWebpackPlugin({
  patterns: [
    {
      from: "src/assets",
      to: "images/",
      noErrorOnMissing: true,
    },
  ],
});

module.exports = (env) => {
  console.log(env.mode);
  return webpackMerge(
    {
      optimization: {
        nodeEnv: env.mode,
      },
      module: {
        rules: [
          {
            test: /\.js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
              loader: "babel-loader",
            },
          },
          {
            test: /\.(png|jpg|jp(e)g|gif|svg)$/i,
            use: [
              {
                loader: "url-loader",
                options: {
                  limit: 8192,
                },
              },
            ],
          },
          {
            test: /\.(ttf|eot|svg|jpg|jp(e)g|png|woff(2)?)(\?[a-z0-9=&.]+)?$/,
            use: [
              {
                loader: "file-loader?name=assets[name].[ext]",
                options: {
                  name(file) {
                    if (env.mode === "development") {
                      return "[path][name].[ext]";
                    }
                    return "[hash].[ext]";
                  },
                },
              },
            ],
          },
        ],
      },
      plugins: [htmlPlugin, miniCssPlugin, cleanPlugin, copyPlugin],
    },
    modeConfig({ mode: env.mode })
  );
};
