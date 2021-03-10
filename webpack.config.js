const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
  entry: "./frontend/index.js",
  output: {
    path: path.join(__dirname, "/publish"),
    filename: "bundle.js",
  },
  devServer: {
    port: 9200,
    contentBase: path.join(__dirname, "publish"),
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: "file-loader",
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./frontend/index.html",
      filename: "index.html",
      inject: "body",
    }),
  ],
};
