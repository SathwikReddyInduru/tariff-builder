const type = sessionStorage.getItem('pkgType');

if (!type) {
    alert("Please select PREPAID or POSTPAID first");
    window.location.href = "/builder/step1";
}

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
        <div class="draggable-item" onclick="addToCenter('${item}')">
            <b>${item}</b>
        </div>
    `).join("");
}

function addToCenter(item) {

    const container = document.getElementById('dropArea');

    if (container.innerHTML.includes(item)) return;

    const card = document.createElement('div');
    card.className = 'service-card';
    card.innerHTML = `
        <div class="service-content" style="display:flex; justify-content:space-between; border-bottom:1px solid #eee; padding-bottom:10px;">
            <b class="service-title">${item}</b>
            <span onclick="removeIt()" style="color:red; cursor:pointer; font-weight:800;">✕</span>
        </div>
    `;

    container.appendChild(card);
}

function removeIt() {
    const container = document.getElementById('dropArea');
    container.innerHTML = "";
}