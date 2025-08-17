// Steam Community Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    initCommunity();
});

function initCommunity() {
    initCommunityNav();
    initDiscussionItems();
    initGroupActions();
    initQuickActions();
    initCommunityStats();
    initRecentActivity();
    initSearchFunctionality();
    loadFriends();
}

// Community Navigation
function initCommunityNav() {
    const communityMenu = document.querySelector('.community-menu');
    if (communityMenu) {
        const menuItems = communityMenu.querySelectorAll('li a');
        menuItems.forEach(item => {
            item.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Remove active class from all items
                menuItems.forEach(menuItem => menuItem.classList.remove('active'));
                
                // Add active class to clicked item
                this.classList.add('active');
                
                // Handle navigation (in a real app, this would load different content)
                const section = this.getAttribute('href').substring(1);
                handleCommunityNavigation(section);
            });
        });
    }
}

function handleCommunityNavigation(section) {
    // Simulate loading different community sections
    const mainContent = document.querySelector('.community-main');
    if (!mainContent) return;

    // Show loading state
    mainContent.classList.add('loading');
    mainContent.innerHTML = '<div class="loading-spinner"><i class="fas fa-spinner fa-spin"></i> Loading...</div>';

    // Simulate API call delay
    setTimeout(() => {
        loadCommunitySection(section);
        mainContent.classList.remove('loading');
    }, 1000);
}

function loadCommunitySection(section) {
    const mainContent = document.querySelector('.community-main');
    if (!mainContent) return;

    switch (section) {
        case 'discussions':
            loadDiscussionsSection();
            break;
        case 'workshop':
            loadWorkshopSection();
            break;
        case 'market':
            loadMarketSection();
            break;
        case 'broadcasts':
            loadBroadcastsSection();
            break;
        case 'groups':
            loadGroupsSection();
            break;
        case 'guides':
            loadGuidesSection();
            break;
        case 'screenshots':
            loadScreenshotsSection();
            break;
        default:
            loadHomeSection();
    }
}

function loadHomeSection() {
    const mainContent = document.querySelector('.community-main');
    if (!mainContent) return;

    mainContent.innerHTML = `
        <div class="featured-discussions">
            <h2>Featured Discussions</h2>
            <div class="discussion-list">
                <div class="discussion-item">
                    <div class="discussion-avatar">
                        <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face" alt="User Avatar">
                    </div>
                    <div class="discussion-content">
                        <h3>Best RPG Games of 2024</h3>
                        <p>What are your favorite RPG games released this year? Share your thoughts and recommendations!</p>
                        <div class="discussion-meta">
                            <span class="author">by GamingMaster</span>
                            <span class="replies">24 replies</span>
                            <span class="views">1.2k views</span>
                            <span class="time">2 hours ago</span>
                        </div>
                    </div>
                    <div class="discussion-stats">
                        <div class="upvotes">+45</div>
                    </div>
                </div>
                <!-- More discussion items would be loaded here -->
            </div>
        </div>
        
        <div class="community-highlights">
            <h2>Community Highlights</h2>
            <div class="highlights-grid">
                <!-- Highlight cards would be loaded here -->
            </div>
        </div>
        
        <div class="trending-groups">
            <h2>Trending Groups</h2>
            <div class="groups-grid">
                <!-- Group cards would be loaded here -->
            </div>
        </div>
    `;

    // Reinitialize event listeners
    initDiscussionItems();
    initGroupActions();
}

function loadDiscussionsSection() {
    const mainContent = document.querySelector('.community-main');
    if (!mainContent) return;

    mainContent.innerHTML = `
        <div class="discussions-header">
            <h2>Community Discussions</h2>
            <button class="new-discussion-btn" style="
                background: #5c7e10;
                color: white;
                border: none;
                padding: 12px 24px;
                border-radius: 6px;
                font-size: 16px;
                font-weight: 600;
                cursor: pointer;
            ">Start New Discussion</button>
        </div>
        
        <div class="discussions-filters">
            <select style="
                background: #2a475e;
                color: #c7d5e0;
                border: 1px solid #316282;
                padding: 8px 12px;
                border-radius: 4px;
                margin-right: 15px;
            ">
                <option>All Topics</option>
                <option>Gaming</option>
                <option>Technical</option>
                <option>Community</option>
            </select>
            
            <select style="
                background: #2a475e;
                color: #c7d5e0;
                border: 1px solid #316282;
                padding: 8px 12px;
                border-radius: 4px;
            ">
                <option>Most Recent</option>
                <option>Most Popular</option>
                <option>Most Viewed</option>
            </select>
        </div>
        
        <div class="discussions-list">
            <!-- Discussions would be loaded here -->
        </div>
    `;

    // Add event listener for new discussion button
    const newDiscussionBtn = mainContent.querySelector('.new-discussion-btn');
    if (newDiscussionBtn) {
        newDiscussionBtn.addEventListener('click', showNewDiscussionForm);
    }
}

function loadWorkshopSection() {
    const mainContent = document.querySelector('.community-main');
    if (!mainContent) return;

    mainContent.innerHTML = `
        <div class="workshop-header">
            <h2>Steam Workshop</h2>
            <p>Discover and share user-created content for your favorite games</p>
        </div>
        
        <div class="workshop-categories">
            <button class="workshop-cat-btn active">All</button>
            <button class="workshop-cat-btn">Maps</button>
            <button class="workshop-cat-btn">Mods</button>
            <button class="workshop-cat-btn">Skins</button>
            <button class="workshop-cat-btn">Items</button>
        </div>
        
        <div class="workshop-content">
            <!-- Workshop items would be loaded here -->
        </div>
    `;

    // Add event listeners for workshop category buttons
    const workshopCatBtns = mainContent.querySelectorAll('.workshop-cat-btn');
    workshopCatBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            workshopCatBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            // Load workshop items for selected category
        });
    });
}

function loadMarketSection() {
    const mainContent = document.querySelector('.community-main');
    if (!mainContent) return;

    mainContent.innerHTML = `
        <div class="market-header">
            <h2>Steam Community Market</h2>
            <p>Buy, sell, and trade items from your favorite games</p>
        </div>
        
        <div class="market-search">
            <input type="text" placeholder="Search for items..." style="
                background: #2a475e;
                color: #c7d5e0;
                border: 1px solid #316282;
                padding: 12px 16px;
                border-radius: 4px;
                width: 100%;
                margin-bottom: 20px;
            ">
        </div>
        
        <div class="market-items">
            <!-- Market items would be loaded here -->
        </div>
    `;
}

function loadBroadcastsSection() {
    const mainContent = document.querySelector('.community-main');
    if (!mainContent) return;

    mainContent.innerHTML = `
        <div class="broadcasts-header">
            <h2>Live Broadcasts</h2>
            <button class="start-broadcast-btn" style="
                background: #5c7e10;
                color: white;
                border: none;
                padding: 12px 24px;
                border-radius: 6px;
                font-size: 16px;
                font-weight: 600;
                cursor: pointer;
            ">Start Broadcasting</button>
        </div>
        
        <div class="broadcasts-grid">
            <!-- Live broadcasts would be loaded here -->
        </div>
    `;

    // Add event listener for start broadcast button
    const startBroadcastBtn = mainContent.querySelector('.start-broadcast-btn');
    if (startBroadcastBtn) {
        startBroadcastBtn.addEventListener('click', showBroadcastSetup);
    }
}

function loadGroupsSection() {
    const mainContent = document.querySelector('.community-main');
    if (!mainContent) return;

    mainContent.innerHTML = `
        <div class="groups-header">
            <h2>Steam Groups</h2>
            <button class="create-group-btn" style="
                background: #5c7e10;
                color: white;
                border: none;
                padding: 12px 24px;
                border-radius: 6px;
                font-size: 16px;
                font-weight: 600;
                cursor: pointer;
            ">Create Group</button>
        </div>
        
        <div class="groups-filters">
            <input type="text" placeholder="Search groups..." style="
                background: #2a475e;
                color: #c7d5e0;
                border: 1px solid #316282;
                padding: 8px 12px;
                border-radius: 4px;
                width: 300px;
            ">
        </div>
        
        <div class="groups-list">
            <!-- Groups would be loaded here -->
        </div>
    `;

    // Add event listener for create group button
    const createGroupBtn = mainContent.querySelector('.create-group-btn');
    if (createGroupBtn) {
        createGroupBtn.addEventListener('click', showCreateGroupForm);
    }
}

function loadGuidesSection() {
    const mainContent = document.querySelector('.community-main');
    if (!mainContent) return;

    mainContent.innerHTML = `
        <div class="guides-header">
            <h2>Community Guides</h2>
            <button class="create-guide-btn" style="
                background: #5c7e10;
                color: white;
                border: none;
                padding: 12px 24px;
                border-radius: 6px;
                font-size: 16px;
                font-weight: 600;
                cursor: pointer;
            ">Create Guide</button>
        </div>
        
        <div class="guides-grid">
            <!-- Guides would be loaded here -->
        </div>
    `;

    // Add event listener for create guide button
    const createGuideBtn = mainContent.querySelector('.create-guide-btn');
    if (createGuideBtn) {
        createGuideBtn.addEventListener('click', showCreateGuideForm);
    }
}

function loadScreenshotsSection() {
    const mainContent = document.querySelector('.community-main');
    if (!mainContent) return;

    mainContent.innerHTML = `
        <div class="screenshots-header">
            <h2>Community Screenshots</h2>
            <button class="upload-screenshot-btn" style="
                background: #5c7e10;
                color: white;
                border: none;
                padding: 12px 24px;
                border-radius: 6px;
                font-size: 16px;
                font-weight: 600;
                cursor: pointer;
            ">Upload Screenshot</button>
        </div>
        
        <div class="screenshots-grid">
            <!-- Screenshots would be loaded here -->
        </div>
    `;

    // Add event listener for upload screenshot button
    const uploadScreenshotBtn = mainContent.querySelector('.upload-screenshot-btn');
    if (uploadScreenshotBtn) {
        uploadScreenshotBtn.addEventListener('click', showScreenshotUpload);
    }
}

// Discussion Items
function initDiscussionItems() {
    const discussionItems = document.querySelectorAll('.discussion-item');
    discussionItems.forEach(item => {
        item.addEventListener('click', function() {
            const title = this.querySelector('h3').textContent;
            showDiscussionDetails(title);
        });
    });
}

function showDiscussionDetails(title) {
    // Create modal for discussion details
    const modal = document.createElement('div');
    modal.className = 'discussion-modal';
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
            max-width: 700px;
            width: 90%;
            max-height: 80vh;
            overflow-y: auto;
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
            
            <h2 style="color: #66c0f4; margin-bottom: 20px;">${title}</h2>
            
            <div class="discussion-content" style="margin-bottom: 30px;">
                <p style="color: #c7d5e0; line-height: 1.6; margin-bottom: 20px;">
                    This is a detailed view of the discussion "${title}". Here you would see the full discussion thread, 
                    all replies, and be able to participate in the conversation.
                </p>
                
                <div class="discussion-meta" style="
                    background: #2a475e;
                    padding: 15px;
                    border-radius: 4px;
                    margin-bottom: 20px;
                ">
                    <p style="color: #8f98a0; margin: 0;">
                        <strong>Author:</strong> GamingMaster<br>
                        <strong>Created:</strong> 2 hours ago<br>
                        <strong>Replies:</strong> 24<br>
                        <strong>Views:</strong> 1.2k
                    </p>
                </div>
            </div>
            
            <div class="discussion-actions" style="display: flex; gap: 15px;">
                <button class="reply-btn" style="
                    background: #5c7e10;
                    color: white;
                    border: none;
                    padding: 12px 24px;
                    border-radius: 4px;
                    cursor: pointer;
                    font-weight: 600;
                ">Reply</button>
                <button class="subscribe-btn" style="
                    background: transparent;
                    color: #66c0f4;
                    border: 1px solid #66c0f4;
                    padding: 12px 24px;
                    border-radius: 4px;
                    cursor: pointer;
                    font-weight: 600;
                ">Subscribe</button>
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
}

// Group Actions
function initGroupActions() {
    const joinGroupBtns = document.querySelectorAll('.join-group');
    joinGroupBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const groupName = this.closest('.group-card').querySelector('h3').textContent;
            joinGroup(groupName, this);
        });
    });
}

function joinGroup(groupName, button) {
    // Simulate joining a group
    button.textContent = 'Joined!';
    button.style.background = '#4a7b9d';
    button.disabled = true;
    
    // Show notification
    showNotification(`Successfully joined ${groupName}!`, 'success');
}

// Quick Actions
function initQuickActions() {
    const actionBtns = document.querySelectorAll('.action-btn');
    actionBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const action = this.textContent.trim();
            handleQuickAction(action);
        });
    });
}

function handleQuickAction(action) {
    switch (action) {
        case 'New Discussion':
            showNewDiscussionForm();
            break;
        case 'Upload Screenshot':
            showScreenshotUpload();
            break;
        case 'Create Group':
            showCreateGroupForm();
            break;
        case 'Start Broadcast':
            showBroadcastSetup();
            break;
    }
}

// Community Stats
function initCommunityStats() {
    // Animate stats on scroll
    const statItems = document.querySelectorAll('.stat-item');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStat(entry.target);
            }
        });
    });

    statItems.forEach(item => observer.observe(item));
}

function animateStat(statItem) {
    const valueElement = statItem.querySelector('.stat-value');
    if (!valueElement) return;

    const finalValue = valueElement.textContent;
    const numericValue = parseInt(finalValue.replace(/[^\d]/g, ''));
    
    if (isNaN(numericValue)) return;

    let currentValue = 0;
    const increment = numericValue / 50;
    const timer = setInterval(() => {
        currentValue += increment;
        if (currentValue >= numericValue) {
            currentValue = numericValue;
            clearInterval(timer);
        }
        
        if (finalValue.includes('M')) {
            valueElement.textContent = (currentValue / 1000000).toFixed(1) + 'M';
        } else if (finalValue.includes('K')) {
            valueElement.textContent = (currentValue / 1000).toFixed(1) + 'K';
        } else {
            valueElement.textContent = Math.floor(currentValue).toLocaleString();
        }
    }, 50);
}

// Recent Activity
function initRecentActivity() {
    const activityItems = document.querySelectorAll('.activity-item');
    activityItems.forEach(item => {
        item.addEventListener('click', function() {
            const activityText = this.querySelector('.activity-text').textContent;
            showActivityDetails(activityText);
        });
    });
}

// Search Functionality
function initSearchFunctionality() {
    const searchInput = document.querySelector('.search-bar input');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            if (this.value.length > 2) {
                performCommunitySearch(this.value);
            }
        });
    }
}

function performCommunitySearch(query) {
    // Simulate community search
    console.log('Searching community for:', query);
    // In a real app, this would search discussions, groups, guides, etc.
}

// Utility Functions
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#5c7e10' : '#66c0f4'};
        color: white;
        padding: 15px 20px;
        border-radius: 4px;
        z-index: 10000;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Placeholder functions for forms and modals
function showNewDiscussionForm() {
    showNotification('New Discussion form would open here', 'info');
}

function showScreenshotUpload() {
    showNotification('Screenshot upload form would open here', 'info');
}

function showCreateGroupForm() {
    showNotification('Create Group form would open here', 'info');
}

function showBroadcastSetup() {
    showNotification('Broadcast setup would open here', 'info');
}

function showCreateGuideForm() {
    showNotification('Create Guide form would open here', 'info');
}

function showActivityDetails(activityText) {
    showNotification(`Activity details for: ${activityText}`, 'info');
}

// Friends functionality
function loadFriends() {
    const friendsData = [
        {
            id: 1,
            name: "GamingMaster",
            status: "online",
            game: "Playing Cyberpunk 2077",
            avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face"
        },
        {
            id: 2,
            name: "SaleHunter",
            status: "online",
            game: "Online",
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face"
        },
        {
            id: 3,
            name: "ModCreator",
            status: "away",
            game: "Away",
            avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=50&h=50&fit=crop&crop=face"
        },
        {
            id: 4,
            name: "SteamTrader",
            status: "online",
            game: "Trading",
            avatar: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=300&h=200&fit=crop&crop=center"
        }
    ];
    
    displayFriends(friendsData);
}

function displayFriends(friends) {
    const container = document.getElementById('friends-grid');
    if (!container) return;
    
    container.innerHTML = friends.map(friend => `
        <div class="friend-item ${friend.status}">
            <div class="friend-avatar">
                <img src="${friend.avatar}" alt="${friend.name}">
                <div class="status-indicator ${friend.status}"></div>
            </div>
            <div class="friend-info">
                <h3>${friend.name}</h3>
                <p class="friend-status">${friend.game}</p>
            </div>
            <div class="friend-actions">
                <button class="message-btn" title="Send Message">
                    <i class="fas fa-comment"></i>
                </button>
                <button class="profile-btn" title="View Profile">
                    <i class="fas fa-user"></i>
                </button>
            </div>
        </div>
    `).join('');
    
    // Add event listeners
    addFriendEventListeners();
}

function addFriendEventListeners() {
    const messageBtns = document.querySelectorAll('.message-btn');
    const profileBtns = document.querySelectorAll('.profile-btn');
    
    messageBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const friendName = this.closest('.friend-item').querySelector('h3').textContent;
            showNotification(`Message feature coming soon!`, 'info');
        });
    });
    
    profileBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const friendName = this.closest('.friend-item').querySelector('h3').textContent;
            showNotification(`Profile feature coming soon!`, 'info');
        });
    });
}
