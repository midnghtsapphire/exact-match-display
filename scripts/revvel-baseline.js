import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

export const REQUIRED_DOC_FILES = [
  "README.md",
  "CHANGELOG.md",
  "DEPLOYMENT_GUIDE.md",
  "GO_TO_MARKET.md",
  "BRAND_GUIDELINES.md",
  "SECURITY.md",
  "research/ASSETS.md",
  "research/ARTIFACTS.md",
  "research/SUGGESTIONS.md",
];

export const REQUIRED_APP_FILES = [
  "index.html",
  "vite.config.ts",
  "src/main.tsx",
];

export const REQUIRED_PACKAGE_SCRIPTS = ["test", "build"];

export function collectMissingItems({
  rootDir = process.cwd(),
  requiredDocFiles = REQUIRED_DOC_FILES,
  requiredAppFiles = REQUIRED_APP_FILES,
  requiredPackageScripts = REQUIRED_PACKAGE_SCRIPTS,
} = {}) {
  const missingFiles = [...requiredDocFiles, ...requiredAppFiles].filter(
    (relativeFilePath) => !existsSync(path.join(rootDir, relativeFilePath)),
  );

  const packagePath = path.join(rootDir, "package.json");
  const packageJson = existsSync(packagePath)
    ? JSON.parse(readFileSync(packagePath, "utf8"))
    : {};
  const scripts = packageJson.scripts ?? {};

  const missingScripts = requiredPackageScripts.filter((scriptName) => {
    const script = scripts[scriptName];
    return typeof script !== "string" || script.trim().length === 0;
  });

  return { missingFiles, missingScripts };
}

export function runBaselineCheck(rootDir = process.cwd(), checkName = "baseline") {
  const { missingFiles, missingScripts } = collectMissingItems({ rootDir });

  if (missingFiles.length === 0 && missingScripts.length === 0) {
    console.log(`✅ ${checkName} passed`);
    return true;
  }

  console.error(`❌ ${checkName} failed`);
  if (missingFiles.length > 0) {
    console.error(`Missing files: ${missingFiles.join(", ")}`);
  }
  if (missingScripts.length > 0) {
    console.error(`Missing package scripts: ${missingScripts.join(", ")}`);
  }
  return false;
}
