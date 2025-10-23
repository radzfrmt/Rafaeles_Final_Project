document.addEventListener("DOMContentLoaded", () => {
  const products = [
    {id:1,name:'Winter Leather Jacket',price:3600,image:'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400'},
    {id:2,name:'Off-Shoulder Dress',price:1200,image:'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400'},
    {id:3,name:'Casual Blazer',price:2200,image:'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=400'},
    {id:4,name:'Knit Sweater',price:1500,image:'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400'}
  ];

  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  function updateCartCount() {
    const count = cart.reduce((t,i)=>t+i.quantity,0);
    const counter = document.getElementById('cartCount');
    if(counter) counter.textContent = count;
  }

  function addToCart(id) {
    const product = products.find(p=>p.id===id);
    const existing = cart.find(p=>p.id===id);
    if(existing) existing.quantity++;
    else cart.push({...product,quantity:1});
    localStorage.setItem('cart',JSON.stringify(cart));
    updateCartCount();
    alert(`${product.name} added to cart`);
  }

  function renderProducts(containerId) {
    const container = document.getElementById(containerId);
    if(!container) return;
    container.innerHTML = '';
    products.forEach(p=>{
      const div = document.createElement('div');
      div.className = 'col-md-3 mb-4';
      div.innerHTML = `
        <div class='card border-0 shadow-sm h-100'>
          <img src='${p.image}' class='card-img-top' alt='${p.name}'>
          <div class='card-body text-center'>
            <h5 class='card-title'>${p.name}</h5>
            <p class='card-text fw-bold'>₱ ${p.price}</p>
            <button class='btn btn-dark w-100' onclick='addToCart(${p.id})'>Add to Cart</button>
          </div>
        </div>`;
      container.appendChild(div);
    });
  }

  function renderCart() {
    const cartItems = document.getElementById('cartItems');
    if(!cartItems) return;
    cartItems.innerHTML = '';
    let total = 0;
    cart.forEach(item=>{
      total += item.price * item.quantity;
      const div = document.createElement('div');
      div.className = 'd-flex align-items-center border-bottom py-3';
      div.innerHTML = `
        <div class="d-flex align-items-center">
          <img src="${item.image}" alt="${item.name}" class="me-3" style="width:60px;height:60px;object-fit:cover;border-radius:8px;">
          <div>
            <h6 class="mb-0">${item.name}</h6>
            <small class="text-muted">₱${item.price} × ${item.quantity}</small>
          </div>
        </div>
        <div class="ms-auto fw-bold">₱${item.price * item.quantity}</div>
      `;
      cartItems.appendChild(div);
    });
    const totalPrice = document.getElementById('totalPrice');
    if(totalPrice) totalPrice.textContent = total;
  }

  window.addToCart = addToCart;
  window.checkout = () => {
    alert('Thank you for your purchase!');
    cart = [];
    localStorage.removeItem('cart');
    renderCart();
    updateCartCount();
  };

  updateCartCount();
  renderProducts('featuredProducts');
  renderProducts('allProducts');
  renderCart();
});