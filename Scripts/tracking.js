import { getProduct } from "../data/products.js";
import {formatDate, orders} from "../data/orders.js"
import { getCartQuantity, loadCart } from "../data/cart.js";

const products =  JSON.parse(localStorage.getItem('products'));
// const cart = JSON.parse(localStorage.getItem('cart'));

console.log(orders);

const urlParams = new URLSearchParams(window.location.search);
const orderId = urlParams.get('orderID');
const productId = urlParams.get('productID');
console.log("OrderID :- ", orderId, " ProductId :- ",productId);

console.log(products);

let trackingHTML = '';

orders.forEach((order) => {
    console.log('orders entry')
    if(order.id === orderId){
        console.log("Order Found!", order);
        order.products.forEach((product) => {
            if(product.productId === productId){
                let selectedProduct ;
                products.forEach((item) => {
                    if(item.id === productId){
                        selectedProduct = item;
                    }
                }) 
                console.log(productId)
                console.log("Product Found!", selectedProduct);
                trackingHTML = `

                    <div class="link-to-orders-page">
                                <a href="orders.html">
                                    View All Orders
                                </a>
                            </div>
                
                            <div class="product-arriving-date">
                                Arriving on ${formatDate(product.estimatedDeliveryTime)}
                            </div>
                
                            <div class="product-name">
                                ${selectedProduct.name}
                            </div>
                
                            <div class="product-quantity">
                                Quantity ${product.quantity}
                            </div>
                
                            <div class="product-image-container">
                                <img src="${selectedProduct.image}"
                                    class="product-image" >
                            </div>


                            <div class="progress-label-container">

                                <div class="progress-label">
                                    Preparing
                                </div>

                                <div class="progress-label green-text">
                                    Shipping
                                </div>

                                <div class="progress-label">
                                    Delievered
                                </div>

                            </div>

                            <div class="progress-bar-container">
                                <div class="progress-bar"></div>
                            </div>
                `;
                document.querySelector('.order-tracking-container').innerHTML = trackingHTML;
                console.log('finish!')
            }
        })
    }
})


document.querySelector('.js-cart-quantity').innerHTML=getCartQuantity();


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