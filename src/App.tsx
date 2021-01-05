import React, { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import { Product } from "./types";
import ProductCard from "./components/ProductCard";
import { toast, ToastContainer } from "react-toastify";
import { CartItem, cartSlice } from "./features/cartSlice";
import { useDispatch, useSelector } from "react-redux";
// @ts-ignore
import { Container, Button } from "react-floating-action-button";
import CartSide from "./components/cartSide";
import { RootState } from "./app/store";

function App() {
  const dispatch = useDispatch();

  const productQty = useSelector(
    (state: RootState) => state.cart.totalQtyPerItem
  );

  const [isOpenCart, setIsOpenCart] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    axios
      .get<null, AxiosResponse<Product[]>>("/api/products")
      .then((res) => setProducts(res.data));
  }, []);

  const onProductAdd = (product: CartItem) => {
    dispatch(cartSlice.actions.addProduct(product));
    toast.info("Added to cart");
  };
  return (
    <>
      <ToastContainer />
      <div className="w-full h-screen bg-gradient-to-r from-gray-700 to-gray-900">
        <div
          className="w-full transition-all ease-linear h-full bg-contain bg-no-repeat bg-center flex justify-center items-center"
          style={{ backgroundImage: "url('/cover_image.png')" }}
        >
          <h1
            data-aos="fade-up"
            data-aos-delay="1000"
            data-aos-duration="500"
            className="text-9xl text-white font-thin"
          >
            Welcome to Shoe Shop
          </h1>
        </div>
      </div>

      <div className="m-16">
        <h4 className="text-center text-6xl my-4 text-gray-800">
          Latest Products
        </h4>
        {products.slice(0, 3).map((el) => (
          <ProductCard {...el} onAdd={onProductAdd} />
        ))}
        <br />
        <br />
        <h4 className="text-center text-6xl my-4 text-gray-800">
          Featured Products
        </h4>
        {products.slice(3, 6).map((el) => (
          <ProductCard {...el} onAdd={onProductAdd} />
        ))}
      </div>
      <Container>
        <span className="absolute right-0 bg-yellow-600 px-2 z-40 top-2 rounded-md">
          {productQty}
        </span>
        <Button
          tooltip="View Cart"
          icon="fas fa-shopping-cart"
          rotate={false}
          onClick={() => setIsOpenCart((p) => !p)}
          styles={{
            backgroundColor: "rgba(31, 41, 55)",
            color: "rgba(147, 197, 253)",
          }}
        />
      </Container>
      <CartSide
        isHidden={!isOpenCart}
        closeFunc={() => setIsOpenCart((p) => !p)}
      />
    </>
  );
}

export default App;
