import {cart,getCartQuantity} from '../../data/cart.js';
import { getProduct } from '../../data/products.js';
import { getDeliveryOption } from '../../data/deliveryOptions.js';
import { formatCurrency } from '../Utilities/money.js';
import { addOrder } from '../../data/orders.js';

export function renderPaymentSummary(){
    let productPriceCents = 0;
    let shippingPriceCents = 0;

    if(cart){
        cart.forEach((cartItem)=>{
            const product =  getProduct(cartItem.productId);
            productPriceCents += product.priceCents * cartItem.quantity;
            
            const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
            shippingPriceCents += deliveryOption.priceCents;
         });
    }
    
    const totalBeforeTaxCents = productPriceCents + shippingPriceCents;
    const taxCents = totalBeforeTaxCents * 0.1;
    const totalCents = totalBeforeTaxCents + taxCents;  


    const paymentSummaryHTML = `
                                    <div class="payment-section-title">
                                        Order Summary
                                    </div>

                                    <div class="payment-summary-row">
                                        <div>Items(${getCartQuantity()}) : </div>
                                        <div class="payment-summary-money">$${formatCurrency(productPriceCents)}</div>
                                    </div>
                                    <div class="payment-summary-row">
                                        <div> Shipping &amp; Handling : </div>
                                        <div class="payment-summary-money">$${formatCurrency(shippingPriceCents)}</div>
                                    </div>
                                    <div class="payment-summary-row sub-total-row">
                                        <div>Total Before Tax : </div>
                                        <div class="payment-summary-money">$${formatCurrency(totalBeforeTaxCents)}</div>
                                    </div>
                                    <div class="payment-summary-row">
                                        <div>Estimated Tax(10%) : </div>
                                        <div class="payment-summary=money">$${formatCurrency(taxCents)}</div>
                                    </div>
                                    <div class="payment-summary-row total total-row">
                                        <div>Order Total : </div>
                                        <div class="payment-summary-money">$${formatCurrency(totalCents)}</div>
                                    </div>

                                    <button class="place-order-button button-primary js-place-order">
                                        Place your Order
                                    </button>

                                `
    document.querySelector('.js-payment-summary')
        .innerHTML = paymentSummaryHTML;   

    document.querySelector('.js-place-order').addEventListener('click', async () => {

        const date = new Date();
        const orderData = {
            id : crypto.randomUUID(),
            orderTime : date.toISOString(),
            products : cart.map((item) => {
                let estimatedDeliveryTime;
                if(item.deliveryOptionId === '1'){
                    estimatedDeliveryTime = addDays(date,7)
                }else if(item.deliveryOptionId === '2'){
                    estimatedDeliveryTime = addDays(date,3)
                }else if(item.deliveryOptionId === '3'){
                    estimatedDeliveryTime = addDays(date,1)
                }
                
                return {
                    productId : item.productId,
                    quantity : item.quantity,
                    estimatedDeliveryTime :estimatedDeliveryTime
                }
            }),
            totalCostCents : totalCents
        };

        console.log(orderData);

        const response = await fetch('http://localhost:8080/amazon/orders', {
            method : 'POST',
            headers : {
                'Content-type' : 'application/json'
            },
            body : JSON.stringify(orderData)
        });

        let order = await response.json();
        console.log("Order:- ",order, typeof order);
        
        addOrder(order);
        window.location.href = 'orders.html';
    })
} 

function addDays(date,days){
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    console.log(result.toISOString())
    return result.toISOString();
}