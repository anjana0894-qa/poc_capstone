async function loadDashboard() {

    const response = await fetch('dashboard-data.json');

    const data = await response.json();


    // Summary

    document.getElementById('totalModules').textContent =
        data.totalModules;

    document.getElementById('passedModules').textContent =
        data.passedModules;

    document.getElementById('failedModules').textContent =
        data.failedModules;


    // Last run

    const lastRun = new Date(data.lastRun);

    document.getElementById('lastRun').textContent =
        `Last Run: ${lastRun.toLocaleString()}`;


    // Module table

    const table = document.getElementById('moduleTable');

    table.innerHTML = '';


    data.modules.forEach(module => {

        const row = document.createElement('tr');


        const statusClass =
            module.status === 'passed'
                ? 'passed'
                : 'failed';


        row.innerHTML = `

            <td>
                ${module.name}
            </td>

            <td>
                ${module.spec}
            </td>

            <td>
                ${module.total}
            </td>

            <td>
                ${module.passed}
            </td>

            <td>
                ${module.failed}
            </td>

            <td>
                <span class="status ${statusClass}">
                    ${module.status.toUpperCase()}
                </span>
            </td>

        `;


        table.appendChild(row);

    });

}


loadDashboard();