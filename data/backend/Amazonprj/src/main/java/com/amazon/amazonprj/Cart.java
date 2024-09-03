package com.amazon.amazonprj;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;

@Data
@Entity
public class Cart {
	
	@Id
	@Column (name="productId")
	private String productId;
	@Column(name="quantity")
	private int quantity;
	@Column(name="deliveryOptionId")
	private int deliveryOptionId;
}
