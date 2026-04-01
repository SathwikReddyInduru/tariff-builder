function checkStepAccess(step) {

    const type = sessionStorage.getItem('pkgType');

    if (step > 1 && !type) {
        alert("Please select PREPAID or POSTPAID in Step 1");
        return false;
    }

    return true;
}

/* ── Module switcher ── */
function switchModule(m) {
    // toggle mod-btn active
    document.getElementById('m-pkg').classList.toggle('active', m === 'pkg');
    document.getElementById('m-reload').classList.toggle('active', m === 'reload');

    const isPkg = m === 'pkg';

    // show/hide step rail and sidebar
    document.getElementById('stepRail').style.display = isPkg ? 'flex' : 'none';
    document.getElementById('sidebar').style.display = isPkg ? 'flex' : 'none';

    // show/hide footer
    document.getElementById('footerActions').style.display = isPkg ? 'flex' : 'none';

    // show/hide step stage vs reload stage
    // the step stage is the <section class="stage"> injected by each step
    const stepStage = document.querySelector('.stage:not(#reloadStage)');
    if (stepStage) stepStage.classList.toggle('hidden', !isPkg);

    document.getElementById('reloadStage').classList.toggle('hidden', isPkg);
}

/* ── Save eReload ── */
async function saveReload() {
    const payload = {
        rechargeId: document.getElementById('rechargeId').value,
        rechargeType: document.getElementById('rechargeType').value,
        mrp: document.getElementById('mrp').value,
        airTime: document.getElementById('airTime').value,
        validityDays: document.getElementById('validityDays').value,
        gracePeriod1: document.getElementById('gracePeriod1').value,
        gracePeriod2: document.getElementById('gracePeriod2').value,
    };
    if (!payload.rechargeId) { alert('Enter Recharge ID'); return; }
    try {
        const res = await fetch('/api/v1/saveReload', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        if (res.ok) alert('eReload Configuration Saved.');
    } catch (e) { alert('Backend error.'); }
}

/* ── Save config (package) ── */
async function saveConfiguration() {
    const name = document.getElementById('configName').value;
    if (!name) { alert('Enter Configuration Name'); return; }
    try {
        const res = await fetch('/api/v1/saveTariff', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, id: Date.now() })
        });
        if (res.ok) alert('Package Saved.');
    } catch (e) { alert('Backend error.'); }
}

/* ── Hierarchy ── */
function viewTree() { alert('Hierarchy — wire to your modal'); }

/* ── Logout ── */
function logout() { window.location.href = '/loginform'; }