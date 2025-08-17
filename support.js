// Steam Support Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    initSupport();
});

function initSupport() {
    initSupportSearch();
    initFAQ();
    initCategoryCards();
    initHelpItems();
    initContactOptions();
    initSupportResources();
    initSearchSuggestions();
}

// Support Search
function initSupportSearch() {
    const searchInput = document.querySelector('.support-search-bar input');
    const searchBtn = document.querySelector('.support-search-bar .search-btn');
    
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            if (this.value.length > 2) {
                showSearchSuggestions(this.value);
            } else {
                hideSearchSuggestions();
            }
        });
        
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSupportSearch(this.value);
            }
        });
    }
    
    if (searchBtn) {
        searchBtn.addEventListener('click', function() {
            const query = searchInput.value;
            performSupportSearch(query);
        });
    }
}

function showSearchSuggestions(query) {
    // Remove existing suggestions
    hideSearchSuggestions();
    
    // Sample suggestions based on query
    const suggestions = getSearchSuggestions(query);
    
    if (suggestions.length === 0) return;
    
    const suggestionsContainer = document.createElement('div');
    suggestionsContainer.className = 'search-suggestions';
    suggestionsContainer.style.cssText = `
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: #2a475e;
        border: 1px solid #316282;
        border-top: none;
        border-radius: 0 0 8px 8px;
        z-index: 1000;
        max-height: 300px;
        overflow-y: auto;
    `;
    
    suggestionsContainer.innerHTML = suggestions.map(suggestion => `
        <div class="suggestion-item" style="
            padding: 12px 16px;
            cursor: pointer;
            border-bottom: 1px solid #316282;
            transition: background-color 0.2s ease;
        " onmouseover="this.style.background='#316282'" onmouseout="this.style.background='transparent'">
            <div style="display: flex; align-items: center; gap: 12px;">
                <i class="fas fa-search" style="color: #8f98a0; font-size: 14px;"></i>
                <span style="color: #c7d5e0;">${suggestion.title}</span>
            </div>
            <div style="color: #8f98a0; font-size: 12px; margin-top: 4px;">${suggestion.description}</div>
        </div>
    `).join('');
    
    // Add click events
    const suggestionItems = suggestionsContainer.querySelectorAll('.suggestion-item');
    suggestionItems.forEach((item, index) => {
        item.addEventListener('click', function() {
            const suggestion = suggestions[index];
            performSupportSearch(suggestion.title);
            hideSearchSuggestions();
        });
    });
    
    // Insert after search bar
    const searchBar = document.querySelector('.support-search-bar');
    if (searchBar) {
        searchBar.style.position = 'relative';
        searchBar.appendChild(suggestionsContainer);
    }
}

function hideSearchSuggestions() {
    const existingSuggestions = document.querySelector('.search-suggestions');
    if (existingSuggestions) {
        existingSuggestions.remove();
    }
}

function getSearchSuggestions(query) {
    const lowerQuery = query.toLowerCase();
    const allSuggestions = [
        { title: 'Account Recovery', description: 'Help with recovering your Steam account' },
        { title: 'Payment Issues', description: 'Problems with purchases or payments' },
        { title: 'Game Won\'t Launch', description: 'Troubleshooting game launch issues' },
        { title: 'Download Problems', description: 'Issues with downloading games or updates' },
        { title: 'Friend List Issues', description: 'Problems with friends and social features' },
        { title: 'Steam Guard', description: 'Two-factor authentication help' },
        { title: 'Refund Request', description: 'How to request a refund for a game' },
        { title: 'Trading Problems', description: 'Issues with Steam trading system' }
    ];
    
    return allSuggestions.filter(suggestion => 
        suggestion.title.toLowerCase().includes(lowerQuery) ||
        suggestion.description.toLowerCase().includes(lowerQuery)
    );
}

function performSupportSearch(query) {
    if (!query.trim()) return;
    
    // Show loading state
    const mainContent = document.querySelector('.support-content');
    if (mainContent) {
        mainContent.classList.add('loading');
        mainContent.innerHTML = '<div class="loading-spinner"><i class="fas fa-spinner fa-spin"></i> Searching...</div>';
    }
    
    // Simulate search delay
    setTimeout(() => {
        const results = searchSupportDatabase(query);
        displaySearchResults(query, results);
        mainContent.classList.remove('loading');
    }, 1000);
}

function searchSupportDatabase(query) {
    // Simulate support database search
    const lowerQuery = query.toLowerCase();
    const allArticles = [
        { title: 'How to Recover Your Steam Account', category: 'Account Security', relevance: 95 },
        { title: 'Troubleshooting Payment Issues', category: 'Billing', relevance: 88 },
        { title: 'Game Launch Problems - Complete Guide', category: 'Technical Support', relevance: 82 },
        { title: 'Steam Guard Setup and Recovery', category: 'Account Security', relevance: 78 },
        { title: 'Download Speed Optimization', category: 'Technical Support', relevance: 75 },
        { title: 'Refund Policy and Process', category: 'Billing', relevance: 72 },
        { title: 'Friend List and Social Features', category: 'Community', relevance: 68 },
        { title: 'Steam Trading System Guide', category: 'Community', relevance: 65 }
    ];
    
    return allArticles
        .filter(article => 
            article.title.toLowerCase().includes(lowerQuery) ||
            article.category.toLowerCase().includes(lowerQuery)
        )
        .sort((a, b) => b.relevance - a.relevance);
}

function displaySearchResults(query, results) {
    const mainContent = document.querySelector('.support-content');
    if (!mainContent) return;
    
    if (results.length === 0) {
        mainContent.innerHTML = `
            <div class="search-results">
                <h2>No results found for "${query}"</h2>
                <p>Try different keywords or browse our support categories below.</p>
                <div class="suggested-topics">
                    <h3>Popular Topics</h3>
                    <div class="topic-tags">
                        <span class="topic-tag">Account Recovery</span>
                        <span class="topic-tag">Payment Issues</span>
                        <span class="topic-tag">Game Launch</span>
                        <span class="topic-tag">Steam Guard</span>
                    </div>
                </div>
            </div>
        `;
        return;
    }
    
    mainContent.innerHTML = `
        <div class="search-results">
            <h2>Search Results for "${query}"</h2>
            <p>Found ${results.length} articles</p>
            
            <div class="results-list">
                ${results.map(article => `
                    <div class="result-item" style="
                        background: #2a475e;
                        padding: 20px;
                        border-radius: 8px;
                        margin-bottom: 15px;
                        cursor: pointer;
                        transition: transform 0.2s ease;
                    " onmouseover="this.style.transform='translateY(-2px)'" onmouseout="this.style.transform='translateY(0)'">
                        <h3 style="color: #66c0f4; margin-bottom: 8px;">${article.title}</h3>
                        <p style="color: #8f98a0; font-size: 14px; margin-bottom: 10px;">Category: ${article.category}</p>
                        <div style="display: flex; justify-content: space-between; align-items: center;">
                            <span style="color: #66c0f4; font-size: 12px;">Relevance: ${article.relevance}%</span>
                            <button class="read-article-btn" style="
                                background: #5c7e10;
                                color: white;
                                border: none;
                                padding: 8px 16px;
                                border-radius: 4px;
                                font-size: 12px;
                                cursor: pointer;
                            ">Read Article</button>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
    
    // Add click events to result items
    const resultItems = mainContent.querySelectorAll('.result-item');
    resultItems.forEach((item, index) => {
        item.addEventListener('click', function() {
            const article = results[index];
            showArticleDetails(article);
        });
    });
}

function showArticleDetails(article) {
    const modal = document.createElement('div');
    modal.className = 'article-modal';
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
            
            <div class="article-header" style="margin-bottom: 25px;">
                <h2 style="color: #66c0f4; margin-bottom: 10px;">${article.title}</h2>
                <div style="display: flex; gap: 20px; color: #8f98a0; font-size: 14px;">
                    <span>Category: ${article.category}</span>
                    <span>Last Updated: Today</span>
                </div>
            </div>
            
            <div class="article-content" style="color: #c7d5e0; line-height: 1.7;">
                <p style="margin-bottom: 20px;">
                    This is a detailed support article about "${article.title}". Here you would find comprehensive 
                    information, step-by-step instructions, and troubleshooting tips to help resolve your issue.
                </p>
                
                <div style="background: #2a475e; padding: 20px; border-radius: 8px; margin: 20px 0;">
                    <h4 style="color: #66c0f4; margin-bottom: 15px;">Quick Steps</h4>
                    <ol style="color: #8f98a0; padding-left: 20px;">
                        <li>First, try the basic troubleshooting steps</li>
                        <li>Check if your system meets the requirements</li>
                        <li>Verify your Steam installation</li>
                        <li>Contact support if the issue persists</li>
                    </ol>
                </div>
                
                <p style="margin-bottom: 20px;">
                    For more detailed information and advanced troubleshooting, please read through the complete article 
                    or contact our support team if you need additional assistance.
                </p>
            </div>
            
            <div class="article-actions" style="
                display: flex;
                gap: 15px;
                margin-top: 25px;
                padding-top: 20px;
                border-top: 1px solid #2a475e;
            ">
                <button class="helpful-btn" style="
                    background: #5c7e10;
                    color: white;
                    border: none;
                    padding: 12px 24px;
                    border-radius: 4px;
                    cursor: pointer;
                    font-weight: 600;
                    flex: 1;
                ">This Article Was Helpful</button>
                <button class="not-helpful-btn" style="
                    background: transparent;
                    color: #66c0f4;
                    border: 1px solid #66c0f4;
                    padding: 12px 24px;
                    border-radius: 4px;
                    cursor: pointer;
                    font-weight: 600;
                    flex: 1;
                ">Not Helpful</button>
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

    // Article feedback buttons
    const helpfulBtn = modal.querySelector('.helpful-btn');
    const notHelpfulBtn = modal.querySelector('.not-helpful-btn');
    
    if (helpfulBtn) {
        helpfulBtn.addEventListener('click', function() {
            this.textContent = 'Thank you!';
            this.style.background = '#4a7b9d';
            this.disabled = true;
            showNotification('Thank you for your feedback!', 'success');
        });
    }
    
    if (notHelpfulBtn) {
        notHelpfulBtn.addEventListener('click', function() {
            this.textContent = 'Feedback Sent';
            this.style.background = '#4a7b9d';
            this.disabled = true;
            showNotification('We\'ll use your feedback to improve this article', 'info');
        });
    }
}

// FAQ System
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        if (question && answer) {
            question.addEventListener('click', function() {
                const isActive = item.classList.contains('active');
                
                // Close all other FAQ items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                    }
                });
                
                // Toggle current item
                if (isActive) {
                    item.classList.remove('active');
                } else {
                    item.classList.add('active');
                }
            });
        }
    });
}

// Category Cards
function initCategoryCards() {
    const categoryCards = document.querySelectorAll('.category-card');
    
    categoryCards.forEach(card => {
        card.addEventListener('click', function() {
            const category = this.querySelector('h3').textContent;
            showCategoryDetails(category);
        });
    });
}

function showCategoryDetails(category) {
    const modal = document.createElement('div');
    modal.className = 'category-modal';
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
            max-width: 800px;
            width: 90%;
            max-height: 80vh;
            overflow-y: auto;
            position: relative;
            transform: translateY(20px);
            transition: transform 0.3s ease;
        ">
            <button class="close-btn" style="
                position: absolute;
                top: 20px;
                right: 25px;
                background: none;
                border: none;
                color: #c7d5e0;
                font-size: 28px;
                cursor: pointer;
            ">&times;</button>
            
            <h2 style="color: #66c0f4; margin-bottom: 25px;">${category} Support</h2>
            
            <div class="category-content">
                <p style="color: #c7d5e0; line-height: 1.7; margin-bottom: 25px;">
                    Here you'll find comprehensive support resources for ${category} related issues. 
                    Browse through our articles, guides, and troubleshooting steps.
                </p>
                
                <div class="subcategories" style="margin-bottom: 30px;">
                    <h3 style="color: #66c0f4; margin-bottom: 20px;">Common Issues</h3>
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px;">
                        <div style="
                            background: #2a475e;
                            padding: 15px;
                            border-radius: 6px;
                            cursor: pointer;
                            transition: background-color 0.2s ease;
                        " onmouseover="this.style.background='#316282'" onmouseout="this.style.background='#2a475e'">
                            <h4 style="color: #c7d5e0; margin-bottom: 8px;">Getting Started</h4>
                            <p style="color: #8f98a0; font-size: 13px;">Basic setup and configuration</p>
                        </div>
                        <div style="
                            background: #2a475e;
                            padding: 15px;
                            border-radius: 6px;
                            cursor: pointer;
                            transition: background-color 0.2s ease;
                        " onmouseover="this.style.background='#316282'" onmouseout="this.style.background='#2a475e'">
                            <h4 style="color: #c7d5e0; margin-bottom: 8px;">Troubleshooting</h4>
                            <p style="color: #8f98a0; font-size: 13px;">Common problems and solutions</p>
                        </div>
                        <div style="
                            background: #2a475e;
                            padding: 15px;
                            border-radius: 6px;
                            cursor: pointer;
                            transition: background-color 0.2s ease;
                        " onmouseover="this.style.background='#316282'" onmouseout="this.style.background='#2a475e'">
                            <h4 style="color: #c7d5e0; margin-bottom: 8px;">Advanced Help</h4>
                            <p style="color: #8f98a0; font-size: 13px;">Expert-level solutions</p>
                        </div>
                    </div>
                </div>
                
                <div class="contact-support" style="text-align: center;">
                    <p style="color: #c7d5e0; margin-bottom: 20px;">
                        Can't find what you're looking for? Our support team is here to help.
                    </p>
                    <button class="contact-support-btn" style="
                        background: #66c0f4;
                        color: #1b2838;
                        border: none;
                        padding: 15px 30px;
                        border-radius: 6px;
                        font-size: 16px;
                        font-weight: 600;
                        cursor: pointer;
                    ">Contact Support</button>
                </div>
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

    // Contact support button
    const contactSupportBtn = modal.querySelector('.contact-support-btn');
    if (contactSupportBtn) {
        contactSupportBtn.addEventListener('click', function() {
            this.textContent = 'Opening...';
            setTimeout(() => {
                showNotification('Contact support form would open here', 'info');
                closeBtn.click();
            }, 1000);
        });
    }
}

// Help Items
function initHelpItems() {
    const helpItems = document.querySelectorAll('.help-item');
    
    helpItems.forEach(item => {
        const helpBtn = item.querySelector('.help-btn');
        if (helpBtn) {
            helpBtn.addEventListener('click', function() {
                const title = item.querySelector('h3').textContent;
                showHelpDetails(title);
            });
        }
    });
}

function showHelpDetails(title) {
    showNotification(`Help details for ${title} would open here`, 'info');
}

// Contact Options
function initContactOptions() {
    const contactCards = document.querySelectorAll('.contact-card');
    
    contactCards.forEach(card => {
        const contactBtn = card.querySelector('.contact-btn');
        if (contactBtn) {
            contactBtn.addEventListener('click', function() {
                const method = card.querySelector('h3').textContent;
                showContactMethod(method);
            });
        }
    });
}

function showContactMethod(method) {
    showNotification(`${method} contact form would open here`, 'info');
}

// Support Resources
function initSupportResources() {
    const resourceCards = document.querySelectorAll('.resource-card');
    
    resourceCards.forEach(card => {
        const resourceLink = card.querySelector('.resource-link');
        if (resourceLink) {
            resourceLink.addEventListener('click', function(e) {
                e.preventDefault();
                const resource = card.querySelector('h3').textContent;
                showResourceDetails(resource);
            });
        }
    });
}

function showResourceDetails(resource) {
    showNotification(`${resource} details would open here`, 'info');
}

// Search Suggestions
function initSearchSuggestions() {
    // Hide suggestions when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.support-search-bar')) {
            hideSearchSuggestions();
        }
    });
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

// Initialize search suggestions
document.addEventListener('DOMContentLoaded', function() {
    initSearchSuggestions();
});
