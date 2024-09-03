package com.amazon.amazonprj;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OrdersService {
	
	@Autowired
	private OrdersRepository repo;
	
	public Orders insertOrders(Orders order) {
		return repo.save(order);
	}
}
