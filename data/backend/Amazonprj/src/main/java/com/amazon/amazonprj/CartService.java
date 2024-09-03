package com.amazon.amazonprj;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class CartService {

	@Autowired
	private CartRepository repo;
	
	public List<Cart> getAll() {
		return repo.findAll();
	}

}
