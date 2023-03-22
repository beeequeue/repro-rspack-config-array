import type { Configuration } from "@rspack/cli";
import { readdirSync, readFileSync } from "fs";
import path from "path";

const data = readdirSync("data")
  .slice(0, Number(process.env.AMOUNT ?? 1))

console.log(`Building ${data.length} configs...`)

const createConfig = (fileName: string) => ({
  context: __dirname,
  entry: {
    main: "./src/main.jsx"
  },
  output: {
    filename: `${path.basename(fileName, ".json")}/main.js`,
  },
  builtins: {
    html: [
      {
        template: "./index.html"
      }
    ],
    define: {
      DATA: readFileSync(`data/${fileName}`, "utf8"),
    },
  },
  module: {
    rules: [
      {
        test: /\.svg$/,
        type: "asset"
      }
    ]
  }
}) satisfies Configuration

export = data.map(createConfig)
