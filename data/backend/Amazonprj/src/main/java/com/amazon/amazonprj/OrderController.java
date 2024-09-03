package com.amazon.amazonprj;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class OrderController {

	@Autowired
	private OrdersService service;
	
//	@PostMapping("/amazon/orders")
//	public void postOrders(@RequestBody Orders order) {
//		System.out.println("Recieved Order :- " + order);
//		service.insertOrders(order);
//	}
	
	@PostMapping("/amazon/orders")
	public ResponseEntity<Orders> postOrders(@RequestBody Orders order) {
	    Orders savedOrder = service.insertOrders(order);
	    return ResponseEntity.ok(savedOrder); // Ensure that the response is in JSON format
	}

}
