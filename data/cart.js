export let cart;

loadFromStorage();

export function loadFromStorage(){
    cart = JSON.parse(localStorage.getItem('cart')) || [];
    // if(!cart){
    //   cart = 
    //   [
    //     {
    //       productId : "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    //       quantity : 2,
    //       deliveryOptionId : '1'
    //     },{
    //       productId : "15b6fc6f-327a-4ec4-896f-486349e85a3d",
    //       quantity : 1,
    //       deliveryOptionId : '2'
    //     }
    //   ];
    // }
}

export function saveToStorage(){
  localStorage.setItem('cart',JSON.stringify(cart));
}


export function addToCart(productId)
{
  let matchingItem;

  if(cart){
    cart.forEach((cartItem)=>{
      if(productId===cartItem.productId)
        {
          matchingItem = cartItem; 
        }});
  }

      if(matchingItem)
        {
            const dropDown = document.querySelector(`.js-quantity-selector-${matchingItem.productId}`)
            const noOfItemsSelected = dropDown.value;
            matchingItem.quantity += Number(noOfItemsSelected);
        }
      else
        {
          const dropDown = document.querySelector(`.js-quantity-selector-${productId}`);
          const noOfItemsSelected = dropDown.value;
          cart.push({
            productId : productId,
            quantity : Number(noOfItemsSelected),
            deliveryOptionId : '1'
          });
        }     
        saveToStorage();

        getCartQuantity();
        
} 

export function removeFromCart(productId){
  const newCart = [];

  cart.forEach((cartItem) => {
    if(cartItem.productId !== productId){
      newCart.push(cartItem);
    }
  })
  cart = newCart;

  // console.log("Quantity: - "+newCart.quantity)

  saveToStorage();

  getCartQuantity();

}

export function updateDeliveryOption(productId,deliveryOptionId){
   let matchingItem;

   cart.forEach((cartItem)=>{
      if(productId === cartItem.productId){
        matchingItem = cartItem;
      }
   });

   matchingItem.deliveryOptionId = deliveryOptionId;
   saveToStorage();
}

export function loadCart(fun){
  const xhr = new XMLHttpRequest();

  xhr.addEventListener('load',() => {
    console.log(xhr.response);
    fun();
  })

  xhr.open('GET','http://localhost:8080/amazon/cart');
  xhr.send(); 
}

export function getCartQuantity(){
  
  let cartQuantity = 0;
  cart = JSON.parse(localStorage.getItem('cart')) || [];
   if(cart){
    cart.forEach((item) => {
      cartQuantity+= item.quantity;
    })
  }

  localStorage.setItem('cart-quantity',JSON.stringify(cartQuantity));

  return cartQuantity;
}
