import { runBaselineCheck } from "./revvel-baseline.js";

const passed = runBaselineCheck(process.cwd(), "build baseline");
process.exit(passed ? 0 : 1);
