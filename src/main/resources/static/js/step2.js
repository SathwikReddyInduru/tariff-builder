let selectedSvcs = [];

function toggleSvc(service, el) {

    // toggle selection
    if (selectedSvcs.includes(service)) {
        selectedSvcs = selectedSvcs.filter(s => s !== service);
        el.classList.remove('active');
    } else {
        selectedSvcs.push(service);
        el.classList.add('active');
    }

    console.log("Selected:", selectedSvcs);

    updateSidebar();
}

function updateSidebar() {

    const list = document.getElementById('comp-list');

    if (!selectedSvcs.length) {
        list.innerHTML = "";
        return;
    }

    // 🔥 TEMP MOCK (later replace with API)
    const mockData = {
        VOICE: ["Voice Plan"],
        SMS: ["SMS Plan"],
        DATA: ["Data Plan"]
    };

    let items = [];

    selectedSvcs.forEach(svc => {
        items = items.concat(mockData[svc] || []);
    });

    list.innerHTML = items.map(item => `
        <div class="draggable-item">
            <b>${item}</b>
        </div>
    `).join("");
}