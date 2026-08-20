import fs from 'fs';
import path from 'path';

const resultsPath = path.join(
    process.cwd(),
    'test-results',
    'results.json'
);

const outputPath = path.join(
    process.cwd(),
    'dashboard',
    'dashboard-data.json'
);

const results = JSON.parse(
    fs.readFileSync(resultsPath, 'utf-8')
);

const modules = [];

function processSuite(suite) {

    if (suite.file) {

        const fileName = path.basename(suite.file);

        const moduleName = fileName
            .replace('.spec.js', '')
            .replace(/[-_]/g, ' ')
            .replace(/\b\w/g, char =>
                char.toUpperCase()
            );

        let passed = 0;
        let failed = 0;
        let total = 0;

        for (const spec of suite.specs || []) {

            for (const test of spec.tests || []) {

                total++;

                /*
                 * Playwright test-level status:
                 *
                 * expected   = passed
                 * unexpected = failed
                 * skipped    = skipped
                 * flaky      = passed after retry, but had a failure
                 */

                if (test.status === 'expected') {

                    passed++;

                } else {

                    failed++;

                }
            }
        }

        modules.push({

            name: moduleName,

            spec: fileName,

            total,

            passed,

            failed,

            status:
                failed > 0
                    ? 'failed'
                    : 'passed'

        });
    }

    // Process nested suites

    for (const childSuite of suite.suites || []) {

        processSuite(childSuite);

    }
}

for (const suite of results.suites || []) {

    processSuite(suite);

}


const dashboardData = {

    lastRun: new Date().toISOString(),

    totalModules: modules.length,

    passedModules: modules.filter(
        module =>
            module.status === 'passed'
    ).length,

    failedModules: modules.filter(
        module =>
            module.status === 'failed'
    ).length,

    totalTests: modules.reduce(
        (sum, module) =>
            sum + module.total,
        0
    ),

    passedTests: modules.reduce(
        (sum, module) =>
            sum + module.passed,
        0
    ),

    failedTests: modules.reduce(
        (sum, module) =>
            sum + module.failed,
        0
    ),

    modules

};


fs.writeFileSync(

    outputPath,

    JSON.stringify(
        dashboardData,
        null,
        2
    )

);


console.log(
    `Dashboard data generated: ${outputPath}`
);