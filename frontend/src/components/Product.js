import React from "react";
import { Link } from "react-router-dom";

export default function Product(props) {
  const { product } = props;
  return (
    product && (
      <div key={product._id} className="card shadow">
        <Link to={`/product/${product._id}`}>
          <img className="medium" src={product.images[0].name} alt="Product" />
        </Link>
        <div className="card-body">
          <Link to={`/product/${product._id}`}>
            <h2 className="primary-color font-awesome-2">{product.name}</h2>
          </Link>
          {/**<Rating rating={product.rating} numReviews={product.numReviews} /> */}
          <div className="price">{product.price}Kn</div>
        </div>
      </div>
    )
  );
}
