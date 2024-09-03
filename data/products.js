import {formatCurrency} from '../Scripts/Utilities/money.js';

export function getProduct(productId){
  let matchingProduct;
  products.forEach((product)=>
  {
    if(product.id === productId){
      matchingProduct = product;
    }
  })
  return matchingProduct;
}


export class Product{  // Exporting the Product class only for testing 
  id;
  image;
  name;
  rating;
  priceCents;
  keywords;

  constructor(productDetails){
    this.id = productDetails.id;
    this.image = productDetails.image;
    this.name = productDetails.name;
    this.rating = productDetails.rating;
    this.priceCents = productDetails.priceCents;
    this.keywords = productDetails.keywords;
  }

  getStarsUrl(){

    return `Images/ratings/rating-${this.rating.stars *10}.png`;

  }

  getPrice(){

    return `$${formatCurrency(this.priceCents)}`;

  }

  extraInfoHTML(){
    return ``;
  }
}


class Clothing extends Product{

  extraInfoHTML(){
    return `
    <a href="images/clothing-size-chart.png" target=blank>
      Size Chart
    </a>`;
  }

  sizeChartLink;

  constructor(productDetails){
    super(productDetails);
    this.sizeChartLink = productDetails.sizeChartLink;
  }
}


export function loadProductsFetch(){

  const promise = fetch('http://localhost:8080/amazon',{
    method : 'GET',
    headers : {
        'Content-type' : 'application/json'
    }
    }) //by default it gives the get request and it uses the promise and returns a promise
    .then((response) => {                  //Since it uses the promise we use the response to store the response from the backend in then()             
      return response.json();          //response.json() is asynchronous and it returns a promise so to wait for that promise we return it            
      }).then((productData) => {       //so it waits for the promise to finish before starting the next step               
      products = productData.map((productDetails)=> {  
      if(productDetails.type==='clothing'){
        return new Clothing(productDetails);
      }
      else{
        return new Product(productDetails);
      }
    })
      localStorage.setItem('products', JSON.stringify(products));
      console.log('load products');
      
  })/*.catch((error) => {
    console.log('Unexpected error! Please try again later.');
  });*/
  return promise;

}

// loadProductsFetch(); - Used to test wheter the error code works good or not 
/*
loadProductsFetch().then(console.log('next step'));
*/


export let products = [];

export function loadProducts(fun){

  const xhr = new XMLHttpRequest();

  xhr.addEventListener('load',() => {
    products = JSON.parse(xhr.response).map((productDetails) => {
      if(productDetails.type === 'clothing'){
        return new Clothing(productDetails);
      }
      return new Product(productDetails);
    });
    console.log('load products');
    localStorage.setItem('products', JSON.stringify(products));
    fun();
  });

  xhr.addEventListener('error', (error) => {
    console.log('Unexpected Error! Please try again later.');
  })

  xhr.open('GET','https://supersimplebackend.dev/products');
  xhr.send();
}

/*Using Backend 
    - Send a Request
    - Use a callback to wait for a response
    - Then run the rest of the code
*/
