// Steam Store Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    initStore();
});

function initStore() {
    loadGames();
    loadRecentlyViewed();
    initFilters();
    initSorting();
    initViewToggle();
    initPagination();
    initPriceSlider();
    initSpecialOffers();
    initCategoryCards();
    
    // Initialize cart functionality
    const cartBtn = document.getElementById('cart-btn');
    if (cartBtn) {
        cartBtn.addEventListener('click', showCartModal);
    }
    
    // Initialize wishlist functionality
    const wishlistBtn = document.getElementById('wishlist-btn');
    if (wishlistBtn) {
        wishlistBtn.addEventListener('click', showWishlistModal);
    }
    
    // Check for search query in URL
    const urlParams = new URLSearchParams(window.location.search);
    const searchQuery = urlParams.get('search');
    if (searchQuery) {
        // Update search input
        const searchInput = document.querySelector('.search-bar input');
        if (searchInput) {
            searchInput.value = searchQuery;
        }
        // Perform search
        performStoreSearch(searchQuery);
    }
    
    // Check for search query in sessionStorage
    const sessionSearch = sessionStorage.getItem('steamSearchQuery');
    if (sessionSearch && !searchQuery) {
        const searchInput = document.querySelector('.search-bar input');
        if (searchInput) {
            searchInput.value = sessionSearch;
        }
        performStoreSearch(sessionSearch);
        sessionStorage.removeItem('steamSearchQuery');
    }
    
    // Display recently viewed
    displayRecentlyViewed();
    
    // Show welcome message
    setTimeout(() => {
        showNotification('Welcome to the Steam Store! Check out our special offers and trending games.', 'info');
    }, 1000);
}

// Initialize special offers functionality
function initSpecialOffers() {
    const offerBtns = document.querySelectorAll('.offer-btn');
    offerBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const offerCard = this.closest('.offer-card');
            const gameTitle = offerCard.querySelector('p').textContent;
            const originalPrice = offerCard.querySelector('.original').textContent;
            const discountedPrice = offerCard.querySelector('.discounted').textContent;
            
            // Create a game object for the offer
            const offerGame = {
                id: Date.now(), // Generate unique ID
                title: gameTitle,
                genre: "Special Offer",
                price: parseFloat(originalPrice.replace('$', '')),
                discount: calculateDiscountPercentage(originalPrice, discountedPrice),
                tags: ["Special Offer", "Limited Time"],
                image: offerCard.querySelector('img').src,
                rating: 4.5
            };
            
            addToCart(offerGame);
            this.textContent = 'Added to Cart!';
            this.style.background = '#4a7b9d';
            
            setTimeout(() => {
                this.textContent = 'Add to Cart';
                this.style.background = '#5c7e10';
            }, 2000);
        });
    });

    // Initialize banner buttons
    const exploreBtn = document.querySelector('.banner-btn.primary');
    const specialsBtn = document.querySelector('.banner-btn.secondary');
    
    if (exploreBtn) {
        exploreBtn.addEventListener('click', function() {
            document.querySelector('.store-content').scrollIntoView({
                behavior: 'smooth'
            });
        });
    }
    
    if (specialsBtn) {
        specialsBtn.addEventListener('click', function() {
            document.querySelector('.special-offers').scrollIntoView({
                behavior: 'smooth'
            });
        });
    }

    // Initialize countdown timers for special offers
    initOfferCountdowns();
}

// Initialize trending section functionality
function initTrendingSection() {
    const trendingBtns = document.querySelectorAll('.trending-btn');
    trendingBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const trendingCard = this.closest('.trending-card');
            const gameTitle = trendingCard.querySelector('h3').textContent;
            const price = trendingCard.querySelector('.price').textContent;
            
            // Create a game object for the trending game
            const trendingGame = {
                id: Date.now() + Math.random(), // Generate unique ID
                title: gameTitle,
                genre: "Trending",
                price: parseFloat(price.replace('$', '')),
                discount: 0,
                tags: ["Trending", "New Release"],
                image: trendingCard.querySelector('img').src,
                rating: 5.0
            };
            
            addToCart(trendingGame);
            this.textContent = 'Added to Cart!';
            this.style.background = '#4a7b9d';
            
            setTimeout(() => {
                this.textContent = 'Add to Cart';
                this.style.background = '#5c7e10';
            }, 2000);
        });
    });
}

// Initialize countdown timers for special offers
function initOfferCountdowns() {
    const offerCards = document.querySelectorAll('.offer-card');
    
    offerCards.forEach((card, index) => {
        // Create countdown element
        const countdownEl = document.createElement('div');
        countdownEl.className = 'offer-countdown';
        countdownEl.innerHTML = `
            <span class="countdown-label">Ends in:</span>
            <span class="countdown-time">${getRandomCountdown(index)}</span>
        `;
        
        // Insert countdown after the offer badge
        const badge = card.querySelector('.offer-badge');
        if (badge) {
            badge.parentNode.insertBefore(countdownEl, badge.nextSibling);
        }
        
        // Start countdown
        startOfferCountdown(countdownEl, index);
    });
}

// Get random countdown time for offers
function getRandomCountdown(index) {
    const times = [
        '23:45:12',
        '12:30:45',
        '05:15:30'
    ];
    return times[index] || '24:00:00';
}

// Start countdown timer for an offer
function startOfferCountdown(countdownEl, index) {
    const countdownTime = countdownEl.querySelector('.countdown-time');
    
    // Parse the initial time
    let [hours, minutes, seconds] = countdownTime.textContent.split(':').map(Number);
    
    const timer = setInterval(() => {
        seconds--;
        
        if (seconds < 0) {
            seconds = 59;
            minutes--;
        }
        
        if (minutes < 0) {
            minutes = 59;
            hours--;
        }
        
        if (hours < 0) {
            // Time's up - refresh the offer
            clearInterval(timer);
            refreshOffer(countdownEl.closest('.offer-card'));
            return;
        }
        
        // Update display
        countdownTime.textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        
        // Add urgency styling when time is low
        if (hours === 0 && minutes < 5) {
            countdownTime.style.color = '#ff6b6b';
            countdownTime.style.fontWeight = 'bold';
        }
    }, 1000);
}

// Refresh an offer when countdown ends
function refreshOffer(offerCard) {
    const countdownEl = offerCard.querySelector('.offer-countdown');
    if (countdownEl) {
        countdownEl.innerHTML = '<span class="countdown-label">Offer Ended</span>';
        countdownEl.style.color = '#8f98a0';
    }
    
    // Disable the add to cart button
    const addBtn = offerCard.querySelector('.offer-btn');
    if (addBtn) {
        addBtn.textContent = 'Offer Ended';
        addBtn.disabled = true;
        addBtn.style.background = '#8f98a0';
        addBtn.style.cursor = 'not-allowed';
    }
}

// Initialize category cards functionality
function initCategoryCards() {
    const categoryCards = document.querySelectorAll('.category-card');
    categoryCards.forEach(card => {
        card.addEventListener('click', function() {
            const category = this.querySelector('h3').textContent.toLowerCase();
            filterByCategory(category);
            
            // Scroll to store content
            document.querySelector('.store-content').scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
}

// Calculate discount percentage
function calculateDiscountPercentage(originalPrice, discountedPrice) {
    const original = parseFloat(originalPrice.replace('$', ''));
    const discounted = parseFloat(discountedPrice.replace('$', ''));
    return Math.round(((original - discounted) / original) * 100);
}

// Filter games by category
function filterByCategory(category) {
    // Reset other filters
    document.querySelectorAll('input[type="checkbox"]').forEach(cb => cb.checked = false);
    document.querySelectorAll('input[type="radio"]').forEach(rb => rb.checked = false);
    
    // Check the appropriate category checkbox
    const categoryCheckbox = document.querySelector(`input[value="${category}"]`);
    if (categoryCheckbox) {
        categoryCheckbox.checked = true;
    }
    
    // Apply filters
    applyFilters();
    
    // Show notification
    showNotification(`Filtered by ${category} games`);
}

// Sample game data
const gamesData = [
    {
        id: 1,
        title: "Elden Ring",
        genre: "Action RPG",
        price: 59.99,
        discount: 20,
        tags: ["Action", "RPG", "Open World", "Multiplayer"],
        image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=300&h=200&fit=crop&crop=center",
        rating: 4.8
    },
    {
        id: 2,
        title: "God of War",
        genre: "Action Adventure",
        price: 49.99,
        discount: 15,
        tags: ["Action", "Adventure", "Story", "Controller"],
        image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=300&h=200&fit=crop&crop=center",
        rating: 4.9
    },
    {
        id: 3,
        title: "Red Dead Redemption 2",
        genre: "Western Action",
        price: 59.99,
        discount: 30,
        tags: ["Action", "Western", "Open World", "Multiplayer"],
        image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=300&h=200&fit=crop&crop=center",
        rating: 4.7
    },
    {
        id: 4,
        title: "Death Stranding",
        genre: "Action Game",
        price: 59.99,
        discount: 25,
        tags: ["Action", "Sci-Fi", "Story", "Controller"],
        image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=300&h=200&fit=crop&crop=center",
        rating: 4.6
    },
    {
        id: 5,
        title: "Cyberpunk 2077",
        genre: "RPG",
        price: 59.99,
        discount: 40,
        tags: ["RPG", "Cyberpunk", "Open World", "Controller"],
        image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=300&h=200&fit=crop&crop=center",
        rating: 4.5
    },
    {
        id: 6,
        title: "The Witcher 3",
        genre: "RPG",
        price: 39.99,
        discount: 50,
        tags: ["RPG", "Fantasy", "Open World", "Controller"],
        image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=300&h=200&fit=crop&crop=center",
        rating: 4.9
    },
    {
        id: 7,
        title: "Grand Theft Auto V",
        genre: "Action",
        price: 29.99,
        discount: 60,
        tags: ["Action", "Open World", "Multiplayer", "Controller"],
        image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=300&h=200&fit=crop&crop=center",
        rating: 4.8
    },
    {
        id: 8,
        title: "Portal 2",
        genre: "Puzzle",
        price: 19.99,
        discount: 70,
        tags: ["Puzzle", "Portal", "Co-op", "Controller"],
        image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=300&h=200&fit=crop&crop=center",
        rating: 4.9
    },
    {
        id: 9,
        title: "Stardew Valley",
        genre: "Simulation",
        price: 14.99,
        discount: 0,
        tags: ["Simulation", "Farming", "Relaxing", "Controller"],
        image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=300&h=200&fit=crop&crop=center",
        rating: 4.9
    },
    {
        id: 10,
        title: "FIFA 24",
        genre: "Sports",
        price: 69.99,
        discount: 10,
        tags: ["Sports", "Football", "Multiplayer", "Controller"],
        image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=300&h=200&fit=crop&crop=center",
        rating: 4.3
    },
    {
        id: 11,
        title: "Resident Evil 4",
        genre: "Horror",
        price: 59.99,
        discount: 20,
        tags: ["Horror", "Survival", "Action", "Controller"],
        image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=300&h=200&fit=crop&crop=center",
        rating: 4.7
    },
    {
        id: 12,
        title: "Forza Horizon 5",
        genre: "Racing",
        price: 59.99,
        discount: 15,
        tags: ["Racing", "Open World", "Multiplayer", "Controller"],
        image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=300&h=200&fit=crop&crop=center",
        rating: 4.6
    }
];

let currentGames = [...gamesData];

// Shopping cart functionality
let cart = [];

// Wishlist functionality
let wishlist = [];

// Recently viewed functionality
let recentlyViewed = [];
const MAX_RECENTLY_VIEWED = 5;

function addToCart(game) {
    cart.push(game);
    updateCartDisplay();
    showNotification(`${game.title} added to cart!`);
}

function removeFromCart(gameId) {
    cart = cart.filter(item => item.id !== gameId);
    updateCartDisplay();
    showNotification('Game removed from cart!');
}

function updateCartDisplay() {
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
        cartCount.textContent = cart.length;
    }
}

function showCartModal() {
    if (cart.length === 0) {
        showNotification('Your cart is empty!');
        return;
    }
    
    const modal = document.createElement('div');
    modal.className = 'modal cart-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h2>Shopping Cart</h2>
                <button class="close-btn">&times;</button>
            </div>
            <div class="modal-body">
                ${cart.map(game => `
                    <div class="cart-item">
                        <img src="${game.image}" alt="${game.title}">
                        <div class="cart-item-info">
                            <h3>${game.title}</h3>
                            <p>$${game.price}</p>
                        </div>
                        <button class="remove-btn" onclick="removeFromCart(${game.id})">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                `).join('')}
                <div class="cart-total">
                    <h3>Total: $${cart.reduce((sum, game) => sum + game.price, 0).toFixed(2)}</h3>
                </div>
            </div>
            <div class="modal-footer">
                <button class="checkout-btn">Checkout</button>
                <button class="clear-cart-btn" onclick="clearCart()">Clear Cart</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Close modal functionality
    modal.querySelector('.close-btn').addEventListener('click', () => {
        modal.remove();
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
}

function clearCart() {
    cart = [];
    updateCartDisplay();
    showNotification('Cart cleared!');
    document.querySelector('.cart-modal').remove();
}

function addToWishlist(game) {
    if (wishlist.find(item => item.id === game.id)) {
        showNotification('Game already in wishlist!', 'info');
        return;
    }
    wishlist.push(game);
    updateWishlistDisplay();
    showNotification(`${game.title} added to wishlist!`);
}

function removeFromWishlist(gameId) {
    wishlist = wishlist.filter(item => item.id !== gameId);
    updateWishlistDisplay();
    showNotification('Game removed from wishlist!');
}

function updateWishlistDisplay() {
    const wishlistCount = document.querySelector('.wishlist-count');
    if (wishlistCount) {
        wishlistCount.textContent = wishlist.length;
    }
}

function showWishlistModal() {
    if (wishlist.length === 0) {
        showNotification('Your wishlist is empty!', 'info');
        return;
    }
    
    const modal = document.createElement('div');
    modal.className = 'modal wishlist-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h2>Wishlist</h2>
                <button class="close-btn">&times;</button>
            </div>
            <div class="modal-body">
                ${wishlist.map(game => `
                    <div class="wishlist-item">
                        <img src="${game.image}" alt="${game.title}">
                        <div class="wishlist-item-info">
                            <h3>${game.title}</h3>
                            <p>$${game.price}</p>
                        </div>
                        <div class="wishlist-actions">
                            <button class="add-to-cart-btn" onclick="addToCart(${JSON.stringify(game).replace(/"/g, '&quot;')})">
                                <i class="fas fa-shopping-cart"></i>
                            </button>
                            <button class="remove-btn" onclick="removeFromWishlist(${game.id})">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </div>
                `).join('')}
            </div>
            <div class="modal-footer">
                <button class="clear-wishlist-btn" onclick="clearWishlist()">Clear Wishlist</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Close modal functionality
    modal.querySelector('.close-btn').addEventListener('click', () => {
        modal.remove();
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
}

function clearWishlist() {
    wishlist = [];
    updateWishlistDisplay();
    showNotification('Wishlist cleared!');
    document.querySelector('.wishlist-modal').remove();
}

function addToRecentlyViewed(game) {
    // Remove if already exists
    recentlyViewed = recentlyViewed.filter(item => item.id !== game.id);
    
    // Add to beginning
    recentlyViewed.unshift(game);
    
    // Keep only the most recent items
    if (recentlyViewed.length > MAX_RECENTLY_VIEWED) {
        recentlyViewed = recentlyViewed.slice(0, MAX_RECENTLY_VIEWED);
    }
    
    // Save to localStorage
    localStorage.setItem('steamRecentlyViewed', JSON.stringify(recentlyViewed));
}

function loadRecentlyViewed() {
    const saved = localStorage.getItem('steamRecentlyViewed');
    if (saved) {
        recentlyViewed = JSON.parse(saved);
    }
}

function displayRecentlyViewed() {
    if (recentlyViewed.length === 0) return;
    
    const container = document.getElementById('recently-viewed');
    if (!container) return;
    
    container.innerHTML = `
        <h3>Recently Viewed</h3>
        <div class="recently-viewed-grid">
            ${recentlyViewed.map(game => `
                <a href="game-detail.html" class="recent-game-item">
                    <img src="${game.image}" alt="${game.title}">
                    <div class="recent-game-info">
                        <h4>${game.title}</h4>
                        <p>$${calculateDiscountedPrice(game.price, game.discount).toFixed(2)}</p>
                    </div>
                </a>
            `).join('')}
        </div>
    `;
}
let currentPage = 1;
let gamesPerPage = 6;

function loadGames() {
    const container = document.getElementById('games-container');
    if (!container) return;

    // Show loading state
    container.innerHTML = '<div class="loading-spinner"><i class="fas fa-spinner fa-spin"></i> Loading games...</div>';
    container.classList.add('loading');

    // Simulate loading delay
    setTimeout(() => {
        displayGames();
        container.classList.remove('loading');
    }, 800);
}

function displayGames() {
    const container = document.getElementById('games-container');
    if (!container) return;

    const startIndex = (currentPage - 1) * gamesPerPage;
    const endIndex = startIndex + gamesPerPage;
    const gamesToShow = currentGames.slice(startIndex, endIndex);

    if (gamesToShow.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-search"></i>
                <h3>No games found</h3>
                <p>Try adjusting your filters or search terms to find more games.</p>
            </div>
        `;
        return;
    }

    container.innerHTML = gamesToShow.map(game => `
        <div class="game-item" data-game-id="${game.id}">
            <div class="game-image">
                <img src="${game.image}" alt="${game.title}">
                ${game.discount > 0 ? `<div class="game-badge">-${game.discount}%</div>` : ''}
                <div class="game-overlay">
                    <a href="game-detail.html" class="view-details-btn">View Details</a>
                </div>
            </div>
            <div class="game-info">
                <h3 class="game-title">${game.title}</h3>
                <div class="game-tags">
                    ${game.tags.map(tag => `<span class="game-tag">${tag}</span>`).join('')}
                </div>
                <div class="game-price">
                    ${game.discount > 0 ? `<span class="original-price">$${game.price.toFixed(2)}</span>` : ''}
                    <span class="current-price">$${calculateDiscountedPrice(game.price, game.discount).toFixed(2)}</span>
                </div>
                <div class="game-actions">
                    <button class="add-to-cart-btn" onclick="addToCart(${JSON.stringify(game).replace(/"/g, '&quot;')})">Add to Cart</button>
                    <button class="add-to-wishlist-btn" onclick="addToWishlist(${JSON.stringify(game).replace(/"/g, '&quot;')})">Add to Wishlist</button>
                </div>
            </div>
        </div>
    `).join('');

    // Add click events to game items
    addGameClickEvents();
}

function calculateDiscountedPrice(originalPrice, discount) {
    return originalPrice * (1 - discount / 100);
}

function addGameClickEvents() {
    const gameItems = document.querySelectorAll('.game-item');
    gameItems.forEach(item => {
        item.addEventListener('click', function() {
            const gameId = this.getAttribute('data-game-id');
            const game = gamesData.find(g => g.id == gameId);
            if (game) {
                showGameDetails(game);
            }
        });
    });
}

function showGameDetails(game) {
    // Add to recently viewed
    addToRecentlyViewed(game);
    // Create modal for game details
    const modal = document.createElement('div');
    modal.className = 'game-modal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0,0,0,0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;

    modal.innerHTML = `
        <div class="modal-content" style="
            background: #1b2838;
            border-radius: 8px;
            padding: 30px;
            max-width: 600px;
            width: 90%;
            position: relative;
            transform: translateY(20px);
            transition: transform 0.3s ease;
        ">
            <button class="close-btn" style="
                position: absolute;
                top: 15px;
                right: 20px;
                background: none;
                border: none;
                color: #c7d5e0;
                font-size: 24px;
                cursor: pointer;
            ">&times;</button>
            
            <div style="display: flex; gap: 20px; margin-bottom: 20px;">
                <img src="${game.image}" alt="${game.title}" style="width: 200px; height: 150px; object-fit: cover; border-radius: 8px;">
                <div>
                    <h2 style="color: #66c0f4; margin-bottom: 10px;">${game.title}</h2>
                    <p style="color: #8f98a0; margin-bottom: 10px;">${game.genre}</p>
                    <div style="display: flex; gap: 10px; margin-bottom: 15px;">
                        ${game.tags.map(tag => `<span style="background: #316282; color: #8f98a0; padding: 4px 8px; border-radius: 4px; font-size: 12px;">${tag}</span>`).join('')}
                    </div>
                    <div style="color: #66c0f4; font-size: 24px; font-weight: 600;">
                        $${calculateDiscountedPrice(game.price, game.discount).toFixed(2)}
                        ${game.discount > 0 ? `<span style="color: #8f98a0; text-decoration: line-through; font-size: 16px; margin-left: 10px;">$${game.price.toFixed(2)}</span>` : ''}
                    </div>
                </div>
            </div>
            
            <p style="color: #c7d5e0; line-height: 1.6; margin-bottom: 25px;">
                Experience the amazing world of ${game.title}. This game offers hours of entertainment with stunning graphics, 
                engaging gameplay, and an immersive story that will keep you hooked from start to finish.
            </p>
            
            <div style="display: flex; gap: 15px;">
                <button class="add-to-cart" style="
                    background: #5c7e10;
                    color: white;
                    border: none;
                    padding: 12px 24px;
                    border-radius: 4px;
                    cursor: pointer;
                    font-weight: 600;
                    flex: 1;
                ">Add to Cart</button>
                <button class="add-to-wishlist" style="
                    background: transparent;
                    color: #66c0f4;
                    border: 1px solid #66c0f4;
                    padding: 12px 24px;
                    border-radius: 4px;
                    cursor: pointer;
                    font-weight: 600;
                    flex: 1;
                ">Add to Wishlist</button>
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    // Animate in
    setTimeout(() => {
        modal.style.opacity = '1';
        modal.querySelector('.modal-content').style.transform = 'translateY(0)';
    }, 100);

    // Close functionality
    const closeBtn = modal.querySelector('.close-btn');
    closeBtn.addEventListener('click', () => {
        modal.style.opacity = '0';
        modal.querySelector('.modal-content').style.transform = 'translateY(20px)';
        setTimeout(() => modal.remove(), 300);
    });

    // Close on outside click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeBtn.click();
        }
    });

    // Add to cart functionality
    const addToCartBtn = modal.querySelector('.add-to-cart');
    addToCartBtn.addEventListener('click', function() {
        addToCart(game);
        this.textContent = 'Added to Cart!';
        this.style.background = '#4a7b9d';
        setTimeout(() => {
            modal.style.opacity = '0';
            modal.querySelector('.modal-content').style.transform = 'translateY(20px)';
            setTimeout(() => modal.remove(), 300);
        }, 1000);
    });
    
    // Add to wishlist functionality
    const addToWishlistBtn = modal.querySelector('.add-to-wishlist');
    addToWishlistBtn.addEventListener('click', function() {
        addToWishlist(game);
        this.textContent = 'Added to Wishlist!';
        this.style.background = '#66c0f4';
        setTimeout(() => {
            modal.style.opacity = '0';
            modal.querySelector('.modal-content').style.transform = 'translateY(20px)';
            setTimeout(() => modal.remove(), 300);
        }, 1000);
    });
}

function initFilters() {
    const applyBtn = document.querySelector('.apply-filters');
    const clearBtn = document.querySelector('.clear-filters');
    
    if (applyBtn) {
        applyBtn.addEventListener('click', applyFilters);
    }
    
    if (clearBtn) {
        clearBtn.addEventListener('click', clearFilters);
    }
}

function applyFilters() {
    const selectedCategories = Array.from(document.querySelectorAll('input[type="checkbox"]:checked')).map(cb => cb.value);
    const selectedRelease = document.querySelector('input[name="release"]:checked')?.value;
    const selectedReviews = document.querySelector('input[name="reviews"]:checked')?.value;
    const maxPrice = document.getElementById('price-range')?.value || 100;

    // Filter games based on selected criteria
    currentGames = gamesData.filter(game => {
        // Category filter - check if game genre or tags match selected categories
        if (selectedCategories.length > 0) {
            const gameCategory = game.genre.toLowerCase();
            const gameTags = game.tags.map(tag => tag.toLowerCase());
            const hasMatchingCategory = selectedCategories.some(cat => 
                gameCategory.includes(cat.toLowerCase()) || 
                gameTags.some(tag => tag.includes(cat.toLowerCase()))
            );
            if (!hasMatchingCategory) {
                return false;
            }
        }

        // Price filter
        const gamePrice = calculateDiscountedPrice(game.price, game.discount);
        if (gamePrice > maxPrice) {
            return false;
        }

        // Release year filter (simplified - using ID as proxy for release year)
        if (selectedRelease && selectedRelease !== 'all') {
            const releaseYear = parseInt(selectedRelease);
            // Simple logic: newer games have higher IDs
            if (releaseYear === 2024 && game.id < 9) return false;
            if (releaseYear === 2023 && (game.id < 6 || game.id > 10)) return false;
            if (releaseYear === 2022 && (game.id < 3 || game.id > 8)) return false;
            if (releaseYear === 2021 && (game.id < 1 || game.id > 5)) return false;
        }

        // User reviews filter
        if (selectedReviews && selectedReviews !== 'all') {
            const rating = game.rating;
            switch (selectedReviews) {
                case 'positive':
                    if (rating < 4.0) return false;
                    break;
                case 'very-positive':
                    if (rating < 4.5) return false;
                    break;
                case 'overwhelming':
                    if (rating < 4.8) return false;
                    break;
            }
        }

        return true;
    });

    currentPage = 1;
    displayGames();
    updatePagination();
    
    // Show notification
    const resultCount = currentGames.length;
    if (resultCount === 0) {
        showNotification('No games match your filters. Try adjusting your criteria.', 'info');
    } else {
        showNotification(`Found ${resultCount} games matching your filters`, 'success');
    }
}

function clearFilters() {
    // Reset all checkboxes
    document.querySelectorAll('input[type="checkbox"]').forEach(cb => cb.checked = false);
    document.querySelectorAll('input[type="radio"]').forEach(rb => rb.checked = false);
    
    // Reset price slider
    const priceRange = document.getElementById('price-range');
    if (priceRange) {
        priceRange.value = 60;
        updatePriceDisplay();
    }

    // Reset games
    currentGames = [...gamesData];
    currentPage = 1;
    displayGames();
    updatePagination();
}

function initSorting() {
    const sortSelect = document.getElementById('sort-select');
    if (sortSelect) {
        sortSelect.addEventListener('change', function() {
            sortGames(this.value);
        });
    }
}

function sortGames(sortBy) {
    switch (sortBy) {
        case 'price-low':
            currentGames.sort((a, b) => calculateDiscountedPrice(a.price, a.discount) - calculateDiscountedPrice(b.price, b.discount));
            break;
        case 'price-high':
            currentGames.sort((a, b) => calculateDiscountedPrice(b.price, b.discount) - calculateDiscountedPrice(a.price, a.discount));
            break;
        case 'newest':
            currentGames.sort((a, b) => b.id - a.id);
            break;
        case 'rating':
            currentGames.sort((a, b) => b.rating - a.rating);
            break;
        default: // relevance
            currentGames = [...gamesData];
            break;
    }
    
    currentPage = 1;
    displayGames();
    updatePagination();
}

function initViewToggle() {
    const viewBtns = document.querySelectorAll('.view-btn');
    viewBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const view = this.getAttribute('data-view');
            
            // Update active state
            viewBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Apply view changes
            const container = document.getElementById('games-container');
            if (container) {
                if (view === 'list') {
                    container.style.gridTemplateColumns = '1fr';
                } else {
                    container.style.gridTemplateColumns = 'repeat(auto-fill, minmax(280px, 1fr))';
                }
            }
        });
    });
}

function initPagination() {
    const pagination = document.querySelector('.pagination');
    if (pagination) {
        pagination.addEventListener('click', function(e) {
            if (e.target.classList.contains('page-btn')) {
                const page = e.target.getAttribute('data-page');
                if (page) {
                    currentPage = parseInt(page);
                    displayGames();
                    updatePagination();
                } else if (e.target.classList.contains('next')) {
                    if (currentPage < Math.ceil(currentGames.length / gamesPerPage)) {
                        currentPage++;
                        displayGames();
                        updatePagination();
                    }
                }
            }
        });
    }
    
    updatePagination();
}

function updatePagination() {
    const totalPages = Math.ceil(currentGames.length / gamesPerPage);
    const pagination = document.querySelector('.pagination');
    
    if (pagination) {
        const pageBtns = pagination.querySelectorAll('.page-btn:not(.next)');
        pageBtns.forEach(btn => {
            const page = parseInt(btn.getAttribute('data-page'));
            if (page <= totalPages) {
                btn.style.display = 'inline-block';
                btn.classList.toggle('active', page === currentPage);
            } else {
                btn.style.display = 'none';
            }
        });
    }
}

function initPriceSlider() {
    const priceRange = document.getElementById('price-range');
    const priceValue = document.getElementById('price-value');
    
    if (priceRange && priceValue) {
        priceRange.addEventListener('input', updatePriceDisplay);
        updatePriceDisplay();
    }
}

function updatePriceDisplay() {
    const priceRange = document.getElementById('price-range');
    const priceValue = document.getElementById('price-value');
    
    if (priceRange && priceValue) {
        priceValue.textContent = `$${priceRange.value}`;
    }
}

// Search functionality
function performStoreSearch(query) {
    if (!query.trim()) {
        currentGames = [...gamesData];
    } else {
        currentGames = gamesData.filter(game => 
            game.title.toLowerCase().includes(query.toLowerCase()) ||
            game.genre.toLowerCase().includes(query.toLowerCase()) ||
            game.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
        );
    }
    
    currentPage = 1;
    displayGames();
    updatePagination();
}

// Initialize search if search bar exists
const searchInput = document.querySelector('.search-bar input');
if (searchInput) {
    searchInput.addEventListener('input', function() {
        if (this.value.length > 2) {
            performStoreSearch(this.value);
        } else if (this.value.length === 0) {
            performStoreSearch('');
        }
    });
}
