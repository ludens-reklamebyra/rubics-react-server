import fs from "fs";
import path from "path";
import { CleanWebpackPlugin } from "clean-webpack-plugin";
import { NODE_ENV } from "./constants.js";

const components = {};
const files = fs.readdirSync(path.join(path.resolve(), "client/components"));

for (const file of files) {
  if (file.endsWith(".jsx")) {
    components[
      `components/${path.basename(file, ".jsx")}`
    ] = `./client/components/${file}`;
  }
}

export default {
  mode: NODE_ENV,
  entry: {
    main: "./client/client.jsx",
    ...components,
  },
  module: {
    rules: [
      {
        test: /\.(jsx)$/,
        exclude: /node_modules/,
        resolve: {
          extensions: [".jsx", ".js", "*"],
        },
        use: ["babel-loader"],
      },
    ],
  },
  optimization: {
    splitChunks: {
      chunks: "all",
    },
  },
  output: {
    filename: "[name].js",
    path: path.join(path.resolve(), "public"),
  },
  plugins: [new CleanWebpackPlugin()],
};
