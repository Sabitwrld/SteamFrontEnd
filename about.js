// Steam About Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    initAbout();
});

function initAbout() {
    initTimelineAnimation();
    initStatsAnimation();
    initValueCards();
    initTeamMembers();
    initCareersSection();
    initScrollAnimations();
}

// Timeline Animation
function initTimelineAnimation() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0)';
            }
        });
    }, { threshold: 0.5 });

    timelineItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = index % 2 === 0 ? 'translateX(-50px)' : 'translateX(50px)';
        item.style.transition = 'all 0.8s ease';
        item.style.transitionDelay = `${index * 0.2}s`;
        observer.observe(item);
    });
}

// Stats Animation
function initStatsAnimation() {
    const statCards = document.querySelectorAll('.stat-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStatNumber(entry.target);
            }
        });
    }, { threshold: 0.5 });

    statCards.forEach(card => {
        observer.observe(card);
    });
}

function animateStatNumber(statCard) {
    const numberElement = statCard.querySelector('.stat-number');
    if (!numberElement) return;

    const finalText = numberElement.textContent;
    const finalNumber = parseInt(finalText.replace(/[^\d]/g, ''));
    
    if (isNaN(finalNumber)) return;

    let currentNumber = 0;
    const increment = finalNumber / 50;
    const timer = setInterval(() => {
        currentNumber += increment;
        if (currentNumber >= finalNumber) {
            currentNumber = finalNumber;
            clearInterval(timer);
        }

        if (finalText.includes('M')) {
            numberElement.textContent = (currentNumber / 1000000).toFixed(1) + 'M';
        } else if (finalText.includes('K')) {
            numberElement.textContent = (currentNumber / 1000).toFixed(1) + 'K';
        } else if (finalText.includes('+')) {
            numberElement.textContent = Math.floor(currentNumber).toLocaleString() + '+';
        } else {
            numberElement.textContent = Math.floor(currentNumber).toLocaleString();
        }
    }, 50);
}

// Value Cards
function initValueCards() {
    const valueCards = document.querySelectorAll('.value-card');
    
    valueCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Team Members
function initTeamMembers() {
    const teamMembers = document.querySelectorAll('.team-member');
    
    teamMembers.forEach(member => {
        member.addEventListener('mouseenter', function() {
            const photo = this.querySelector('.member-photo img');
            if (photo) {
                photo.style.transform = 'scale(1.05)';
                photo.style.borderColor = '#5c7e10';
            }
        });
        
        member.addEventListener('mouseleave', function() {
            const photo = this.querySelector('.member-photo img');
            if (photo) {
                photo.style.transform = 'scale(1)';
                photo.style.borderColor = '#66c0f4';
            }
        });
    });
}

// Careers Section
function initCareersSection() {
    const careersBtn = document.querySelector('.careers-btn');
    if (careersBtn) {
        careersBtn.addEventListener('click', function() {
            showCareersModal();
        });
    }
}

function showCareersModal() {
    const modal = document.createElement('div');
    modal.className = 'careers-modal';
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
            border-radius: 12px;
            padding: 40px;
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
            
            <h2 style="color: #66c0f4; font-size: 32px; margin-bottom: 30px; text-align: center;">Join Our Team</h2>
            
            <div class="careers-content">
                <div class="careers-intro" style="margin-bottom: 30px;">
                    <p style="color: #c7d5e0; font-size: 16px; line-height: 1.7; text-align: center;">
                        We're looking for passionate individuals who want to shape the future of gaming. 
                        Join us in creating amazing experiences for millions of players worldwide.
                    </p>
                </div>
                
                <div class="careers-benefits" style="margin-bottom: 30px;">
                    <h3 style="color: #66c0f4; font-size: 24px; margin-bottom: 20px;">Why Work at Steam?</h3>
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px;">
                        <div style="background: #2a475e; padding: 20px; border-radius: 8px;">
                            <i class="fas fa-gamepad" style="color: #66c0f4; font-size: 24px; margin-bottom: 15px; display: block;"></i>
                            <h4 style="color: #c7d5e0; margin-bottom: 10px;">Work on Gaming</h4>
                            <p style="color: #8f98a0; font-size: 14px;">Be part of the gaming industry and work on cutting-edge technology.</p>
                        </div>
                        <div style="background: #2a475e; padding: 20px; border-radius: 8px;">
                            <i class="fas fa-users" style="color: #66c0f4; font-size: 24px; margin-bottom: 15px; display: block;"></i>
                            <h4 style="color: #c7d5e0; margin-bottom: 10px;">Great Team</h4>
                            <p style="color: #8f98a0; font-size: 14px;">Work with talented and passionate individuals from around the world.</p>
                        </div>
                        <div style="background: #2a475e; padding: 20px; border-radius: 8px;">
                            <i class="fas fa-rocket" style="color: #66c0f4; font-size: 24px; margin-bottom: 15px; display: block;"></i>
                            <h4 style="color: #c7d5e0; margin-bottom: 10px;">Innovation</h4>
                            <p style="color: #8f98a0; font-size: 14px;">Push boundaries and work on the next big thing in gaming.</p>
                        </div>
                    </div>
                </div>
                
                <div class="open-positions" style="margin-bottom: 30px;">
                    <h3 style="color: #66c0f4; font-size: 24px; margin-bottom: 20px;">Open Positions</h3>
                    <div class="position-list">
                        <div class="position-item" style="
                            background: #2a475e;
                            padding: 20px;
                            border-radius: 8px;
                            margin-bottom: 15px;
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                        ">
                            <div>
                                <h4 style="color: #c7d5e0; margin-bottom: 5px;">Senior Game Developer</h4>
                                <p style="color: #8f98a0; font-size: 14px;">Full-time • Seattle, WA</p>
                            </div>
                            <button class="apply-btn" style="
                                background: #5c7e10;
                                color: white;
                                border: none;
                                padding: 10px 20px;
                                border-radius: 4px;
                                cursor: pointer;
                                font-weight: 600;
                            ">Apply</button>
                        </div>
                        
                        <div class="position-item" style="
                            background: #2a475e;
                            padding: 20px;
                            border-radius: 8px;
                            margin-bottom: 15px;
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                        ">
                            <div>
                                <h4 style="color: #c7d5e0; margin-bottom: 5px;">UI/UX Designer</h4>
                                <p style="color: #8f98a0; font-size: 14px;">Full-time • Remote</p>
                            </div>
                            <button class="apply-btn" style="
                                background: #5c7e10;
                                color: white;
                                border: none;
                                padding: 10px 20px;
                                border-radius: 4px;
                                cursor: pointer;
                                font-weight: 600;
                            ">Apply</button>
                        </div>
                        
                        <div class="position-item" style="
                            background: #2a475e;
                            padding: 20px;
                            border-radius: 8px;
                            margin-bottom: 15px;
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                        ">
                            <div>
                                <h4 style="color: #c7d5e0; margin-bottom: 5px;">Backend Engineer</h4>
                                <p style="color: #8f98a0; font-size: 14px;">Full-time • Seattle, WA</p>
                            </div>
                            <button class="apply-btn" style="
                                background: #5c7e10;
                                color: white;
                                border: none;
                                padding: 10px 20px;
                                border-radius: 4px;
                                cursor: pointer;
                                font-weight: 600;
                            ">Apply</button>
                        </div>
                    </div>
                </div>
                
                <div class="careers-cta" style="text-align: center;">
                    <p style="color: #c7d5e0; margin-bottom: 20px;">
                        Don't see a position that fits? Send us your resume and we'll keep you in mind for future opportunities.
                    </p>
                    <button class="submit-resume-btn" style="
                        background: #66c0f4;
                        color: #1b2838;
                        border: none;
                        padding: 15px 30px;
                        border-radius: 6px;
                        font-size: 16px;
                        font-weight: 600;
                        cursor: pointer;
                        margin-right: 15px;
                    ">Submit Resume</button>
                    <button class="contact-hr-btn" style="
                        background: transparent;
                        color: #66c0f4;
                        border: 2px solid #66c0f4;
                        padding: 13px 28px;
                        border-radius: 6px;
                        font-size: 16px;
                        font-weight: 600;
                        cursor: pointer;
                    ">Contact HR</button>
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

    // Add event listeners for buttons
    const applyBtns = modal.querySelectorAll('.apply-btn');
    applyBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const position = this.closest('.position-item').querySelector('h4').textContent;
            showApplicationForm(position);
        });
    });

    const submitResumeBtn = modal.querySelector('.submit-resume-btn');
    if (submitResumeBtn) {
        submitResumeBtn.addEventListener('click', showResumeSubmission);
    }

    const contactHrBtn = modal.querySelector('.contact-hr-btn');
    if (contactHrBtn) {
        contactHrBtn.addEventListener('click', showContactHR);
    }
}

function showApplicationForm(position) {
    showNotification(`Application form for ${position} would open here`, 'info');
}

function showResumeSubmission() {
    showNotification('Resume submission form would open here', 'info');
}

function showContactHR() {
    showNotification('HR contact form would open here', 'info');
}

// Scroll Animations
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.value-card, .tech-item, .team-member');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.3 });

    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'all 0.8s ease';
        observer.observe(element);
    });
}

// Parallax Effect for Hero Section
function initParallaxEffect() {
    const hero = document.querySelector('.about-header');
    if (!hero) return;

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        hero.style.transform = `translateY(${rate}px)`;
    });
}

// Interactive Timeline
function initInteractiveTimeline() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    timelineItems.forEach(item => {
        item.addEventListener('click', function() {
            const year = this.querySelector('.timeline-year').textContent;
            const title = this.querySelector('h3').textContent;
            showTimelineDetails(year, title);
        });
    });
}

function showTimelineDetails(year, title) {
    const modal = document.createElement('div');
    modal.className = 'timeline-modal';
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
            
            <div style="text-align: center; margin-bottom: 20px;">
                <div style="
                    background: #66c0f4;
                    color: #1b2838;
                    padding: 15px 25px;
                    border-radius: 25px;
                    font-size: 20px;
                    font-weight: 700;
                    display: inline-block;
                    margin-bottom: 20px;
                ">${year}</div>
                <h2 style="color: #66c0f4; font-size: 28px; margin-bottom: 15px;">${title}</h2>
            </div>
            
            <div style="color: #c7d5e0; line-height: 1.7; margin-bottom: 25px;">
                <p>This is a detailed view of what happened in ${year} when ${title} occurred. 
                Here you would see more comprehensive information about this milestone in Steam's history.</p>
                
                <div style="
                    background: #2a475e;
                    padding: 20px;
                    border-radius: 8px;
                    margin: 20px 0;
                ">
                    <h4 style="color: #66c0f4; margin-bottom: 10px;">Key Achievements</h4>
                    <ul style="color: #8f98a0; padding-left: 20px;">
                        <li>Major platform milestone reached</li>
                        <li>New features introduced</li>
                        <li>Community growth achieved</li>
                        <li>Technical improvements implemented</li>
                    </ul>
                </div>
            </div>
            
            <div style="text-align: center;">
                <button class="learn-more-btn" style="
                    background: #5c7e10;
                    color: white;
                    border: none;
                    padding: 12px 24px;
                    border-radius: 4px;
                    cursor: pointer;
                    font-weight: 600;
                ">Learn More</button>
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

    // Learn more button
    const learnMoreBtn = modal.querySelector('.learn-more-btn');
    if (learnMoreBtn) {
        learnMoreBtn.addEventListener('click', function() {
            this.textContent = 'Loading...';
            setTimeout(() => {
                showNotification('More detailed information would load here', 'info');
                closeBtn.click();
            }, 1000);
        });
    }
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

// Initialize additional features
document.addEventListener('DOMContentLoaded', function() {
    initParallaxEffect();
    initInteractiveTimeline();
});
