import {cart,getCartQuantity,removeFromCart,updateDeliveryOption,saveToStorage} from '../../data/cart.js'
import { products,getProduct } from '../../data/products.js';
import {formatCurrency} from '../Utilities/money.js'
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js'
import { deliveryOptions,getDeliveryOption } from '../../data/deliveryOptions.js';
import { renderPaymentSummary } from './paymentSummary.js';



export function renderOrderSummary(){

    document.querySelector('.js-cart-quantitiy-checkout').innerHTML = getCartQuantity();

        let cartSummaryHTML = '';
        if(cart.length === 0){
            let notCartHTML =`
                No Items Selected!
                <a href="amazonHomePage.html" class ="return-to-home-link">
                <button class="button-primary">
                    Select Products
                </button>
                </a>
            `; 
            document.querySelector('.js-order-summary').innerHTML = notCartHTML;
            console.log(document.querySelector('.js-order-summary').innerHTML);
            return;
        }
        if(cart){
            cart.forEach((cartItem)=>{

                const productId = cartItem.productId;
                const matchingProduct = getProduct(productId);
               
                
                const deliveryOptionId = cartItem.deliveryOptionId;
                const deliveryOption = getDeliveryOption(deliveryOptionId);

                const today = dayjs();
                const deliveryDate = today.add(deliveryOption.deliveryDays,'days');
                const dateString = deliveryDate.format('dddd, MMMM D');
                //console.log(dateString);

                cartSummaryHTML +=  `<div class="cart-item-container js-cart-item-container js-cart-item-container-${matchingProduct.id}">
                                        <div class="delivery-date">
                                            Delivery date: ${dateString}
                                        </div>

                                            <div class="cart-item-details-grid">

                                    <img src="${matchingProduct.image}" class="product-image">

                                    <div class="cart-item-details">

                                        <div class="product-name">
                                            ${matchingProduct.name}
                                        </div>

                                        <div class="product-price">
                                            ${matchingProduct.getPrice()}
                                        </div>

                                        <div class="product-quantity js-product-quantity-${matchingProduct.id}">
                                            <span>
                                                Quantity
                                                <span class="quantity-label js-quantity-label-${matchingProduct.id}">${cartItem.quantity}</span>
                                            </span>

                                            <span class="update-quantity-link link-primary js-update-link js-update-link-${matchingProduct.id}"
                                                data-product-id = "${matchingProduct.id}">Update</span>

                                            <span class="delete-quantity-link link-primary js-delete-link js-delete-link-${matchingProduct.id}" 
                                                data-product-id = "${matchingProduct.id}">Delete</span>
                                        </div>
                                    </div>

                                    <div class="delivery-section">
                                        <div class="delivery-section-title">
                                            Choose a Delivery Option
                                        </div>

                                        ${deliverySectionHTML(matchingProduct,cartItem)}
                                        
                                    </div>
                                </div>
                            </div>`; 
        });
        }
        
                
    
        function deliverySectionHTML(matchingProduct,cartItem){

            let html = '';
            deliveryOptions.forEach((deliveryOption)=>{
                const today = dayjs();
                const deliveryDate = today.add(deliveryOption.deliveryDays,'days');
                const dateString = deliveryDate.format('dddd, MMMM D');
                const priceString = deliveryOption.priceCents===0 
                ? 
                'FREE': 
                `$${formatCurrency(deliveryOption.priceCents)} - `; 

                const isChecked = deliveryOption.id === cartItem.deliveryOptionId; 

                html += 
                        `
                            <div class="delivery-options js-delivery-option" 
                            data-product-id = "${matchingProduct.id}"
                            data-delivery-option-id="${deliveryOption.id}">
                                <input type="radio" ${isChecked ? 'checked':'' }
                                class="radio-button-input"
                                name="delivery-option-${matchingProduct.id}">

                                <div>
                                    <div class="delivery-option-date">
                                        ${dateString}
                                    </div>
                                    <div class="delivery-cost">
                                        ${priceString} SHIPPING
                                    </div>
                                </div>
                            </div>
                        `
            })
            return html;
        }



    document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;

    document.querySelectorAll('.js-delete-link')
        .forEach((link)=>{
            link.addEventListener('click',()=>{
                const productId = link.dataset.productId;
                removeFromCart(productId);

                const container = document.querySelector(`.js-cart-item-container-${productId}`)
                container.remove();
                document.querySelector('.js-cart-quantitiy-checkout').innerHTML = getCartQuantity();
                renderPaymentSummary();

            })

        });

    document.querySelectorAll('.js-delivery-option')
        .forEach((element)=>{
            element.addEventListener('click',()=>{
                const {productId,deliveryOptionId}=element.dataset;
                updateDeliveryOption(productId,deliveryOptionId);
                renderOrderSummary();
                renderPaymentSummary();
            })
        })


    document.querySelectorAll('.js-update-link')
        .forEach((link) => {
            link.addEventListener('click' , ()=> { 
                const productId = link.dataset.productId;
                document.querySelector(`.js-product-quantity-${productId}`).innerHTML = `
                    <span>
                        Quantity
                        <div>
                            <input type = "number" class = "new-input-quantity-${productId}" min = 0 value = 1>
                            <div class="js-save-link js-save-link-${productId} link-primary">Save</div>
                        </div>
                    </span>
                `
                const dropDown = document.querySelector(`.new-input-quantity-${productId}`);
                dropDown.focus();
                
                document.querySelectorAll('.js-save-link')
                    .forEach((link) => {
                        link.addEventListener('click', () => {
                            
                            
                            const quantity = dropDown.value;
                           
                            if(Number(quantity) === 0 ){
                                removeFromCart(productId);
                            }
                            console.log("Selected Quantity "+quantity);
                            
                            cart.forEach((item) => {
                                if(item.productId === productId){
                                    item.quantity = Number(quantity);
                                }
                            });
                            saveToStorage();
                            console.log(cart);
                            console.log(getCartQuantity());
                            renderOrderSummary();
                            renderPaymentSummary();
                        })
                    })  
                document.querySelector(`.new-input-quantity-${productId}`)
                    .addEventListener("keydown", (event) => {
                        if(event.key==='Enter'){
                          
                            const dropDown = document.querySelector(`.new-input-quantity-${productId}`);
                            const quantity = dropDown.value;
                            if(Number(quantity) === 0 ){
                                removeFromCart(productId);
                            }
                            console.log("Selected Quantity "+quantity);

                            cart.forEach((item) => {
                                if(item.productId === productId){
                                    item.quantity = Number(quantity);
                                }
                            });
                            saveToStorage();
                            console.log(cart);
                            console.log(getCartQuantity());
                            renderOrderSummary();
                            renderPaymentSummary();

                        }
                    })
            })
        })
}

