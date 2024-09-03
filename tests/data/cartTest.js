import {addToCart , cart, loadFromStorage} from '../../data/cart.js';

describe('test suite : addToCart',()=>{
        
    it('adding a new item to the cart',()=>{
        
        spyOn(localStorage,'setItem');  //Mock the setItem to avoid saving the test code into the real code
                                        //Since we use saveToStorage in the addToCart()
        
        spyOn(localStorage,'getItem').and.callFake(()=>{ //Mock the getItem to return an empty cart
            return JSON.stringify([]);
        });
        /*console.log(localStorage.getItem('cart'));*/    // Check wheter the cart that is loaded 
                                                          // from the localStorage is empty or not
        
        
        loadFromStorage(); //The cart is already loaded before we mock it so in order to mock the cart after 
                          //it gets loaded we reload the cart after mocking it 


        addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart.length).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);  //Check how many time the setItem method is used 
        expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart[0].quantity).toEqual(1);
        
    });

    it('add an existing product to the cart',()=>{
       
        spyOn(localStorage,'setItem');
       
        spyOn(localStorage,'getItem').and.callFake(()=>{
            return JSON.stringify([{
                productId:'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                quantity:1,
                deliveryOptinoId:'1'
            }]);
        });
        loadFromStorage;
        
        addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart.length).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(cart[0].quantity).toEqual(2);
        expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    })

});


