const pkgType = sessionStorage.getItem('pkgType');
if (!pkgType) {
    alert("Please select PREPAID or POSTPAID first");
    window.location.href = "/builder/step1";
}

window.addEventListener('DOMContentLoaded', () => {
    const saved = JSON.parse(sessionStorage.getItem('selectedSvcs') || '[]');
    saved.forEach(svc => {
        const pill = document.querySelector(`.svc-pill[data-svc="${svc}"]`);
        if (pill) pill.classList.add('active');
        selectedSvcs.push(svc);
    });
    if (saved.length) updateSidebar();

    const state = getState();
    if (state.s2) renderDropArea(state.s2);
});

let selectedSvcs = [];

function toggleSvc(service, el) {
    if (selectedSvcs.includes(service)) {
        selectedSvcs = selectedSvcs.filter(s => s !== service);
        el.classList.remove('active');
    } else {
        selectedSvcs.push(service);
        el.classList.add('active');
    }
    sessionStorage.setItem('selectedSvcs', JSON.stringify(selectedSvcs));
    updateSidebar();
}

function updateSidebar() {
    const list = document.getElementById('comp-list');
    if (!selectedSvcs.length) { list.innerHTML = ''; return; }

    // TODO: replace mock with real API call
    // const code = getServiceCode(selectedSvcs);
    // fetch(`/api/v1/getServicePlans?type=${code}`) ...
    const mockData = { VOICE: ['Voice Plan A', 'Voice Plan B'], SMS: ['SMS Plan A'], DATA: ['Data Plan A', 'Data Plan B'] };

    let items = [];
    selectedSvcs.forEach(svc => { items = items.concat(mockData[svc] || []); });

    list.innerHTML = items.map(item => `
        <div class="draggable-item" onclick="addToCenter('${item}')">
            <b>${item}</b>
        </div>
    `).join('');
}

function addToCenter(itemName) {
    // Step 2: only ONE plan allowed (state.s2 is a single object)
    const state = getState();
    state.s2 = { id: itemName, name: itemName };  // ← WRITES to state.s2
    saveState(state);
    renderDropArea(state.s2);
}

function renderDropArea(item) {
    const container = document.getElementById('dropArea');
    container.innerHTML = `
        <div class="service-card">
            <div style="display:flex; justify-content:space-between; border-bottom:1px solid #eee; padding-bottom:10px;">
                <b class="service-title">${item.name}</b>
                <span onclick="removeItem()" style="color:red; cursor:pointer; font-weight:800;">✕</span>
            </div>
        </div>`;
}

function removeItem() {
    const state = getState();
    state.s2 = null;
    saveState(state);
    document.getElementById('dropArea').innerHTML = '';
}