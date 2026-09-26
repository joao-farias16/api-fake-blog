import { defineConfig } from "@lovable.dev/vite-tanstack-config";

const isVercel = !!process.env["VERCEL"];

export default defineConfig({
  tanstackStart: {
    server: { entry: "server" },
  },

  // No Vercel, o Nitro precisa gerar o build para Vercel.
  // Fora do Vercel, mantém o comportamento padrão do Lovable.
  nitro: isVercel
    ? {
        preset: "vercel",
      }
    : true,
});