import fs from "fs";
import path from "path";

const resultsPath = path.join(process.cwd(), "test-results", "results.json");

const outputPath = path.join(process.cwd(), "dashboard", "dashboard-data.json");

const results = JSON.parse(fs.readFileSync(resultsPath, "utf-8"));

const modules = [];

for (const suite of results.suites) {
  const specFile = suite.file;

  if (!specFile) {
    continue;
  }

  const fileName = path.basename(specFile);

  const moduleName = fileName
    .replace(".spec.js", "")
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());

  let passed = 0;
  let failed = 0;

  for (const spec of suite.specs || []) {
    for (const test of spec.tests || []) {
      const result = test.results?.[test.results.length - 1];

      if (result?.status === "passed") {
        passed++;
      } else {
        failed++;
      }
    }
  }

  modules.push({
    name: moduleName,
    spec: fileName,
    passed,
    failed,
    status: failed > 0 ? "failed" : "passed",
    report: `reports/${fileName.replace(".spec.js", "")}/index.html`,
  });
}

const dashboardData = {
  lastRun: new Date().toISOString(),
  totalModules: modules.length,
  passedModules: modules.filter((module) => module.status === "passed").length,
  failedModules: modules.filter((module) => module.status === "failed").length,
  modules,
};

fs.writeFileSync(outputPath, JSON.stringify(dashboardData, null, 2));

console.log(`Dashboard data generated: ${outputPath}`);
