// Game Detail Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    initGameDetail();
    initAuthentication();
    initGameNavigation();
    initInteractiveFeatures();
});

// Initialize game detail page
function initGameDetail() {
    // Load cart and wishlist counts
    updateCartDisplay();
    updateWishlistDisplay();
    
    // Add event listeners for game actions
    document.getElementById('add-to-cart-btn').addEventListener('click', function() {
        const game = {
            id: 'cyberpunk-2077',
            title: 'Cyberpunk 2077',
            price: 59.99,
            image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=600&fit=crop&crop=center'
        };
        addToCart(game);
        showNotification('Added to cart!', 'success');
    });
    
    document.getElementById('add-to-wishlist-btn').addEventListener('click', function() {
        const game = {
            id: 'cyberpunk-2077',
            title: 'Cyberpunk 2077',
            price: 59.99,
            image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=600&fit=crop&crop=center'
        };
        addToWishlist(game);
        showNotification('Added to wishlist!', 'success');
    });
    
    document.getElementById('play-now-btn').addEventListener('click', function() {
        if (isAuthenticated()) {
            showNotification('Launching Cyberpunk 2077...', 'info');
            // Simulate game launch
            setTimeout(() => {
                showNotification('Game launched successfully!', 'success');
            }, 2000);
        } else {
            showNotification('Please sign in to play games', 'error');
            showAuthModal('signin');
        }
    });
    
    // Add DLC to cart functionality
    document.querySelectorAll('.add-dlc-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const dlcItem = this.closest('.dlc-item');
            const dlcTitle = dlcItem.querySelector('h4').textContent;
            const dlcPrice = dlcItem.querySelector('.dlc-price').textContent;
            
            const dlc = {
                id: `dlc-${Date.now()}`,
                title: dlcTitle,
                price: parseFloat(dlcPrice.replace('$', '')),
                image: dlcItem.querySelector('img').src,
                type: 'DLC'
            };
            
            addToCart(dlc);
            showNotification(`${dlcTitle} added to cart!`, 'success');
        });
    });
}

// Initialize authentication system
function initAuthentication() {
    // Authentication is now handled globally in script.js
    // Just update the auth button for this page
    updateAuthButton();
}

// Initialize game navigation
function initGameNavigation() {
    const navLinks = document.querySelectorAll('.game-nav-link');
    const sections = document.querySelectorAll('.game-section');
    
    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
                
                // Update active navigation
                navLinks.forEach(l => l.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });
    
    // Update active navigation on scroll
    window.addEventListener('scroll', function() {
        const scrollPos = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
}

// Initialize interactive features
function initInteractiveFeatures() {
    // Screenshot click to enlarge
    document.querySelectorAll('.screenshot-item img').forEach(img => {
        img.addEventListener('click', function() {
            showImageModal(this.src, this.alt);
        });
    });
    
    // Video thumbnail click
    document.querySelectorAll('.video-thumbnail').forEach(thumbnail => {
        thumbnail.addEventListener('click', function() {
            const videoTitle = this.parentElement.querySelector('h4').textContent;
            showVideoModal(videoTitle);
        });
    });
    
    // Review helpful button
    document.querySelectorAll('.helpful-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const helpfulCount = this.previousElementSibling;
            let count = parseInt(helpfulCount.textContent);
            helpfulCount.textContent = `${count + 1} helpful`;
            
            this.style.background = '#5c7e10';
            this.style.color = '#ffffff';
            this.disabled = true;
        });
    });
    
    // Review filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            filterReviews(this.dataset.filter);
        });
    });
    
    // Related game clicks
    document.querySelectorAll('.related-game-item').forEach(item => {
        item.addEventListener('click', function() {
            const gameTitle = this.querySelector('h4').textContent;
            showNotification(`Navigating to ${gameTitle}...`, 'info');
            // In a real app, this would navigate to the game's detail page
        });
    });
}

// Authentication functions - now using global functions from script.js
function updateAuthButton() {
    const loginBtn = document.getElementById('login-btn');
    if (isAuthenticated()) {
        const user = JSON.parse(localStorage.getItem('steamUser'));
        loginBtn.textContent = user.name;
        loginBtn.style.background = '#5c7e10';
    } else {
        loginBtn.textContent = 'login';
        loginBtn.style.background = '#2a475e';
    }
}

// Cart and wishlist functions
function addToCart(item) {
    let cart = JSON.parse(localStorage.getItem('steamCart') || '[]');
    
    // Check if item already exists
    const existingItem = cart.find(cartItem => cartItem.id === item.id);
    if (existingItem) {
        existingItem.quantity = (existingItem.quantity || 1) + 1;
    } else {
        item.quantity = 1;
        cart.push(item);
    }
    
    localStorage.setItem('steamCart', JSON.stringify(cart));
    updateCartDisplay();
}

function addToWishlist(item) {
    let wishlist = JSON.parse(localStorage.getItem('steamWishlist') || '[]');
    
    // Check if item already exists
    if (!wishlist.find(wishlistItem => wishlistItem.id === item.id)) {
        wishlist.push(item);
        localStorage.setItem('steamWishlist', JSON.stringify(wishlist));
        updateWishlistDisplay();
    }
}

function updateCartDisplay() {
    const cart = JSON.parse(localStorage.getItem('steamCart') || '[]');
    const cartCount = document.querySelector('.cart-count');
    const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
    cartCount.textContent = totalItems;
}

function updateWishlistDisplay() {
    const wishlist = JSON.parse(localStorage.getItem('steamWishlist') || '[]');
    const wishlistCount = document.querySelector('.wishlist-count');
    wishlistCount.textContent = wishlist.length;
}

// Interactive feature functions
function showImageModal(imageSrc, imageAlt) {
    const modal = document.createElement('div');
    modal.className = 'image-modal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.9);
        z-index: 10001;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
    `;
    
    const img = document.createElement('img');
    img.src = imageSrc;
    img.alt = imageAlt;
    img.style.cssText = `
        max-width: 90%;
        max-height: 90%;
        object-fit: contain;
        border-radius: 8px;
    `;
    
    modal.appendChild(img);
    document.body.appendChild(modal);
    
    modal.addEventListener('click', function() {
        document.body.removeChild(modal);
    });
}

function showVideoModal(videoTitle) {
    showNotification(`Playing ${videoTitle}...`, 'info');
    // In a real app, this would open a video player
}

function filterReviews(filter) {
    const reviews = document.querySelectorAll('.review-item');
    
    reviews.forEach(review => {
        let show = true;
        
        switch(filter) {
            case 'positive':
                show = review.querySelector('.helpful-count').textContent.includes('helpful');
                break;
            case 'negative':
                show = !review.querySelector('.helpful-count').textContent.includes('helpful');
                break;
            case 'recent':
                // Show all for now, in real app would filter by date
                show = true;
                break;
            default:
                show = true;
        }
        
        review.style.display = show ? 'block' : 'none';
    });
}

// Notification system
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Add notification styles if not already present
    if (!document.querySelector('.notification')) {
        const style = document.createElement('style');
        style.textContent = `
            .notification {
                position: fixed;
                top: 20px;
                right: 20px;
                background: #5c7e10;
                color: white;
                padding: 15px 20px;
                border-radius: 8px;
                box-shadow: 0 4px 12px rgba(0,0,0,0.3);
                z-index: 10000;
                transform: translateX(400px);
                transition: transform 0.3s ease;
                max-width: 300px;
            }
            .notification.show {
                transform: translateX(0);
            }
            .notification.error {
                background: #c7d5e0;
                color: #1b2838;
            }
            .notification.info {
                background: #66c0f4;
                color: white;
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Add cart and wishlist click handlers
document.addEventListener('DOMContentLoaded', function() {
    const cartBtn = document.getElementById('cart-btn');
    const wishlistBtn = document.getElementById('wishlist-btn');
    
    if (cartBtn) {
        cartBtn.addEventListener('click', function() {
            showCartModal();
        });
    }
    
    if (wishlistBtn) {
        wishlistBtn.addEventListener('click', function() {
            showWishlistModal();
        });
    }
});

function showCartModal() {
    const cart = JSON.parse(localStorage.getItem('steamCart') || '[]');
    
    if (cart.length === 0) {
        showNotification('Your cart is empty', 'info');
        return;
    }
    
    const modal = document.createElement('div');
    modal.className = 'cart-modal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.8);
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: center;
    `;
    
    const total = cart.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
    
    modal.innerHTML = `
        <div class="cart-modal-content" style="
            background: #2a475e;
            border-radius: 12px;
            padding: 30px;
            max-width: 500px;
            max-height: 80vh;
            overflow-y: auto;
        ">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                <h2 style="color: white; margin: 0;">Shopping Cart</h2>
                <button class="close-cart" style="
                    background: none;
                    border: none;
                    color: #8f98a0;
                    font-size: 1.5rem;
                    cursor: pointer;
                ">×</button>
            </div>
            <div class="cart-items">
                ${cart.map(item => `
                    <div class="cart-item" style="
                        display: flex;
                        align-items: center;
                        gap: 15px;
                        padding: 15px;
                        background: #1b2838;
                        border-radius: 8px;
                        margin-bottom: 10px;
                    ">
                        <img src="${item.image}" alt="${item.title}" style="
                            width: 60px;
                            height: 60px;
                            object-fit: cover;
                            border-radius: 4px;
                        ">
                        <div style="flex: 1;">
                            <h4 style="color: white; margin: 0 0 5px 0;">${item.title}</h4>
                            <p style="color: #66c0f4; margin: 0;">$${item.price}</p>
                        </div>
                        <button class="remove-item" data-id="${item.id}" style="
                            background: #c7d5e0;
                            color: #1b2838;
                            border: none;
                            padding: 5px 10px;
                            border-radius: 4px;
                            cursor: pointer;
                        ">Remove</button>
                    </div>
                `).join('')}
            </div>
            <div class="cart-total" style="
                border-top: 1px solid #1b2838;
                padding-top: 20px;
                margin-top: 20px;
                text-align: right;
            ">
                <h3 style="color: white; margin: 0 0 10px 0;">Total: $${total.toFixed(2)}</h3>
                <button class="checkout-btn" style="
                    background: #5c7e10;
                    color: white;
                    border: none;
                    padding: 12px 24px;
                    border-radius: 6px;
                    cursor: pointer;
                    margin-right: 10px;
                ">Checkout</button>
                <button class="clear-cart-btn" style="
                    background: #2a475e;
                    color: white;
                    border: 1px solid #1b2838;
                    padding: 12px 24px;
                    border-radius: 6px;
                    cursor: pointer;
                ">Clear Cart</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Add event listeners
    modal.querySelector('.close-cart').addEventListener('click', () => {
        document.body.removeChild(modal);
    });
    
    modal.querySelector('.checkout-btn').addEventListener('click', () => {
        showNotification('Proceeding to checkout...', 'info');
        document.body.removeChild(modal);
    });
    
    modal.querySelector('.clear-cart-btn').addEventListener('click', () => {
        localStorage.removeItem('steamCart');
        updateCartDisplay();
        showNotification('Cart cleared!', 'success');
        document.body.removeChild(modal);
    });
    
    modal.querySelectorAll('.remove-item').forEach(btn => {
        btn.addEventListener('click', function() {
            const itemId = this.dataset.id;
            let cart = JSON.parse(localStorage.getItem('steamCart') || '[]');
            cart = cart.filter(item => item.id !== itemId);
            localStorage.setItem('steamCart', JSON.stringify(cart));
            updateCartDisplay();
            showNotification('Item removed from cart', 'success');
            this.closest('.cart-item').remove();
            
            if (cart.length === 0) {
                modal.querySelector('.cart-items').innerHTML = '<p style="color: #8f98a0; text-align: center;">Your cart is empty</p>';
                modal.querySelector('.cart-total').style.display = 'none';
            }
        });
    });
}

function showWishlistModal() {
    const wishlist = JSON.parse(localStorage.getItem('steamWishlist') || '[]');
    
    if (wishlist.length === 0) {
        showNotification('Your wishlist is empty', 'info');
        return;
    }
    
    const modal = document.createElement('div');
    modal.className = 'wishlist-modal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.8);
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: center;
    `;
    
    modal.innerHTML = `
        <div class="wishlist-modal-content" style="
            background: #2a475e;
            border-radius: 12px;
            padding: 30px;
            max-width: 500px;
            max-height: 80vh;
            overflow-y: auto;
        ">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                <h2 style="color: white; margin: 0;">Wishlist</h2>
                <button class="close-wishlist" style="
                    background: none;
                    border: none;
                    color: #8f98a0;
                    font-size: 1.5rem;
                    cursor: pointer;
                ">×</button>
            </div>
            <div class="wishlist-items">
                ${wishlist.map(item => `
                    <div class="wishlist-item" style="
                        display: flex;
                        align-items: center;
                        gap: 15px;
                        padding: 15px;
                        background: #1b2838;
                        border-radius: 8px;
                        margin-bottom: 10px;
                    ">
                        <img src="${item.image}" alt="${item.title}" style="
                            width: 60px;
                            height: 60px;
                            object-fit: cover;
                            border-radius: 4px;
                        ">
                        <div style="flex: 1;">
                            <h4 style="color: white; margin: 0 0 5px 0;">${item.title}</h4>
                            <p style="color: #66c0f4; margin: 0;">$${item.price}</p>
                        </div>
                        <button class="add-to-cart-from-wishlist" data-id="${item.id}" style="
                            background: #5c7e10;
                            color: white;
                            border: none;
                            padding: 5px 10px;
                            border-radius: 4px;
                            cursor: pointer;
                            margin-right: 10px;
                        ">Add to Cart</button>
                        <button class="remove-from-wishlist" data-id="${item.id}" style="
                            background: #c7d5e0;
                            color: #1b2838;
                            border: none;
                            padding: 5px 10px;
                            border-radius: 4px;
                            cursor: pointer;
                        ">Remove</button>
                    </div>
                `).join('')}
            </div>
            <div class="wishlist-actions" style="
                border-top: 1px solid #1b2838;
                padding-top: 20px;
                margin-top: 20px;
                text-align: center;
            ">
                <button class="clear-wishlist-btn" style="
                    background: #2a475e;
                    color: white;
                    border: 1px solid #1b2838;
                    padding: 12px 24px;
                    border-radius: 6px;
                    cursor: pointer;
                ">Clear Wishlist</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Add event listeners
    modal.querySelector('.close-wishlist').addEventListener('click', () => {
        document.body.removeChild(modal);
    });
    
    modal.querySelector('.clear-wishlist-btn').addEventListener('click', () => {
        localStorage.removeItem('steamWishlist');
        updateWishlistDisplay();
        showNotification('Wishlist cleared!', 'success');
        document.body.removeChild(modal);
    });
    
    modal.querySelectorAll('.add-to-cart-from-wishlist').forEach(btn => {
        btn.addEventListener('click', function() {
            const itemId = this.dataset.id;
            const wishlist = JSON.parse(localStorage.getItem('steamWishlist') || '[]');
            const item = wishlist.find(wishlistItem => wishlistItem.id === itemId);
            
            if (item) {
                addToCart(item);
                showNotification(`${item.title} added to cart!`, 'success');
            }
        });
    });
    
    modal.querySelectorAll('.remove-from-wishlist').forEach(btn => {
        btn.addEventListener('click', function() {
            const itemId = this.dataset.id;
            let wishlist = JSON.parse(localStorage.getItem('steamWishlist') || '[]');
            wishlist = wishlist.filter(item => item.id !== itemId);
            localStorage.setItem('steamWishlist', JSON.stringify(wishlist));
            updateWishlistDisplay();
            showNotification('Item removed from wishlist', 'success');
            this.closest('.wishlist-item').remove();
            
            if (wishlist.length === 0) {
                modal.querySelector('.wishlist-items').innerHTML = '<p style="color: #8f98a0; text-align: center;">Your wishlist is empty</p>';
                modal.querySelector('.wishlist-actions').style.display = 'none';
            }
        });
    });
}
