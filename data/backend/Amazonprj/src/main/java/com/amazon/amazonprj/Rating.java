package com.amazon.amazonprj;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.Data;

@Data
@Embeddable
public class Rating {
	
	@Column(name="stars")
	private double stars;
	@Column(name="count")
	private int count;
}
