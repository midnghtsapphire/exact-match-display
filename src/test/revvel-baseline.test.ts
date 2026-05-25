import { mkdirSync, mkdtempSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { tmpdir } from "node:os";
import { describe, expect, it } from "vitest";
import {
  collectMissingItems,
  REQUIRED_APP_FILES,
  REQUIRED_DOC_FILES,
} from "../../scripts/revvel-baseline.js";

const createTestFile = (rootDir: string, relativePath: string, contents = "test") => {
  const absolutePath = path.join(rootDir, relativePath);
  mkdirSync(path.dirname(absolutePath), { recursive: true });
  writeFileSync(absolutePath, contents);
};

describe("revvel baseline checks", () => {
  it("returns missing files and package scripts when requirements are absent", () => {
    const tempDir = mkdtempSync(path.join(tmpdir(), "revvel-baseline-missing-"));
    createTestFile(tempDir, "package.json", JSON.stringify({ name: "test-project", scripts: {} }));

    const result = collectMissingItems({ rootDir: tempDir });

    expect(result.missingFiles).toEqual(expect.arrayContaining(REQUIRED_DOC_FILES));
    expect(result.missingFiles).toEqual(expect.arrayContaining(REQUIRED_APP_FILES));
    expect(result.missingScripts).toEqual(expect.arrayContaining(["test", "build"]));
  });

  it("passes when required files and scripts exist", () => {
    const tempDir = mkdtempSync(path.join(tmpdir(), "revvel-baseline-complete-"));

    [...REQUIRED_DOC_FILES, ...REQUIRED_APP_FILES].forEach((requiredFile) => {
      createTestFile(tempDir, requiredFile);
    });
    createTestFile(
      tempDir,
      "package.json",
      JSON.stringify({
        name: "test-project",
        scripts: { test: "vitest run", build: "vite build" },
      }),
    );

    const result = collectMissingItems({ rootDir: tempDir });

    expect(result.missingFiles).toEqual([]);
    expect(result.missingScripts).toEqual([]);
  });

  it("wires baseline checks into test and build scripts", () => {
    const packageJsonPath = path.resolve(process.cwd(), "package.json");
    const packageJson = JSON.parse(readFileSync(packageJsonPath, "utf8")) as {
      scripts?: Record<string, string>;
    };

    expect(packageJson.scripts?.test).toContain("scripts/test-baseline.js");
    expect(packageJson.scripts?.build).toContain("scripts/build-baseline.js");
  });
});
