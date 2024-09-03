package com.amazon.amazonprj;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.Data;

@Embeddable
@Data
public class OrderedProducts {
	
	@Column(name="productId")
	private String productId;
	@Column(name="quantity")
	private int quantity;
	@Column(name="estimatedDeliveryTime")
	private String estimatedDeliveryTime;
}
