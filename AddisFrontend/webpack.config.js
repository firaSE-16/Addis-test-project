const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const Dotenv = require("dotenv-webpack");

module.exports = {
  entry: "./src/index.jsx",

  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    clean: true,
    publicPath: "/", 
  },

  mode: "development", 

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: "babel-loader",
      },
      {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        use: [
          {
            loader: "@svgr/webpack",
            options: { icon: true },
          },
        ],
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: "asset/resource",
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
    new Dotenv(),
  ],

  resolve: {
    extensions: [".js", ".jsx"],
  },

  devServer: {
    static: path.join(__dirname, "public"),
    port: 9001,
    hot: true,
    open: true,
    historyApiFallback: true, 
  },
};
