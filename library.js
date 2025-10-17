// Library Page Logic

document.addEventListener('DOMContentLoaded', () => {
    if (!isAuthenticated()) {
        window.location.href = 'index.html';
        return;
    }
    updateAllAuthButtons();
    fetchUserLibrary();
});

async function fetchUserLibrary() {
    const token = localStorage.getItem('authToken');
    try {
        const res = await fetch('/api/UserLibrary', { headers: { 'Authorization': `Bearer ${token}` } });
        if (!res.ok) throw new Error('Failed to load library');
        const games = await res.json();
        renderLibrary(games);
    } catch (e) {
        showNotification('Could not fetch user library', 'error');
    }
}

function renderLibrary(games) {
    const list = document.getElementById('library-list');
    const detail = document.getElementById('library-detail');

    list.innerHTML = '';
    games.forEach(game => {
        const li = document.createElement('li');
        li.textContent = game.title;
        li.dataset.id = String(game.id);
        li.addEventListener('click', () => selectGame(game, li));
        list.appendChild(li);
    });

    if (games.length) selectGame(games[0], list.querySelector('li'));
}

function selectGame(game, listItem) {
    document.querySelectorAll('#library-list li').forEach(li => li.classList.remove('active'));
    if (listItem) listItem.classList.add('active');

    const detail = document.getElementById('library-detail');
    detail.classList.remove('empty-state');
    detail.innerHTML = `
        <img src="${game.image}" alt="${game.title}">
        <h2 style="color:#c7d5e0;">${game.title}</h2>
        <button class="play-btn">Play</button>
        <div class="playtime">Playtime: ${game.playtime} hrs</div>
    `;
}
