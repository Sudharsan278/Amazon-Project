package com.amazon.amazonprj;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;

@Service
@Transactional

public class ProductService {
	
	@Autowired
	private ProductRepository repo;
	
	public void insertProducts(Product product) {
		repo.save(product);
	}
	
	public List<Product> saveAllProducts(List<Product> products){
		return repo.saveAll(products);
	}
	
	public List<Product> getAllProducts(){
		return repo.findAll();
	}
	
	public Product getProductById(String Id) {
		return repo.findById(Id).orElse(null);
	}
	
	//Can also Use the Optional<Product> instead or orElse(null)
	
	public void deleteProduct(String id) {
		repo.deleteById(id);
	}
	
}
