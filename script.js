// Steam Website JavaScript Functionality

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initSearchBar();
    initCountdownTimer();
    initGameCards();
    initCategoryCards();
    initSmoothScrolling();
    initMobileMenu();
});

// Search Bar Functionality
function initSearchBar() {
    const searchInput = document.querySelector('.search-bar input');
    const searchBtn = document.querySelector('.search-btn');
    
    if (searchInput && searchBtn) {
        // Search on Enter key
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
        
        // Search on button click
        searchBtn.addEventListener('click', performSearch);
        
        // Live search suggestions (simulated)
        searchInput.addEventListener('input', function() {
            if (this.value.length > 2) {
                showSearchSuggestions(this.value);
            } else {
                hideSearchSuggestions();
            }
        });
    }
}

function performSearch() {
    const searchInput = document.querySelector('.search-bar input');
    const query = searchInput.value.trim();
    
    if (query) {
        // Simulate search functionality
        console.log('Searching for:', query);
        
        // Show loading state
        const searchBtn = document.querySelector('.search-btn');
        const originalText = searchBtn.innerHTML;
        searchBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
        
        // Simulate search delay
        setTimeout(() => {
            searchBtn.innerHTML = originalText;
            showSearchResults(query);
        }, 1000);
    }
}

function showSearchSuggestions(query) {
    // Remove existing suggestions
    hideSearchSuggestions();
    
    // Create suggestions container
    const suggestionsContainer = document.createElement('div');
    suggestionsContainer.className = 'search-suggestions';
    suggestionsContainer.style.cssText = `
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: #316282;
        border: 1px solid #4a7b9d;
        border-top: none;
        border-radius: 0 0 4px 4px;
        z-index: 1000;
        max-height: 200px;
        overflow-y: auto;
    `;
    
    // Sample suggestions based on query
    const suggestions = [
        `${query} - Action Game`,
        `${query} - RPG`,
        `${query} - Strategy`,
        `${query} - Indie Game`
    ];
    
    suggestions.forEach(suggestion => {
        const suggestionItem = document.createElement('div');
        suggestionItem.className = 'suggestion-item';
        suggestionItem.style.cssText = `
            padding: 10px 15px;
            cursor: pointer;
            border-bottom: 1px solid #4a7b9d;
            transition: background-color 0.2s ease;
        `;
        suggestionItem.textContent = suggestion;
        
        suggestionItem.addEventListener('mouseenter', function() {
            this.style.backgroundColor = '#4a7b9d';
        });
        
        suggestionItem.addEventListener('mouseleave', function() {
            this.style.backgroundColor = 'transparent';
        });
        
        suggestionItem.addEventListener('click', function() {
            document.querySelector('.search-bar input').value = suggestion;
            hideSearchSuggestions();
            performSearch();
        });
        
        suggestionsContainer.appendChild(suggestionItem);
    });
    
    // Add suggestions to search bar
    const searchBar = document.querySelector('.search-bar');
    searchBar.style.position = 'relative';
    searchBar.appendChild(suggestionsContainer);
}

function hideSearchSuggestions() {
    const existingSuggestions = document.querySelector('.search-suggestions');
    if (existingSuggestions) {
        existingSuggestions.remove();
    }
}

function showSearchResults(query) {
    // Create a modal or notification for search results
    const notification = document.createElement('div');
    notification.className = 'search-notification';
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #5c7e10;
        color: white;
        padding: 15px 20px;
        border-radius: 4px;
        z-index: 10000;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    notification.innerHTML = `
        <i class="fas fa-search"></i>
        Search results for "${query}" would appear here
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Countdown Timer for Special Offers
function initCountdownTimer() {
    const timerNumbers = document.querySelectorAll('.timer-item .number');
    
    if (timerNumbers.length > 0) {
        // Set target date (24 hours from now)
        const targetDate = new Date();
        targetDate.setHours(targetDate.getHours() + 24);
        
        function updateTimer() {
            const now = new Date();
            const difference = targetDate - now;
            
            if (difference > 0) {
                const days = Math.floor(difference / (1000 * 60 * 60 * 24));
                const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
                
                if (timerNumbers[0]) timerNumbers[0].textContent = days.toString().padStart(2, '0');
                if (timerNumbers[1]) timerNumbers[1].textContent = hours.toString().padStart(2, '0');
                if (timerNumbers[2]) timerNumbers[2].textContent = minutes.toString().padStart(2, '0');
            } else {
                // Sale ended
                timerNumbers.forEach(number => {
                    number.textContent = '00';
                });
            }
        }
        
        // Update timer every minute
        updateTimer();
        setInterval(updateTimer, 60000);
    }
}

// Game Cards Interactions
function initGameCards() {
    const gameCards = document.querySelectorAll('.game-card');
    
    gameCards.forEach(card => {
        card.addEventListener('click', function() {
            // Add click effect
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
            
            // Simulate game page navigation
            const gameTitle = this.querySelector('h3').textContent;
            showGameDetails(gameTitle);
        });
        
        // Hover effects
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

function showGameDetails(gameTitle) {
    // Create game details modal
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
            max-width: 500px;
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
            <h2 style="color: #66c0f4; margin-bottom: 20px;">${gameTitle}</h2>
            <p style="color: #c7d5e0; margin-bottom: 20px;">This is a detailed view of ${gameTitle}. Here you would see screenshots, videos, system requirements, and more information about the game.</p>
            <div style="display: flex; gap: 15px; margin-top: 30px;">
                <button class="add-to-cart" style="
                    background: #5c7e10;
                    color: white;
                    border: none;
                    padding: 12px 24px;
                    border-radius: 4px;
                    cursor: pointer;
                    font-weight: 600;
                ">Add to Cart</button>
                <button class="add-to-wishlist" style="
                    background: transparent;
                    color: #66c0f4;
                    border: 1px solid #66c0f4;
                    padding: 12px 24px;
                    border-radius: 4px;
                    cursor: pointer;
                    font-weight: 600;
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
        this.textContent = 'Added to Cart!';
        this.style.background = '#4a7b9d';
        setTimeout(() => {
            modal.style.opacity = '0';
            modal.querySelector('.modal-content').style.transform = 'translateY(20px)';
            setTimeout(() => modal.remove(), 300);
        }, 1000);
    });
}

// Category Cards Interactions
function initCategoryCards() {
    const categoryCards = document.querySelectorAll('.category-card');
    
    categoryCards.forEach(card => {
        card.addEventListener('click', function() {
            const categoryName = this.querySelector('h3').textContent;
            showCategoryGames(categoryName);
        });
    });
}

function showCategoryGames(categoryName) {
    // Simulate category page navigation
    const notification = document.createElement('div');
    notification.className = 'category-notification';
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: #66c0f4;
        color: #1b2838;
        padding: 15px 25px;
        border-radius: 4px;
        z-index: 10000;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        font-weight: 600;
    `;
    notification.textContent = `Browsing ${categoryName} games...`;
    
    document.body.appendChild(notification);
    
    // Remove after 2 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => notification.remove(), 300);
    }, 2000);
}

// Smooth Scrolling
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Mobile Menu Toggle
function initMobileMenu() {
    // Create mobile menu button for small screens
    const navbar = document.querySelector('.navbar');
    const navContainer = document.querySelector('.nav-container');
    
    if (navbar && navContainer) {
        const mobileMenuBtn = document.createElement('button');
        mobileMenuBtn.className = 'mobile-menu-btn';
        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        mobileMenuBtn.style.cssText = `
            display: none;
            background: none;
            border: none;
            color: #c7d5e0;
            font-size: 20px;
            cursor: pointer;
            padding: 10px;
        `;
        
        // Add mobile menu button to navbar
        navbar.insertBefore(mobileMenuBtn, navContainer);
        
        // Mobile menu functionality
        mobileMenuBtn.addEventListener('click', function() {
            navContainer.classList.toggle('mobile-open');
            this.innerHTML = navContainer.classList.contains('mobile-open') ? 
                '<i class="fas fa-times"></i>' : '<i class="fas fa-bars">';
        });
        
        // Add mobile styles
        const mobileStyles = document.createElement('style');
        mobileStyles.textContent = `
            @media (max-width: 768px) {
                .mobile-menu-btn {
                    display: block !important;
                }
                
                .nav-container {
                    display: none;
                    flex-direction: column;
                    position: absolute;
                    top: 100%;
                    left: 0;
                    right: 0;
                    background: #171a21;
                    border-top: 1px solid #2a475e;
                    padding: 20px;
                }
                
                .nav-container.mobile-open {
                    display: flex;
                }
            }
        `;
        document.head.appendChild(mobileStyles);
    }
}

// Add some additional Steam-like features
function addSteamFeatures() {
    // Add loading animation for images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
        
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.3s ease';
    });
    
    // Add parallax effect to hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.style.transform = `translateY(${scrolled * 0.1}px)`;
        }
    });
    
    // Add typing effect to hero title
    const heroTitle = document.querySelector('.hero h1');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        heroTitle.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < originalText.length) {
                heroTitle.textContent += originalText.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };
        
        // Start typing effect after a delay
        setTimeout(typeWriter, 500);
    }
}

// Initialize additional features
document.addEventListener('DOMContentLoaded', function() {
    addSteamFeatures();
    initializeSearch();
    initGlobalAuth();
});

// Global search functionality
function initializeSearch() {
    const searchInputs = document.querySelectorAll('.search-bar input');
    searchInputs.forEach(input => {
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                const query = this.value.trim();
                if (query) {
                    performGlobalSearch(query);
                }
            }
        });
    });
}

// Global authentication system
function initGlobalAuth() {
    const loginBtns = document.querySelectorAll('.login-btn');
    loginBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            showAuthModal('signin');
        });
    });
    
    // Update all login buttons
    updateAllAuthButtons();
}

function isAuthenticated() {
    return localStorage.getItem('authToken') !== null;
}

function showAuthModal(mode) {
    // Create auth modal if it doesn't exist
    let authModal = document.getElementById('auth-modal');
    if (!authModal) {
        createAuthModal();
        authModal = document.getElementById('auth-modal');
    }
    
    const title = document.getElementById('auth-title');
    const submitBtn = document.getElementById('auth-submit-btn');
    const switchText = document.getElementById('auth-switch-text');
    const switchBtn = document.getElementById('auth-switch-btn');
    const confirmPasswordGroup = document.getElementById('confirm-password-group');
    const confirmPasswordInput = document.getElementById('auth-confirm-password');
    
    if (mode === 'signin') {
        title.textContent = 'Sign In';
        submitBtn.textContent = 'Sign In';
        switchText.textContent = "Don't have an account?";
        switchBtn.textContent = 'Sign Up';
        confirmPasswordGroup.style.display = 'none';
        confirmPasswordInput.removeAttribute('required');
    } else {
        title.textContent = 'Sign Up';
        submitBtn.textContent = 'Sign Up';
        switchText.textContent = 'Already have an account?';
        switchBtn.textContent = 'Sign In';
        confirmPasswordGroup.style.display = 'block';
        confirmPasswordInput.setAttribute('required', 'required');
    }
    
    authModal.classList.add('show');
}

function createAuthModal() {
    const modal = document.createElement('div');
    modal.id = 'auth-modal';
    modal.className = 'auth-modal';
    modal.innerHTML = `
        <div class="auth-modal-content">
            <div class="auth-modal-header">
                <h2 id="auth-title">Sign In</h2>
                <button class="close-modal" id="close-auth-modal">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="auth-modal-body">
                <form id="auth-form">
                    <div class="form-group">
                        <label for="auth-email">Email</label>
                        <input type="email" id="auth-email" required>
                    </div>
                    <div class="form-group">
                        <label for="auth-password">Password</label>
                        <input type="password" id="auth-password" required>
                    </div>
                    <div class="form-group" id="confirm-password-group" style="display: none;">
                        <label for="auth-confirm-password">Confirm Password</label>
                        <input type="password" id="auth-confirm-password">
                    </div>
                    <button type="submit" id="auth-submit-btn">Sign In</button>
                </form>
                <div class="auth-switch">
                    <span id="auth-switch-text">Don't have an account?</span>
                    <button id="auth-switch-btn">Sign Up</button>
                </div>
                <div class="auth-options">
                    <button class="auth-option-btn">
                        <i class="fab fa-steam"></i>
                        Sign in with Steam
                    </button>
                    <button class="auth-option-btn">
                        <i class="fab fa-google"></i>
                        Sign in with Google
                    </button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Add event listeners
    const closeModal = document.getElementById('close-auth-modal');
    const authForm = document.getElementById('auth-form');
    const authSwitchBtn = document.getElementById('auth-switch-btn');
    
    closeModal.addEventListener('click', hideAuthModal);
    authForm.addEventListener('submit', handleAuthSubmit);
    authSwitchBtn.addEventListener('click', toggleAuthMode);
    
    // Close modal when clicking outside
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            hideAuthModal();
        }
    });
}

function hideAuthModal() {
    const modal = document.getElementById('auth-modal');
    if (modal) {
        modal.classList.remove('show');
        document.getElementById('auth-form').reset();
    }
}

function toggleAuthMode() {
    const title = document.getElementById('auth-title');
    const currentMode = title.textContent === 'Sign In' ? 'signin' : 'signup';
    const newMode = currentMode === 'signin' ? 'signup' : 'signin';
    showAuthModal(newMode);
}

function handleAuthSubmit(e) {
    e.preventDefault();
    const email = document.getElementById('auth-email').value;
    const password = document.getElementById('auth-password').value;
    const confirmPassword = document.getElementById('auth-confirm-password').value;
    const title = document.getElementById('auth-title').textContent;
    
    if (title === 'Sign Up' && password !== confirmPassword) {
        showNotification('Passwords do not match', 'error');
        return;
    }
    
    const endpoint = title === 'Sign In' ? '/api/auth/login' : '/api/auth/register';
    const payload = { email, password };
    fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    }).then(async (res) => {
        if (!res.ok) {
            const msg = await res.text();
            throw new Error(msg || 'Authentication failed');
        }
        return res.json();
    }).then(data => {
        // Expecting shape: { token: string, user: { name, email, ... } }
        if (data.token) {
            localStorage.setItem('authToken', data.token);
        }
        if (data.user) {
            localStorage.setItem('steamUser', JSON.stringify(data.user));
        } else {
            // Fallback user
            localStorage.setItem('steamUser', JSON.stringify({ email, name: email.split('@')[0] }));
        }
        hideAuthModal();
        updateAllAuthButtons();
        showNotification(title === 'Sign In' ? 'Successfully signed in!' : 'Account created successfully!', 'success');
    }).catch(err => {
        showNotification(err.message || 'Authentication failed', 'error');
    });
}

function logout() {
    localStorage.removeItem('steamUser');
    localStorage.removeItem('authToken');
    updateAllAuthButtons();
    showNotification('Successfully signed out!', 'success');
}

function updateAllAuthButtons() {
    const loginBtns = document.querySelectorAll('.login-btn');
    loginBtns.forEach(btn => {
        if (isAuthenticated()) {
            const user = JSON.parse(localStorage.getItem('steamUser'));
            btn.textContent = user && user.name ? user.name : 'Account';
            btn.style.background = '#5c7e10';
        } else {
            btn.textContent = 'login';
            btn.style.background = '#2a475e';
        }
    });
}

function performGlobalSearch(query) {
    // Store the search query in sessionStorage for cross-page search
    sessionStorage.setItem('steamSearchQuery', query);
    
    // Redirect to main index with search (merged store)
    if (!window.location.pathname.includes('index.html')) {
        window.location.href = `index.html?search=${encodeURIComponent(query)}`;
    } else {
        // If we're already on store page, trigger search
        if (typeof performStoreSearch === 'function') {
            performStoreSearch(query);
        }
    }
}

// Add some Steam-specific animations
function addSteamAnimations() {
    // Steam logo animation
    const steamLogo = document.querySelector('.logo i');
    if (steamLogo) {
        steamLogo.addEventListener('mouseenter', function() {
            this.style.transform = 'rotate(360deg)';
            this.style.transition = 'transform 0.5s ease';
        });
        
        steamLogo.addEventListener('mouseleave', function() {
            this.style.transform = 'rotate(0deg)';
        });
    }
    
    // Add hover effects to buttons
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
            this.style.boxShadow = '0 4px 12px rgba(0,0,0,0.3)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
    });
}

// Initialize animations
document.addEventListener('DOMContentLoaded', function() {
    addSteamAnimations();
});

// Notification system
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Hide and remove notification
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}
