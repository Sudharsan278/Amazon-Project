import formatCurrency from "../Scripts/Utilities/money.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js'
import { getCartQuantity,saveToStorage as save } from "./cart.js";

export let orders = JSON.parse(localStorage.getItem('orders')) ||[];


export function addOrder(order){
    console.log('order',order);
    orders = JSON.parse(localStorage.getItem('orders')) ||[];
    orders.unshift(order);
    saveToStorage();
    console.log("After adding the order, Orders:- ",orders);
}

function saveToStorage(){
    localStorage.setItem('orders',JSON.stringify(orders));  //Whenever storing the data to the localStorage store the entire data 
}                                                           // to avoid change of the type of data

export function formatDate(dateString){
    const date = dayjs(dateString);
    const formattedDate = date.format("MMMM, D");
    return formattedDate;
}

let orderHTML = ``;
export function generateOrders(){

        orders = JSON.parse(localStorage.getItem('orders')) || [];
        console.log("Orders :- ", orders);

        if(cart === null || cart.length === 0 || orders.length === 0){
            orderHTML = `No Products Selected to place the order
                <a href="amazonHomePage.html" class="return-to-home-link">
                    <button class=button-primary>Select Products</button>
                </a>
            `;
        }

        if(cart != null && cart.length > 0 && orders.length > 0){

            orders.forEach((order) => {

                if(order.products.length === 0 ){
                    return;
                }
                orderHTML += `
                
                    <div class="order-container">
    
                                <div class="order-header">
    
                                    <div class="order-header-left-section">
    
                                        <div class="order-date">
                                            <div class="order-header-label">Order Placed</div>
                                            <div class="order-header-date">${formatDate(order.orderTime)}</div>
                                        </div>
    
                                        <div class="order-total">
    
                                            <div class="order-header-label">Total</div>
                                            <div>${formatCurrency(order.totalCostCents)}</div>
    
                                        </div>
                                    </div>
    
                                    <div class="order-header-right-section">
                                        <div class="order-header-label">Order ID</div>
                                        <div>${order.id}</div>
                                    </div>
                                </div>
                            `;
                                
                if(Array.isArray(order.products)){

                    order.products.forEach((product) => {
                       
                        let selectedProduct;
                        productsLoaded.forEach((item) => {
                            if(item.id === product.productId){
                                selectedProduct = item;
                            }
                        })
                    
                        orderHTML += `
    
                        <div class="order-details-grid">
                                    
                                    <div class="product-image-container">
                                        <img src="${selectedProduct.image}" class="product-image">
                                    </div>
    
                                    <div class="product-details-container">
                                        <div class="product-name">
                                            ${selectedProduct.name}
                                        </div>
                                        <div class="product-arriving-date">
                                            Arriving on: ${formatDate(product.estimatedDeliveryTime)}
                                        </div>
                                        <div class="product-quantity">
                                            Quantity : ${product.quantity}
                                            
                                        </div>
                                        <div class="buy-it-again-button-container">
                                            <button class="buy-it-again-button js-buy-button-${selectedProduct.id} button-primary" data-product-id = ${selectedProduct.id}>
                                                <img src="Images/icons/buy-again.png" class="buy-it-again-icon">
                                                Buy it Again
                                            </button>
                                        </div>
                                    </div>
    
                                    <div class="product-actions">
                                        <a href="tracking.html?orderID=${order.id}&productID=${selectedProduct.id}">
                                            <button class="track-package-button button-secondary js-track-package-button">
                                                Track Package
                                            </button>
                                        </a>
                                    </div>
                        </div>
                    `;
                    })
                }
                    orderHTML += `</div>`
                })
        }   
        // console.log(orderHTML);   

        document.querySelector('.js-orders-table').insertAdjacentHTML('afterbegin', orderHTML);

}

//Since the getProduct() cannot get the correct product reload all the products and the cart as well 


let productsLoaded = [],cart = [];
    

if(window.location.pathname.endsWith('orders.html')){


    productsLoaded = JSON.parse(localStorage.getItem('products'));
    console.log('products',productsLoaded);
    cart = JSON.parse(localStorage.getItem('cart'));
    console.log('cart',cart)
    





    document.querySelector('.js-cart-quantity').innerHTML = getCartQuantity();
    
    generateOrders();

    document.querySelector('.textbox').addEventListener('keydown' , (event) => {
        if(event.key === 'Enter'){
            const searchText = document.querySelector('.textbox').value.toLowerCase();
            console.log(searchText);
    
            const urlParams = new URLSearchParams(window.location.search);
            urlParams.set('search',searchText);
            const newURL = '/amazonHomePage.html' + '?' + urlParams.toString();
            history.pushState(null, "", newURL);
            // console.log(newURL);
            window.location.href = newURL;
        }
    })

    window.onload = () => {
    
        document.querySelector('.js-orders-table').innerHTML = orderHTML;
    }
}  

// document.addEventListener('DOMContentLoaded', ()=>{
    
// orders.forEach((order) => {
    
//     order.products.forEach((product) => {
//         console.log(product);
//         const button = document.querySelector(`.js-buy-button-${product.id}`);
//         console.log(button);
//     })
// })
// })

if(window.location.pathname.endsWith('orders.html')){
document.querySelector('.js-orders-table').addEventListener('click', (event) => {
    if (event.target.closest('.buy-it-again-button')) {
        const button = event.target.closest('.buy-it-again-button');
        // console.log(button);
        const productId = button.dataset.productId;
        // console.log(productId);
        let matchingItem = cart.find(item => item.productId === productId);
        console.log(matchingItem)
        if (matchingItem) {
            // Increment the quantity
            console.log(matchingItem.quantity)
            matchingItem.quantity += 1;
            console.log(matchingItem.quantity);
            localStorage.setItem('cart', JSON.stringify(cart))
            console.log(JSON.parse(localStorage.getItem('cart')));
            console.log(getCartQuantity())
            document.querySelector('.js-cart-quantity').innerHTML = getCartQuantity();
        }

    }
});
}