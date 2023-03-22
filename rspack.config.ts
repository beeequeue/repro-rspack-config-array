import type { Configuration } from "@rspack/cli";
import { readdirSync, readFileSync } from "fs";

const data = readdirSync("data")
  .map(fileName => `data/${fileName}`)
  .slice(0, Number(process.env.AMOUNT ?? 1))

console.log(`Building ${data.length} configs...`)

const createConfig = (dataPath: string) => ({
  context: __dirname,
  entry: {
    main: "./src/main.jsx"
  },
  builtins: {
    html: [
      {
        template: "./index.html"
      }
    ],
    define: {
      DATA: readFileSync(dataPath, "utf8"),
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
