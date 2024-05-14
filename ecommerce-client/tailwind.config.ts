import type { Config } from "tailwindcss";
import withMT from "@material-tailwind/react/utils/withMT";

export default withMT({
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        asparagus: "#6B8E4E",
        greenSpirng: "#B2C5B2",
        geyser: "#D5DDDF",
        outerSpace: "#1B2727",
        mineralGreen: "#3C5148",
        whereGreen: "#31b261",
        someGreen: "#55d082",
        coolGreen: "#33b964",
        softCool: "#82dca3",
        pastelGreen: "#EAEFC8"

      }
    },
  },
  plugins: [],
} satisfies Config);
