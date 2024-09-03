import { products } from "../data/products.js";
import {updateQuantity} from "./amazon.js"
import { addToCart } from "../data/cart.js";

export function filterProducts(){

    const searchText = document.querySelector('.textbox').value.toLowerCase();
    
    const productsToDisplay = products.filter((item) => {

        return (
            (item.name && item.name.toLowerCase().includes(searchText)) ||
            (item.keywords && item.keywords.some(keyword => keyword.toLowerCase().includes(searchText)))
        );

    })
    if(!productsToDisplay){
        document.querySelector('.js-products-grid').innerHTML = "No items found that match the Search Text!"
    }
    displayProducts(productsToDisplay);
}


function displayProducts(productsToDisplay){

    // console.log(productsToDisplay);

    // let productContainer = document.querySelector('.js-products-grid');

    document.querySelector('.js-products-grid').innerHTML = '';

    productsToDisplay.forEach((item) => {   

        


        let product = '';
        
        product += `
        
                    <div class="product-container">
                            
                    <div class="product-image-container">
                        <img src="${item.image}" class="product-image">
                    </div>

                    <div class="product-name-container limit-text-to-2-lines">
                        ${item.name}
                    </div>

                    <div class="product-rating-container">
                        <img src="${item.getStarsUrl()}" class="product-ratings">
                    
                        <div class="product-rating-count link-primary">
                            ${item.rating.count}
                        </div>
                    </div>

                    

                    <div class="product-price">
                        ${item.getPrice()}
                    </div>

                    <div class="no-of-products-selected">
                        <select class = "js-quantity-selector-${item.id}">
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

                    ${item.extraInfoHTML()}

                    <div class="space-provider">

                    </div>

                    <div class="added-text-${item.id}">
                        
                    </div>

                    <button class="add-to-cart button-primary js-cart-button" data-product-id = "${item.id}">
                        Add to Cart
                    </button>

                </div>`


        document.querySelector('.js-products-grid').innerHTML += product;
        console.log(document.querySelector('.js-products-grid'))
        
        
    })

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


const button = document.querySelector('.textbox');

button.addEventListener('input', ()=>{
    filterProducts();
})