import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const nextCli = fileURLToPath(new URL("../node_modules/next/dist/bin/next", import.meta.url));
const result = spawnSync(process.execPath, [nextCli, "build"], {
  cwd: process.cwd(),
  env: { ...process.env, NIGHTOWL_MOBILE_EXPORT: "1" },
  stdio: "inherit",
});

if (result.error) {
  console.error(result.error);
  process.exitCode = 1;
} else {
  process.exitCode = result.status ?? 1;
}
