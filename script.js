document.addEventListener('DOMContentLoaded', () => {
    const cartUI = document.getElementById('cartUI');
    const cartItemsContainer = document.getElementById('cartItems');
    const cartIcon = document.getElementById('cartIcon');
    const cartItemCount = document.getElementById('cartItemCount');

    // Toggle Cart UI
    cartIcon.addEventListener('click', toggleCartUI);
    function toggleCartUI() {
        cartUI.classList.toggle('active');
    }

    // Add to Cart functionality
    window.addToCart = function (name, price, imgSrc) {
        const existingItem = [...cartItemsContainer.children].find(
            item => item.querySelector('h3').innerText === name
        );

        if (existingItem) {
            const quantityInput = existingItem.querySelector('.quantity input');
            quantityInput.value = parseInt(quantityInput.value) + 1;
        } else {
            const cartItemHTML = `
                <div class="cart-item">
                    <img src="${imgSrc}" alt="${name}">
                    <div class="item-details">
                        <h3>${name}</h3>
                        <p>Price: $${price.toFixed(2)}</p>
                        <div class="quantity">
                            <button onclick="updateQuantity(this, -1)">-</button>
                            <input type="number" value="1" readonly>
                            <button onclick="updateQuantity(this, 1)">+</button>
                        </div>
                        <button class="remove-item" onclick="removeCartItem(this)">Remove</button>
                    </div>
                </div>
            `;
            cartItemsContainer.insertAdjacentHTML('beforeend', cartItemHTML);
        }

        updateCartItemCount();
        updateCartTotal();
    };

    // Update cart item count
    function updateCartItemCount() {
        const itemCount = cartItemsContainer.children.length;
        cartItemCount.innerText = itemCount;
        cartItemCount.style.display = itemCount > 0 ? 'block' : 'none';
    }

    // Update cart total
    function updateCartTotal() {
        let total = 0;
        [...cartItemsContainer.children].forEach(item => {
            const price = parseFloat(item.querySelector('.item-details p').innerText.replace('Price: $', ''));
            const quantity = parseInt(item.querySelector('.quantity input').value);
            total += price * quantity;
        });
        document.querySelector('.cart-footer h3').innerText = `Total: $${total.toFixed(2)}`;
    }

    // Update item quantity
    window.updateQuantity = function (button, change) {
        const quantityInput = button.parentElement.querySelector('input');
        const newQuantity = Math.max(1, parseInt(quantityInput.value) + change);
        quantityInput.value = newQuantity;
        updateCartTotal();
    };

    // Remove cart item
    window.removeCartItem = function (button) {
        const cartItem = button.closest('.cart-item');
        cartItem.remove();
        updateCartItemCount();
        updateCartTotal();
    };
});
