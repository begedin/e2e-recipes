const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const assetsDir = path.join(__dirname, ".");

module.exports = (env, options) => ({
  entry: [`${assetsDir}/js/app.js`, `${assetsDir}/css/app.scss`],
  output: {
    path: path.resolve(__dirname, "../priv/static"),
    filename: "js/app.js",
    publicPath: "/",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.(sass|scss)$/,
        include: /css/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: "css-loader",
            options: {
              sourceMap: true,
            },
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: true,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "css/app.css",
      chunkFilename: "css/app.[id].css",
    }),
    new CopyWebpackPlugin({
      patterns: [{ from: "./static" }],
    }),
  ],
});
