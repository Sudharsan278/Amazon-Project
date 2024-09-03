import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import {loadProductsFetch} from '../data/products.js';
import { loadCart} from '../data/cart.js';


// async await can be only used with promises

async function loadPage(){   //async makes the function to return a promise 

    //console.log('load page');

    try{
        //throw 'error';

        await loadProductsFetch();  //can be used only within the async function
       
        await new Promise((resolve,reject) => {
            //throw 'error';
            loadCart(() => {
                //reject('error')
                resolve();    // if the resolve() has any value and we use await it returns the value inside the resolve
        });               // await can also be used with promise.all as well 

    })
    }catch(error){
        console.log('Unexpected Error! Please try again later.')
    }
    renderOrderSummary();
    renderPaymentSummary();

   // return 'value'           // same as resolve(value)
}

loadPage()/*.then((value) => {
    console.log('next step');
    console.log(value);
})*/
