import {cart /* as myCart*/,addToCart,getCartQuantity} from '../data/cart.js';
import {products, loadProducts} from '../data/products.js'
import { filterProducts } from './searchBarOperationHome.js';


loadProducts(renderProductsGrid);  //Callback - a function to run/call back in the future

export function updateQuantity(){};

export function renderProductsGrid(){

  document.querySelector('.js-cart-quantity').innerHTML = getCartQuantity();

  let productHTML = '';

  products.forEach((product) => 
  {
    productHTML +=`

            <div class="product-container">
                  
                      <div class="product-image-container">
                          <img src="${product.image}" class="product-image">
                      </div>

                      <div class="product-name-container limit-text-to-2-lines">
                          ${product.name}
                      </div>

                      <div class="product-rating-container">
                          <img src="${product.getStarsUrl()}" class="product-ratings">
                      
                          <div class="product-rating-count link-primary">
                              ${product.rating.count}
                          </div>
                      </div>

                      

                      <div class="product-price">
                          ${product.getPrice()}
                      </div>

                      <div class="no-of-products-selected">
                          <select class = "js-quantity-selector-${product.id}">
                              <option selected value="1">1</option>
                              <option value="2">2</option>
                              <option value="3">3</option>
                              <option value="4">4</option>
                              <option value="5">5</option>
                              <option value="6">6</option>
                              <option value="7">7</option>
                              <option value="8">8</option>
                              <option value="9">9</option>
                              <option value="10">10</option>
                          </select>
                      </div>

                      ${product.extraInfoHTML()}

                      <div class="space-provider">

                      </div>

                      <div class="added-text-${product.id}">
                          
                      </div>

                      <button class="add-to-cart button-primary js-cart-button" data-product-id = ${product.id}>
                          Add to Cart
                      </button>

                  </div>
    `
  });

  updateQuantity()
  {
    let cartQuantity = 0;

    if(cart){
      cart.forEach((cartItem)=>{
        cartQuantity+=cartItem.quantity;  //Calculating the total quantity to display it in the homepage's header 
      });
    }

    document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;

    console.log(cart);    
    console.log(cartQuantity); 
  }


  document.querySelector('.js-products-grid').innerHTML = productHTML;


  document.querySelectorAll('.js-cart-button')
    .forEach((button) => {
      button.addEventListener('click', ()=>
        {
          const productId = button.dataset.productId;   //dataset property gives all the data attributes that are   
                                                        //attached to the element also it is converted 
                                                        //from kebab case to camel case         
          addToCart(productId);
          let cartQuantity = JSON.parse(localStorage.getItem('cart-quantity'));
          document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;
          updateQuantity();

          document.querySelector(`.added-text-${productId}`).innerHTML= `

            <img src="Images/icons/checkmark.png" class="checkmark-image" width=20px>
                          Added
          `
          });
          
        }                                                                                   
      );
}


        
  const urlParams = new URLSearchParams(window.location.search);
  const searchText = urlParams.get('search');
  console.log(searchText);
 
  document.querySelector('.textbox').value = searchText;

  if(searchText){
    setTimeout(() =>{
      console.log('filtering the products');
      filterProducts();
    }, 1000)
  }
   


