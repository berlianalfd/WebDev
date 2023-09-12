  let basket = JSON.parse(localStorage.getItem("data")) || [];
  let shop = document.getElementById("shop");

  let generateShop = () => {
    return (shop.innerHTML = dataItems
      .map((x) => {   
        let { id, name, price, desc, img } = x;
        let search = basket.find((x) => x.id === id) || [];
        return `
      <div id=product-id-${id} class="item">
        <div class="item-image">
          <img width="223" src=${img} alt="">
        </div>
          <div class="details">
            <h3>${name}</h3>
            <p>${desc}</p>
            <div class="price-quantity">
              <h2>${formatRupiah(price)} </h2>
              <div class="buttons">
                <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
                <div id=${id} class="quantity">
                ${search.item === undefined ? 0 : search.item}
                </div>
                <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
              </div>
            </div>
          </div>
        </div>
      `;
      })
      .join(""));
  };
  generateShop();

  function formatRupiah(angka) {
    return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(angka);
  }

  let amount = 50000;
  let formattedAmount = formatRupiah(amount);

  let increment = (id) => {
    let selectedItem = id;
    let search = basket.find((x) => x.id === selectedItem.id);

    if (search === undefined) {
      basket.push({
        id: selectedItem.id,
        item: 1,
      });
    } else {
      search.item += 1;
    }

    // console.log(basket);
    update(selectedItem.id);
    localStorage.setItem("data", JSON.stringify(basket));
  };

  let decrement = (id) => {
    let selectedItem = id;
    let search = basket.find((x) => x.id === selectedItem.id);

    if (search === undefined) return;
    else if (search.item === 0) return;
    else {
      search.item -= 1;
    }
    update(selectedItem.id);
    basket = basket.filter((x) => x.item !== 0);
    // console.log(basket);
    localStorage.setItem("data", JSON.stringify(basket));
  };

  let update = (id) => {
    let search = basket.find((x) => x.id === id);
    // console.log(search.item);
    document.getElementById(id).innerHTML = search.item;
    calculation();
  };

  let calculation = () => {
    let cartIcon = document.getElementById("cartAmount");
    cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
  };
  calculation();

  // JavaScript to Handle Shopping Cart Sidebar
  let cartButton = document.querySelector('.bi-cart2');
  let shoppingCart = document.getElementById('shopping-cart');
  let labelElement = document.getElementById('label');
  let downbar = document.getElementById('downbar');

  

  cartButton.addEventListener('click', () => {
    shoppingCart.classList.toggle('open'); 
    labelElement.classList.toggle('open'); 
    downbar.classList.toggle('open');
    generateCartItems();
    TotalAmount();

  });

  // CART //

  let label = document.getElementById("label");
  let taxElement = document.getElementById("tax");
  let ShoppingCart = document.getElementById("shopping-cart");

  let calculationCart = () => {
    let cartIcon = document.getElementById("cartAmount");
    cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
  };
  calculationCart();

  let generateCartItems = () => {
    // Filter item dengan jumlah yang lebih dari 0
    
    let filteredBasket = basket.filter((x) => x.item > 0);
    if (filteredBasket.length !== 0) {
      return (ShoppingCart.innerHTML = filteredBasket
        .map((x) => {
          let { id, item } = x;
          let search = dataItems.find((y) => y.id === id) || [];
          return `
          <p>Selected Items</p>
        <div class="cart-item">
          <img width="100" src=${search.img} alt="" />
          <div class="details">
            <div class="title-price-x">
                <h4 class="title-price">
                  <p>${search.name}</p>
                </h4>  
            </div>
            <div class="buttons">
              <i onclick="decrementCart('${id}')" class="bi bi-dash-lg"></i>
              <div id="quantity-${id}" class="quantity">${item}</div>
              <i onclick="incrementCart('${id}')" class="bi bi-plus-lg"></i>
            </div>
            <p class="cart-item-price">${formatRupiah(search.price)}</p>
            <h6>jumlah harga items    ${formatRupiah(item * search.price)}</h6>
          </div>
          
        </div>
        `;
        })
        .join(""));
    } else {
      // Kosongkan shopping cart jika tidak ada item yang tersisa
      ShoppingCart.innerHTML = ``;
      label.innerHTML = `
      <h2>Wishlist Kamu kosong!</h2>
      <a href="index.html">
        <button class="HomeBtn">SHOPPING</button>
      </a>
      `;
    }
  };
  
  generateCartItems();
  

  let taxProduct =() =>{
    updateCartItem()*0.1;
  }

  let updateCartItem = (id) => {
    let search = basket.find((x) => x.id === id);
    document.getElementById(id).innerHTML = search.item;
    calculationCart();
    generateCartItems();
    TotalAmount();
  };

  let incrementCart = (id) => {
    let search = basket.find((x) => x.id === id);

    if (search === undefined) {
      basket.push({
        id: id,
        item: 1,
      });
    } else {
      search.item += 1;
    }

    
    updateCartItem(id);
    localStorage.setItem("data", JSON.stringify(basket));
    generateCartItems();
    TotalAmount();
  };

  let decrementCart = (id) => {
    let search = basket.find((x) => x.id === id);

    if (search === undefined) return;
    else if (search.item === 0) return;
    else {
      search.item -= 1;
    }

    updateCartItem(id);
    basket = basket.filter((x) => x.item !== 0);
    generateCartItems();
    localStorage.setItem("data", JSON.stringify(basket));
    generateCartItems();
    TotalAmount();
    
  };

 
  

  let removeItem = (id) => {
    let selectedItem = id;
    // console.log(selectedItem.id);
    basket = basket.filter((x) => x.id !== selectedItem.id);
    generateCartItems();
    TotalAmount();
    localStorage.setItem("data", JSON.stringify(basket));
  };

  let clearCart = () => {
    basket = [];
    generateCartItems();
    localStorage.setItem("data", JSON.stringify(basket));
    TotalAmount();
  };


  const taxRate = 0.1;

  let TotalAmount = () => {
    if (basket.length !== 0) {
      let subtotal = basket
        .map((x) => {
          let { item, id } = x;
          let search = dataItems.find((y) => y.id === id) || [];

          return item * search.price;
        })
        .reduce((x, y) => x + y, 0);

      //totalpajak
      let taxAmount = subtotal * taxRate;
      label.innerHTML = `<h2 class="tag-label">Pajak ${formatRupiah(taxAmount)}</h2>
      <h2 class="tag-label">Total Pembayaran ${formatRupiah(subtotal + taxAmount)}</h2>
      <button class="checkout">Checkout</button>
      <button onclick="clearCart()" class="removeAll">Clear Cart</button>`;
    } else return;
  };

  TotalAmount();

  let checkoutButton = document.querySelector('.checkout');

  checkoutButton.addEventListener('click', () => {
  let labelElements = document.querySelectorAll('.tag-label');
  labelElements.forEach((element) => {
    element.style.textDecoration = 'line-through';
  });
});






