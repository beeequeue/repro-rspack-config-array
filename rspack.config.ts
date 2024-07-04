import { DefinePlugin, HtmlRspackPlugin, SwcLoaderOptions } from "@rspack/core"
import type { Configuration } from "@rspack/cli"

const amount = Number(process.env.AMOUNT)
console.log(`Building ${amount} configs...`)

const createConfig = (_: unknown, index: number) => ({
  context: __dirname,
  entry: {
    main: "./src/main.jsx",
  },
  output: {
    filename: `${index}/main.js`,
  },
  module: {
    rules: [
      {
        test: /\.(j|t)sx?$/,
        type: "javascript/auto",
        loader: "builtin:swc-loader",
        options: {
          jsc: {
            parser: {
              syntax: "ecmascript",
              jsx: true,
            },
            target: "es2022",
            transform: { react: { runtime: "automatic" } },
          },
        } satisfies SwcLoaderOptions,
      },
      {
        test: /\.svg$/,
        type: "asset",
      },
    ],
  },
  experiments: { css: true },
  plugins: [
    new HtmlRspackPlugin({
      template: "./index.html",
    }),
    new DefinePlugin({
      DATA: JSON.stringify({ [amount.toString()]: amount }),
    })],
}) satisfies Configuration

export = Array.from({ length: amount }).map(createConfig)
