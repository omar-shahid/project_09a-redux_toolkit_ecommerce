import React, { useEffect, useState } from "react";
// import { Counter } from './features/counter/Counter';
import axios, { AxiosResponse } from "axios";
import { Product } from "./types";
import ProductCard from "./components/ProductCard";
import { toast, ToastContainer } from "react-toastify";

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => {
    axios
      .get<null, AxiosResponse<Product[]>>("/api/products")
      .then((res) => setProducts(res.data));
  }, []);

  const notify = () => toast.info("Added to cart");
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
          <ProductCard {...el} notfFunc={notify} />
        ))}
        <br />
        <br />
        <h4 className="text-center text-6xl my-4 text-gray-800">
          Featured Products
        </h4>
        {products.slice(3, 6).map((el) => (
          <ProductCard {...el} notfFunc={notify} />
        ))}
      </div>
    </>
  );
}

export default App;
