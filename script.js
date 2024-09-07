document.addEventListener('DOMContentLoaded', function() {
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            populateList('champions-league-list', data.championsLeague, 'club');
            populateList('championships-list', data.championships, 'winner', 'championship');
            populateList('ballon-dor-list', data.ballonDor, 'player');
        })
        .catch(error => console.error('Error fetching data:', error));
});

function populateList(elementId, items, ...fields) {
    const list = document.getElementById(elementId);
    list.innerHTML = '';
    items.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.textContent = fields.map(field => item[field]).join(' - ');
        list.appendChild(itemElement);
    });
}
