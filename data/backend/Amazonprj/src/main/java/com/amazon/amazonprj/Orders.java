package com.amazon.amazonprj;

import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;

@Data
@Entity
public class Orders {

	@Id
	@Column(name="id")
	private String id;
	@Column(name="orderTime")
	private String orderTime;

	@ElementCollection
	private List<OrderedProducts> products;
	@Column(name="totalCostCents")
	private int totalCostCents;
	
}
