import { loadFromStorage,cart } from "../../data/cart.js";
import { /*loadProducts,*/loadProductsFetch } from "../../data/products.js";
import { renderOrderSummary } from "../../Scripts/checkout/orderSummary.js";
import {Product} from '../../data/products.js';


describe('test suite : renderorderSummary',() => {
    const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
    const productId2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d';
    
    beforeAll((done) => {   //The beforeAll() will not automatically go the next line now it will wait
        loadProductsFetch().then(() => {     //and it will only go the next statement when we call the done()
            done();                                //Basically it helps to control when to go the next step
        })  
                     
            
                    
    })

    beforeEach(()=>{
        spyOn(localStorage,'setItem');
        document.querySelector('.js-test-container').innerHTML = 
        `
            <div class= "js-order-summary"></div>
            <div class = "js-payment-summary"></div>
        `;
        spyOn(localStorage,'getItem').and.callFake(() => {
            return JSON.stringify([
                {
                    productId : productId1,
                    quantity : 2,
                    deliveryOptionId : '1'
                  },{
                    productId : productId2,
                    quantity : 1,
                    deliveryOptionId : '2'
                }
            ])
        });

        loadFromStorage();

        renderOrderSummary();
    })
    
    it('displays the cart', () => {

        expect(document.querySelectorAll('.js-cart-item-container').length).toEqual(2);

        console.log(expect(document.querySelector(`.js-product-quantity-${productId1}`).innerText).toContain('Quantity 2'));

        expect(document.querySelector(`.js-product-quantity-${productId2}`).innerText).toContain('Quantity 1');

        document.querySelector('.js-test-container').innerHTML = ``;  

    })

    it('remove a product', () => {

        document.querySelector(`.js-delete-link-${productId1}`).click();

        expect(document.querySelectorAll('.js-cart-item-container').length).toEqual(1);

        expect(document.querySelector(`.js-cart-item-container-${productId1}`)).toEqual(null);

        expect(document.querySelector(`.js-cart-item-container-${productId2}`)).not.toEqual(null);

        expect(cart.length).toEqual(1);

        expect(cart[0].productId).toEqual(productId2);

        document.querySelector('.js-test-container').innerHTML = ``;  
    })

    it('has the correct properties or not',() => {

        const product = new Product({
            id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
            image: "images/products/intermediate-composite-basketball.jpg",
            name: "Intermediate Size Basketball",
            rating: {
              stars: 4,
              count: 127
            },
            priceCents: 2095,
            keywords: [
              "sports",
              "basketballs"
            ]
});
          expect(product.name).toEqual('Intermediate Size Basketball');
    })
});



