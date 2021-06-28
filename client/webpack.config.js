const webpack = require("webpack");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const copyWebpackPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const Dotenv = require("dotenv-webpack");
const { merge: webpackMerge } = require("webpack-merge");
const path = require("path");

const modeConfig = (env) =>
  require(`./build-utils/webpack.${env.mode}.js`)(env);
const loadPresets = require("./build-utils/loadPresets");

const dotEnvPlugin = new Dotenv();
const cleanPlugin = new CleanWebpackPlugin();
const hotReloadPlugin = new webpack.HotModuleReplacementPlugin();
const miniCssPlugin = new MiniCssExtractPlugin({
  filename: "[name].[contenthash].css",
  chunkFilename: "[id].[contenthash].css",
});
const htmlPlugin = new HtmlWebPackPlugin({
  template: "./public/index.html",
  filename: "./index.html",
});
const providePlugin = new webpack.ProvidePlugin({
  Buffer: ["buffer", "Buffer"],
  process: "process/browser",
});
const copyPlugin = new copyWebpackPlugin({
  patterns: [
    {
      from: "src/assets",
      to: "images/",
      noErrorOnMissing: true,
    },
    "public/manifest.json",
  ],
});

module.exports = (env) => {
  return webpackMerge(
    {
      mode: env.mode,
      optimization: {
        nodeEnv: env.mode,
        splitChunks: {
          chunks: "all",
        },
      },
      output: {
        filename: "[name].js",
        path: path.resolve(__dirname, "dist"),
        assetModuleFilename: "images/[hash][ext][query]",
      },
      resolve: {
        extensions: [".ts", ".js", ".json"],
        fallback: {
          util: require.resolve("util/"),
          assert: require.resolve("assert/"),
          os: require.resolve("os-browserify/browser"),
          https: require.resolve("https-browserify"),
          http: require.resolve("stream-http"),
          crypto: require.resolve("crypto-browserify"),
          stream: require.resolve("stream-browserify"),
        },
        alias: {
          components: path.resolve(__dirname, "src/components/"),
          containers: path.resolve(__dirname, "src/containers/"),
          helpers: path.resolve(__dirname, "src/helpers/"),
          assets: path.resolve(__dirname, "src/assets/"),
          ducks: path.resolve(__dirname, "src/ducks/"),
          services: path.resolve(__dirname, "src/services/"),
        },
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
            test: /\.svg$/,
            use: [
              {
                loader: "svg-url-loader",
                options: {
                  // Inline files smaller than 10 kB
                  limit: 10 * 1024,
                  noquotes: true,
                },
              },
            ],
          },
          {
            test: /\.(jpg|jp(e)g|png|gif)$/,
            type: "asset",
            parser: {
              dataUrlCondition: {
                maxSize: 8 * 1024, // 8kb
              },
            },
          },
        ],
      },

      plugins: [
        htmlPlugin,
        miniCssPlugin,
        cleanPlugin,
        copyPlugin,
        dotEnvPlugin,
        providePlugin,
        hotReloadPlugin,
      ],
    },
    modeConfig({ mode: env.mode }),
    loadPresets({ mode: env.mode, presets: env.presets })
  );
};
