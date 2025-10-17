// Account Page Logic

document.addEventListener('DOMContentLoaded', () => {
    if (!isAuthenticated()) {
        window.location.href = 'index.html';
        return;
    }
    updateAllAuthButtons();
    initTabs();
    fetchOrders();
    fetchWishlist();
    bindVoucherForm();
});

function initTabs() {
    const buttons = document.querySelectorAll('.tab-btn');
    const panels = document.querySelectorAll('.tab-panel');
    buttons.forEach(btn => btn.addEventListener('click', () => {
        buttons.forEach(b => b.classList.remove('active'));
        panels.forEach(p => p.classList.remove('active'));
        btn.classList.add('active');
        document.getElementById(`tab-${btn.dataset.tab}`).classList.add('active');
    }));
}

async function fetchOrders() {
    const token = localStorage.getItem('authToken');
    const container = document.getElementById('tab-orders');
    container.innerHTML = '<div class="loading-spinner">Loading orders...</div>';
    try {
        const res = await fetch('/api/Order', { headers: { 'Authorization': `Bearer ${token}` } });
        if (!res.ok) throw new Error('Failed to load orders');
        const orders = await res.json();
        container.innerHTML = orders.map(order => `
            <div class="order-item">
                <img src="${order.image}" alt="${order.title}">
                <div class="order-info">
                    <h4>${order.title}</h4>
                    <span>Order ID: ${order.id} • ${order.date} • $${Number(order.total).toFixed(2)}</span>
                </div>
            </div>
        `).join('');
    } catch (e) {
        container.innerHTML = '<div class="empty-state"><i class="fas fa-receipt"></i><h3>Could not load orders</h3></div>';
    }
}

async function fetchWishlist() {
    const token = localStorage.getItem('authToken');
    const container = document.getElementById('tab-wishlist');
    container.innerHTML = '<div class="loading-spinner">Loading wishlist...</div>';
    try {
        const res = await fetch('/api/Wishlist', { headers: { 'Authorization': `Bearer ${token}` } });
        if (!res.ok) throw new Error('Failed to load wishlist');
        const items = await res.json();
        if (!items.length) {
            container.innerHTML = '<div class="empty-state"><i class="fas fa-heart"></i><h3>Your wishlist is empty</h3></div>';
            return;
        }
        container.innerHTML = items.map(item => `
            <div class="order-item">
                <img src="${item.image}" alt="${item.title}">
                <div class="order-info">
                    <h4>${item.title}</h4>
                    <span>$${Number(item.price).toFixed(2)}</span>
                </div>
                <div style=\"margin-left:auto; display:flex; gap:10px;\">
                    <button class=\"add-to-cart-btn\" data-id=\"${item.id}\">Add to Cart</button>
                    <button class=\"remove-btn\" data-id=\"${item.id}\">Remove</button>
                </div>
            </div>
        `).join('');

        container.querySelectorAll('.add-to-cart-btn').forEach(btn => btn.addEventListener('click', async () => {
            const id = Number(btn.dataset.id);
            await fetch('/api/Cart', { method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }, body: JSON.stringify({ gameId: id }) });
            showNotification('Added to cart', 'success');
        }));

        container.querySelectorAll('.remove-btn').forEach(btn => btn.addEventListener('click', async () => {
            const id = Number(btn.dataset.id);
            await fetch(`/api/Wishlist/${id}`, { method: 'DELETE', headers: { 'Authorization': `Bearer ${token}` } });
            fetchWishlist();
        }));
    } catch (e) {
        container.innerHTML = '<div class="empty-state"><i class="fas fa-heart"></i><h3>Could not load wishlist</h3></div>';
    }
}

function bindVoucherForm() {
    const form = document.getElementById('voucher-form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const code = document.getElementById('voucher-code').value.trim();
        if (!code) return;
        const token = localStorage.getItem('authToken');
        fetch('/api/Voucher', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
            body: JSON.stringify({ code })
        }).then(res => {
            if (!res.ok) throw new Error('Activation failed');
            showNotification(`Product activated: ${code}`, 'success');
            form.reset();
        }).catch(() => showNotification('Activation failed', 'error'));
    });
}
