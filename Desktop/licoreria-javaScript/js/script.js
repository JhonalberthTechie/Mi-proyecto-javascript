document.addEventListener('DOMContentLoaded', () => {
    const productList = document.querySelector('.product-list');
    const cartItems = document.getElementById('cart-items');
    const totalPrice = document.getElementById('total-price');
    const searchInput = document.getElementById('search');
    const filterSelect = document.getElementById('filter');
    const checkoutBtn = document.getElementById('checkout-btn');
    const paymentMethodSelect = document.getElementById('payment-method');
    const cardDetails = document.getElementById('card-details');
    const bankDetails = document.getElementById('bank-details');
    const cashDetails = document.getElementById('cash-details');
    const linkPayment = document.getElementById('link-payment');
    const confirmPaymentBtn = document.getElementById('confirm-payment-btn');
    const saveCardBtn = document.getElementById('save-card-btn');
    let cart = [];
    let products = [];

    // actualizar el carrito
    function updateCart() {
        cartItems.innerHTML = '';
        let total = 0;

        cart.forEach((item, index) => {
            const listItem = document.createElement('li');
            listItem.textContent = `${item.name} - $${item.price}`;
            const removeButton = document.createElement('button');
            removeButton.textContent = 'Eliminar';
            removeButton.addEventListener('click', () => {
                cart.splice(index, 1);
                saveCart();
                updateCart();
                // confirmación 
                Swal.fire('Producto eliminado', 'El producto ha sido eliminado del carrito.', 'success');
            });
            listItem.appendChild(removeButton);
            cartItems.appendChild(listItem);
            total += item.price;
        });

        totalPrice.textContent = `Total: $${total}`;
    }

    // para mostrar los productos
    function displayProducts(productsToDisplay) {
        productList.innerHTML = '';
        productsToDisplay.forEach(product => {
            const productDiv = document.createElement('div');
            productDiv.classList.add('product');

            const productImage = document.createElement('img');
            productImage.src = product.image;
            productImage.alt = product.name;

            const productName = document.createElement('h3');
            productName.textContent = product.name;

            const productPrice = document.createElement('p');
            productPrice.textContent = `$${product.price}`;

            const productDescription = document.createElement('p');
            productDescription.textContent = product.description;

            const addToCartButton = document.createElement('button');
            addToCartButton.textContent = 'Agregar al Carrito';
            addToCartButton.addEventListener('click', () => {
                cart.push(product);
                saveCart();
                updateCart();
                // Mostrar confirmació
                Swal.fire({
                    icon: 'success',
                    title: '¡Producto agregado!',
                    text: `${product.name} ha sido añadido al carrito.`,
                    timer: 1500,
                    showConfirmButton: false
                });
            });

            productDiv.appendChild(productImage);
            productDiv.appendChild(productName);
            productDiv.appendChild(productPrice);
            productDiv.appendChild(productDescription);
            productDiv.appendChild(addToCartButton);

            productList.appendChild(productDiv);
        });
    }

    // Función para filtrar 
    function filterProducts() {
        const searchTerm = searchInput.value.toLowerCase();
        const selectedCategory = filterSelect.value;
        const filteredProducts = products.filter(product => {
            const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
            const matchesSearch = product.name.toLowerCase().includes(searchTerm) || product.description.toLowerCase().includes(searchTerm);
            return matchesCategory && matchesSearch;
        });
        displayProducts(filteredProducts);
    }

    // Guardar el carrito en local
    function saveCart() {
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    // Cargar el carrito desde local
    function loadCart() {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            cart = JSON.parse(savedCart);
        }
        updateCart();
    }

    // Validar el formulario de pago
    function validatePaymentForm() {
        const cardNumber = document.getElementById('card-number').value;
        const expiryDate = document.getElementById('expiry-date').value;
        const cvv = document.getElementById('cvv').value;

        if (!cardNumber.match(/^\d{16}$/)) {
            Swal.fire('Error', 'El número de la tarjeta debe tener 16 dígitos.', 'error');
            return false;
        }

        if (!expiryDate.match(/^\d{2}\/(\d{2}|\d{4})$/)) {
            Swal.fire('Error', 'La fecha de expiración debe estar en el formato MM/AA o MM/AAAA.', 'error');
            return false;
        }

        if (!cvv.match(/^\d{3,4}$/)) {
            Swal.fire('Error', 'El CVC/CVV debe tener 3 o 4 dígitos.', 'error');
            return false;
        }

        return true;
    }

    // Mostrar la sección de pago
    checkoutBtn.addEventListener('click', () => {
        document.getElementById('payment-section').classList.remove('hidden');
    });

    // Mostrar/ocultar detalles del método de pago seleccionado
    paymentMethodSelect.addEventListener('change', (event) => {
        const selectedMethod = event.target.value;
        cardDetails.classList.add('hidden');
        bankDetails.classList.add('hidden');
        cashDetails.classList.add('hidden');
        linkPayment.classList.add('hidden');

        if (selectedMethod === 'tarjeta') {
            cardDetails.classList.remove('hidden');
        } else if (selectedMethod === 'transferencia') {
            bankDetails.classList.remove('hidden');
        } else if (selectedMethod === 'efectivo') {
            cashDetails.classList.remove('hidden');
        } else if (selectedMethod === 'link_pago') {
            linkPayment.classList.remove('hidden');
        }
    });

    // Guardar la tarjeta de pago
    saveCardBtn.addEventListener('click', () => {
        if (validatePaymentForm()) {
            Swal.fire('Éxito', 'Tarjeta guardada con éxito.', 'success');
        }
    });

    // Confirmar el pago
    confirmPaymentBtn.addEventListener('click', () => {
        const selectedMethod = paymentMethodSelect.value;

        if (selectedMethod === 'tarjeta' || selectedMethod === 'transferencia') {
            if (validatePaymentForm()) {
                sendEmail();
                Swal.fire('Pago realizado', 'Gracias por su compra.', 'success');
            }
        } else if (selectedMethod === 'efectivo') {
            Swal.fire('Pedido realizado', 'Por favor, tenga el efectivo listo al momento de la entrega.', 'success');
            sendEmail();
        } else if (selectedMethod === 'link_pago') {
            Swal.fire('Redirección', 'Serás redirigido al sitio de pago.', 'info');
        }
    });

    // Simular el envío de un correo
    function sendEmail() {
        const emailData = {
            to: 'jhonmujica@gmail.com',
            subject: 'Nuevo Pedido - Licorería en Línea',
            body: `Tienes un nuevo pedido con los siguientes productos:\n\n${cart.map(item => `${item.name} - $${item.price}`).join('\n')}\n\nPor favor, procesa el envío lo antes posible.`
        };

        console.log('Simulando el envío de correo:', emailData);
    }

    // Formatear expiración
    document.getElementById('expiry-date').addEventListener('input', (e) => {
        e.target.value = e.target.value.replace(/^(\d{2})(\d{2})$/, '$1/$2');
    });

    // Inicialización: Cargar productos desde el archivo JSON
    fetch('js/productos.json')
        .then(response => response.json())
        .then(data => {
            products = data;
            displayProducts(products);
        })
        .catch(error => console.error('Error al cargar productos:', error));

    // Cargar localStorage
    loadCart();

    
    searchInput.addEventListener('input', filterProducts);
    filterSelect.addEventListener('change', filterProducts);
});
