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
  const [latestProducts, setLatestProducts] = useState<Product[]>([]);
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);

  useEffect(() => {
    axios
      .get<null, AxiosResponse<Product[]>>("/api/products")
      .then((res) => setProducts(res.data));
    axios
      .get<null, AxiosResponse<Product[]>>("/api/products/latest")
      .then((res) => setLatestProducts(res.data));
    axios
      .get<null, AxiosResponse<Product[]>>("/api/products/featured")
      .then((res) => setFeaturedProducts(res.data));
  }, []);

  const onProductAdd = (product: CartItem) => {
    dispatch(cartSlice.actions.addProduct(product));
    toast.info("Added to cart");
  };
  return (
    <>
      <ToastContainer />
      <div className="w-full h-screen bg-gradient">
        <div
          className="w-full transition-all ease-linear h-full bg-contain bg-no-repeat bg-center flex justify-center items-center"
          style={{ backgroundImage: "url('/cover_image.png')" }}
        >
          <div
            style={{ backdropFilter: "blur( 6px )" }}
            className="bg-white bg-opacity-50 rounded-3xl shadow-2xl w-10/12"
          >
            <h1
              data-aos="fade-up"
              data-aos-delay="1000"
              data-aos-duration="500"
              className="md:text-9xl md:p-4 p-6 text-5xl text-gray-700 font-thin md:text-center"
            >
              Welcome to Shoe Shop
            </h1>
            {/* <button className="w-4/12 block my-6 rounded mx-auto py-3  bg-yellow-600 text-white">
              See All Products
            </button> */}
          </div>
        </div>
      </div>

      <div className="md:m-16 m-4">
        <h4 className="text-center text-6xl my-4 text-gray-800">
          Latest Products
        </h4>
        {latestProducts.map((el) => (
          <ProductCard {...el} onAdd={onProductAdd} />
        ))}
        <br />
        <br />
        <h4 className="text-center text-6xl my-4 text-gray-800">
          Featured Products
        </h4>
        {featuredProducts.map((el) => (
          <ProductCard {...el} onAdd={onProductAdd} />
        ))}

        <h4 className="text-center text-6xl my-4 text-gray-800">
          All Products
        </h4>
        {latestProducts.map((el) => (
          <ProductCard {...el} onAdd={onProductAdd} />
        ))}
        <br />
        <br />
        <h4 className="text-center text-6xl my-4 text-gray-800">
          All Products
        </h4>
        {products.map((el) => (
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
        onCheckoutClick={() =>
          toast.success("Your cart has been checked out successfully!")
        }
        closeFunc={() => setIsOpenCart((p) => !p)}
      />
    </>
  );
}

export default App;
