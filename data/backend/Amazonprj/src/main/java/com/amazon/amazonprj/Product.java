package com.amazon.amazonprj;

import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;

@Data
@Entity
public class Product {
	
	@Id
	@Column(name="id")
	private String id;
	@Column(name="image")
	private String image;
	@Column(name="name")
	private String name;
	@Embedded
	@Column (name="rating")
	private Rating rating;
	@Column(name="priceCents")
	private int priceCents;
	@ElementCollection
	@Column(name="keywords")
	private List <String> keywords;	
}
