function selectType(type) {
    sessionStorage.setItem('pkgType', type);
    document.getElementById('typeSection').classList.add('hidden');
    document.getElementById('subTypeSection').classList.remove('hidden');
}

function selectSubType(subType) {
    sessionStorage.setItem('pkgSubType', subType);
    window.location.href = '/builder/step2';
}