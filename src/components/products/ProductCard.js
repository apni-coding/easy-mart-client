import React from 'react'
import './ProductCard.css'
function ProductCard() {
  return (
    <div className="productItem">
        <img src='https://cdn.dummyjson.com/product-images/1/4.jpg' alt="productimg" />
        <p>'Hellow sdososdooisdfoi'</p>
        <h3>&#8377; 4000</h3>
        <button className="btn" >
          Add To Cart
        </button>
      </div>
  )
}

export default ProductCard
