import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const testsDir = path.join(process.cwd(), 'tests');
const reportsDir = path.join(process.cwd(), 'dashboard', 'reports');

fs.rmSync(reportsDir, { recursive: true, force: true });
fs.mkdirSync(reportsDir, { recursive: true });

const specFiles = fs
    .readdirSync(testsDir)
    .filter(file => file.endsWith('.spec.js'));

for (const specFile of specFiles) {

    const moduleName = specFile
        .replace('.spec.js', '')
        .replace(/[-_]/g, '-');

    const reportPath = path.join(
        reportsDir,
        moduleName
    );

    console.log(`Generating report for ${specFile}`);

    execSync(
        `npx playwright test tests/${specFile} --reporter=html`,
        {
            stdio: 'inherit',
            env: {
                ...process.env,
                PLAYWRIGHT_HTML_OUTPUT_DIR: reportPath,
                PLAYWRIGHT_HTML_OPEN: 'never'
            }
        }
    );
}