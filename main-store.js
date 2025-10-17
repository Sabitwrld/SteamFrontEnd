// Main Store Page Logic

document.addEventListener('DOMContentLoaded', () => {
    initStore();
});

let allGames = [];
let filteredGames = [];
let currentView = 'grid';

function initStore() {
    bindStoreEvents();
    updateCounts();
    fetchGames().then(() => {
        displayGames(filteredGames);
        hydrateSearchFromQuery();
    });
}

async function fetchGames() {
    try {
        const res = await fetch('/api/ApplicationCatalog');
        if (!res.ok) throw new Error('Failed to load games');
        const data = await res.json();
        // Expecting list of { id, title, genre, tags, price, discount, image, rating }
        allGames = Array.isArray(data) ? data : [];
        filteredGames = [...allGames];
    } catch (e) {
        showNotification('Could not fetch games', 'error');
        allGames = [];
        filteredGames = [];
    }
}

function bindStoreEvents() {
    const applyBtn = document.querySelector('.apply-filters');
    const clearBtn = document.querySelector('.clear-filters');
    const priceRange = document.getElementById('price-range');
    const sortSelect = document.getElementById('sort-select');
    const viewButtons = document.querySelectorAll('.view-btn');

    if (applyBtn) applyBtn.addEventListener('click', applyFilters);
    if (clearBtn) clearBtn.addEventListener('click', clearFilters);
    if (priceRange) priceRange.addEventListener('input', () => {
        const valueLabel = document.getElementById('price-value');
        if (valueLabel) valueLabel.textContent = `$${priceRange.value}`;
    });
    if (sortSelect) sortSelect.addEventListener('change', () => {
        sortGames(sortSelect.value);
        displayGames(filteredGames);
    });
    viewButtons.forEach(btn => btn.addEventListener('click', () => toggleView(btn)));
}

function hydrateSearchFromQuery() {
    const params = new URLSearchParams(window.location.search);
    const q = params.get('search') || sessionStorage.getItem('steamSearchQuery');
    if (q) {
        filteredGames = allGames.filter(g => g.title.toLowerCase().includes(q.toLowerCase()));
        displayGames(filteredGames);
    }
}

function applyFilters() {
    const selectedGenres = Array.from(document.querySelectorAll('.store-sidebar input[type="checkbox"][value]'))
        .filter(cb => cb.checked && cb.closest('.filter-section')?.querySelector('h3')?.textContent === 'Genres')
        .map(cb => cb.value);
    const selectedTags = Array.from(document.querySelectorAll('.store-sidebar input[type="checkbox"][value]'))
        .filter(cb => cb.checked && cb.closest('.filter-section')?.querySelector('h3')?.textContent === 'Tags')
        .map(cb => cb.value);
    const priceMax = Number(document.getElementById('price-range')?.value || 100);
    const selectedReview = document.querySelector('input[name="reviews"]:checked')?.value || 'all';

    filteredGames = allGames.filter(game => {
        const withinGenre = selectedGenres.length ? selectedGenres.includes(game.genre) : true;
        const withinTags = selectedTags.length ? selectedTags.every(t => game.tags.includes(t)) : true;
        const effectivePrice = getDiscountedPrice(game.price, game.discount);
        const withinPrice = effectivePrice <= priceMax;
        const withinReview = selectedReview === 'all' ? true : game.rating >= (selectedReview === 'overwhelming' ? 4.8 : selectedReview === 'very-positive' ? 4.5 : 4.0);
        return withinGenre && withinTags && withinPrice && withinReview;
    });

    sortGames(document.getElementById('sort-select')?.value || 'relevance');
    displayGames(filteredGames);
}

function clearFilters() {
    document.querySelectorAll('.store-sidebar input').forEach(input => {
        if (input.type === 'checkbox' || input.type === 'radio') input.checked = false;
    });
    const priceRange = document.getElementById('price-range');
    if (priceRange) {
        priceRange.value = 60;
        const valueLabel = document.getElementById('price-value');
        if (valueLabel) valueLabel.textContent = '$60';
    }
    filteredGames = [...allGames];
    sortGames(document.getElementById('sort-select')?.value || 'relevance');
    displayGames(filteredGames);
}

function sortGames(mode) {
    switch (mode) {
        case 'price':
            filteredGames.sort((a, b) => getDiscountedPrice(a.price, a.discount) - getDiscountedPrice(b.price, b.discount));
            break;
        case 'newest':
            filteredGames.sort((a, b) => b.id - a.id);
            break;
        case 'rating':
            filteredGames.sort((a, b) => b.rating - a.rating);
            break;
        default:
            filteredGames.sort((a, b) => b.rating - a.rating);
    }
}

function displayGames(games) {
    const container = document.getElementById('games-container');
    if (!container) return;
    container.innerHTML = '';

    if (!games.length) {
        container.innerHTML = '<div class="empty-state"><i class="fas fa-search"></i><h3>No games found</h3><p>Try adjusting your filters</p></div>';
        return;
    }

    games.forEach(game => {
        const card = document.createElement('div');
        card.className = 'game-item';
        card.innerHTML = `
            <div class="game-image">
                <img src="${game.image}" alt="${game.title}">
                ${game.discount ? `<div class="game-badge">-${Math.round(game.discount * 100)}%</div>` : ''}
            </div>
            <div class="game-info">
                <div class="game-title">${game.title}</div>
                <div class="game-tags">${game.tags.map(t => `<span class="game-tag">${t}</span>`).join('')}</div>
                <div class="game-price">
                    ${game.discount ? `<span class="original-price">$${game.price.toFixed(2)}</span>` : ''}
                    <span class="current-price">$${getDiscountedPrice(game.price, game.discount).toFixed(2)}</span>
                </div>
                <div class="game-actions">
                    <button class="add-to-cart-btn" data-id="${game.id}">Add to Cart</button>
                    <button class="add-to-wishlist-btn" data-id="${game.id}">Add to Wishlist</button>
                </div>
            </div>
        `;
        container.appendChild(card);
    });

    container.querySelectorAll('.add-to-cart-btn').forEach(btn => btn.addEventListener('click', () => addToCart(Number(btn.dataset.id))));
    container.querySelectorAll('.add-to-wishlist-btn').forEach(btn => btn.addEventListener('click', () => addToWishlist(Number(btn.dataset.id))));
}

function toggleView(btn) {
    document.querySelectorAll('.view-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentView = btn.dataset.view;
    const container = document.getElementById('games-container');
    if (container) {
        container.style.gridTemplateColumns = currentView === 'list' ? '1fr' : '';
    }
}

function addToCart(gameId) {
    const token = localStorage.getItem('authToken');
    if (!token) { showAuthModal('signin'); return; }
    fetch('/api/Cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ gameId })
    }).then(async res => {
        if (!res.ok) throw new Error(await res.text());
        updateCounts();
        const game = allGames.find(g => g.id === gameId);
        showNotification(`${game ? game.title : 'Game'} added to cart`, 'success');
    }).catch(err => showNotification(err.message || 'Failed to add to cart', 'error'));
}

function addToWishlist(gameId) {
    const token = localStorage.getItem('authToken');
    if (!token) { showAuthModal('signin'); return; }
    fetch('/api/Wishlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ gameId })
    }).then(async res => {
        if (!res.ok) throw new Error(await res.text());
        updateCounts();
        const game = allGames.find(g => g.id === gameId);
        showNotification(`${game ? game.title : 'Game'} added to wishlist`, 'success');
    }).catch(err => showNotification(err.message || 'Failed to add to wishlist', 'error'));
}

function updateCounts() {
    // Optionally fetch counts from backend if endpoints exist; fallback to placeholders
    const cartCount = document.querySelector('.cart-count');
    const wishlistCount = document.querySelector('.wishlist-count');
    if (cartCount) cartCount.textContent = cartCount.textContent || '0';
    if (wishlistCount) wishlistCount.textContent = wishlistCount.textContent || '0';
}

function getDiscountedPrice(price, discount = 0) {
    return price * (1 - discount);
}

// Expose for global search integration
function performStoreSearch(query) {
    filteredGames = allGames.filter(g => g.title.toLowerCase().includes(query.toLowerCase()));
    displayGames(filteredGames);
}


