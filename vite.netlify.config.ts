import vinext from "vinext";
import { nitro } from "nitro/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import { fileURLToPath } from "node:url";

// Netlify server build. The default Vite config still powers local D1 development.
export default defineConfig({
  plugins: [vinext(), tailwindcss(), nitro()],
  resolve: { alias: { "cloudflare:workers": fileURLToPath(new URL("./app/tracker/firestore-db.ts", import.meta.url)) } },
});
