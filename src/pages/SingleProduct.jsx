import { useParams } from "react-router-dom";
import { useData } from "../context/DataContext";
import { useEffect, useState } from "react";
import axios from "axios";
import Loading from "../assets/Loading4.webm";
import BreadCrums from "../components/BreadCrums";
import { IoCartOutline } from "react-icons/io5";
import { useCart } from "../context/CartContext";

function SingleProduct() {
  const params = useParams();
  // console.log(params)

  const [singleProduct, setSingleProduct] = useState("");
  const { addToCart, cartItem } = useCart();

  useEffect(
    function () {
      async function getSingleProduct() {
        try {
          const res = await axios.get(
            `https://dummyjson.com/products/${params.id}`
          );
          const product = await res.data;
          console.log(product);
          setSingleProduct(product);
        } catch (error) {
          console.log(error);
        }
      }
      getSingleProduct();
    },
    [params.id]
  );

  const originalPrice = Math.round(
    singleProduct.price +
      (singleProduct.price * singleProduct.discountPercentage) / 100
  );

  return (
    <div>
      {singleProduct ? (
        <div className="px-4 pb-4 md:px-0">
          <BreadCrums title={singleProduct.title} />
          <div className="max-w-6xl  mx-auto md:p-6 grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* product image */}
            <div className="w-full">
              <img
                src={singleProduct.images[0]}
                alt={singleProduct.title}
                className="rounded-2xl w-full object-cover"
              />
            </div>
            {/* product detail  */}
            <div className="flex flex-col gap-6">
              <h1 className="md:text-3xl text-xl font-bold text-gray-800">
                {" "}
                {singleProduct.title}
              </h1>
              <div className="text-gray-700">
                {singleProduct.brand?.toUpperCase()} /{" "}
                {singleProduct.category?.toUpperCase()} / {singleProduct.sku}{" "}
              </div>
              <p className="text-xl text-red-500 font-bold">
                ${singleProduct.price}{" "}
                <span className="line-through text-gray-700">
                  {" "}
                  ${originalPrice}
                </span>{" "}
                <span className="bg-red-500 text-white px-4 py-2 rounded-full">
                  {singleProduct.discountPercentage}% discount
                </span>
              </p>
              <p className="text-gray-600 ">{singleProduct.description}</p>

              {/* Quantity selector */}
              <div className="flex items-center gap-4">
                <label htmlFor="" className="text-sm font-medium text-gray-700">
                  Quantity
                </label>
                <input
                  type="number"
                  min={1}
                  value={1}
                  className="w-20 border border-gray-300 rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-red-500 "
                />
              </div>
              <div className="flex gap-4 mt-4 ">
                <button
                  className="bg-red-500 px-6 py-2 flex gap-2 text-lg text-white rounded-lg"
                  onClick={() => addToCart(singleProduct)}
                >
                  <IoCartOutline className="w-6 h-6" />
                  Add to cart
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center h-[400px]">
          <video muted autoPlay loop>
            <source src={Loading} type="video/webm" />
          </video>
        </div>
      )}
    </div>
  );
}

export default SingleProduct;
