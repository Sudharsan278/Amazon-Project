package com.amazon.amazonprj;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class productController {

	@Autowired
	private ProductService service;
	
	@PostMapping("/amazon/insertproduct")
	public void addProduct(@RequestBody Product product) {
		service.insertProducts(product);
	}
	
	@PostMapping("/amazon/insertproducts")
	public void addProducts(@RequestBody List<Product> products) {
		service.saveAllProducts(products);
	}
	
	@GetMapping("/amazon")
	public List<Product> getAllProducts() {
		return service.getAllProducts();
	}
	
	@DeleteMapping("/amazon/delete/{id}")
	public void deleteById(@PathVariable String id) {
		service.deleteProduct(id);
	}
}
