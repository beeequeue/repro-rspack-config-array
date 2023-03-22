import type { Configuration } from "@rspack/cli";

export = {
  context: __dirname,
  entry: {
    main: "./src/main.jsx"
  },
  builtins: {
    html: [
      {
        template: "./index.html"
      }
    ]
  },
  module: {
    rules: [
      {
        test: /\.svg$/,
        type: "asset"
      }
    ]
  }
} satisfies Configuration
