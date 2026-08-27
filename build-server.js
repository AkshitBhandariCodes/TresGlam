import esbuild from "esbuild";

esbuild
  .build({
    entryPoints: ["server/boot.ts"],
    bundle: true,
    platform: "node",
    format: "esm",
    outdir: "dist",
    banner: {
      js: "import { createRequire } from 'module';const require = createRequire(import.meta.url);",
    },
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
