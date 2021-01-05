import React from "react";
import { Product } from "../types";
import "react-toastify/dist/ReactToastify.css";
import { CartItem } from "../features/cartSlice";

interface Props extends Product {
  onAdd: (p: CartItem) => void;
}

const ProductCard: React.FC<Props> = (props) => {
  const onClick = (_: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const product = { ...props, quantity: 1, qtyPrice: props.price };
    props.onAdd(product);
  };
  return (
    <div
      key={props.id}
      className="md:w-4/12 p-2 md:inline-block w-full self-start
            "
    >
      <div className="bg-gray-100 p-4">
        <img src={props.image} alt={props.title} className="w-100" />
        <h1 className="text-3xl text-gray-900 my-4">{props.title}</h1>
        <h3 className="my-3 text-2xl text-blue-500">${props.price}</h3>
        <h3 className="my-3 text-2xl text-gray-500">
          {props.isAvailable ? "Available" : "Not Available"}
        </h3>
        <p>{props.description}</p>
        <button
          disabled={!props.isAvailable}
          className={` bg-gray-700 mt-4 ml-auto p-3 text-blue-300 rounded ${
            !props.isAvailable && "opacity-50 cursor-not-allowed"
          }`}
          onClick={onClick}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
