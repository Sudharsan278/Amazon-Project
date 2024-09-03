package com.amazon.amazonprj;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository <Product, String>{

}

//The JPA Repository helps us to avoid mentioning the queries explicitly and we can make use of the 
//inbuilt methods available in the JPA Repository
