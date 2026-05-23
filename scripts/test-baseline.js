import { runBaselineCheck } from "./revvel-baseline.js";

const passed = runBaselineCheck(process.cwd(), "test baseline");
process.exit(passed ? 0 : 1);
