package com.amazon.amazonprj;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class CartController {
	
	@Autowired
	private CartService service;
	
	@GetMapping("amazon/cart")
	public List<Cart> getAllProducts() {
		return service.getAll();
	}
}
