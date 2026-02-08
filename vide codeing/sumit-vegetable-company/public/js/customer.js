// Shopping Cart
let cart = [];

function toggleCart() {
    const sidebar = document.getElementById('cart-sidebar');
    const overlay = document.getElementById('cart-overlay');
    sidebar.classList.toggle('active');
    overlay.classList.toggle('active');
}

function addToCart(id, name, price, unit, maxQuantity) {
    const existingItem = cart.find(item => item.id === id);
    
    if (existingItem) {
        if (existingItem.quantity < maxQuantity) {
            existingItem.quantity += 1;
        } else {
            alert(`Maximum available quantity is ${maxQuantity} ${unit}`);
            return;
        }
    } else {
        cart.push({ id, name, price, unit, quantity: 1, maxQuantity });
    }
    
    updateCart();
    toggleCart();
}

function updateCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartCount = document.getElementById('cart-count');
    const cartTotal = document.getElementById('cart-total');
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
        cartCount.textContent = '0';
        cartTotal.textContent = '₹0.00';
        return;
    }
    
    let total = 0;
    let totalItems = 0;
    
    cartItemsContainer.innerHTML = cart.map(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        totalItems += item.quantity;
        
        return `
            <div class="cart-item">
                <div class="cart-item-info">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-price">₹${item.price}/${item.unit}</div>
                    <div class="cart-item-quantity">
                        <button onclick="decreaseQuantity('${item.id}')">-</button>
                        <input type="number" value="${item.quantity}" readonly>
                        <button onclick="increaseQuantity('${item.id}')">+</button>
                        <span style="margin-left: 0.5rem; color: #666;">₹${itemTotal.toFixed(2)}</span>
                    </div>
                </div>
                <button class="remove-item" onclick="removeFromCart('${item.id}')">🗑️</button>
            </div>
        `;
    }).join('');
    
    cartCount.textContent = totalItems;
    cartTotal.textContent = '₹' + total.toFixed(2);
}

function increaseQuantity(id) {
    const item = cart.find(item => item.id === id);
    if (item && item.quantity < item.maxQuantity) {
        item.quantity += 1;
        updateCart();
    } else if (item) {
        alert(`Maximum available quantity is ${item.maxQuantity} ${item.unit}`);
    }
}

function decreaseQuantity(id) {
    const item = cart.find(item => item.id === id);
    if (item && item.quantity > 1) {
        item.quantity -= 1;
        updateCart();
    }
}

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    updateCart();
}

function checkout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    
    const address = prompt('Please enter your delivery address:');
    if (!address) return;
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    const orderItems = cart.map(item => ({
        vegetable: item.id,
        name: item.name,
        quantity: item.quantity,
        price: item.price,
        total: item.price * item.quantity
    }));
    
    fetch('/customer/place-order', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            items: JSON.stringify(orderItems),
            totalAmount: total,
            deliveryAddress: address
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Order placed successfully! Order ID: #' + data.orderId.slice(-6));
            cart = [];
            updateCart();
            toggleCart();
            location.reload();
        } else {
            alert('Failed to place order: ' + data.error);
        }
    })
    .catch(error => {
        alert('Error placing order. Please try again.');
        console.error('Error:', error);
    });
}

// Initialize cart on page load
updateCart();
