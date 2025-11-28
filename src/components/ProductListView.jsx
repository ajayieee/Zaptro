import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

function ProductListView({ product }) {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  return (
    <div className=" space-y-4 mt-2 rounded-md">
      <div className="bg-gray-100 flex gap-7 items-center p-2 rounded-md">
        <img
          src={product.images[0]}
          alt={product.title}
          className="h-25 w-25 md:h-60 md:w-60 rounded-md cursor-pointer"
          onClick={() => navigate(`/products/${product.id}`)}
        />
        <div className="space-y-2">
          <h1 className="font-bold text-lg md:text-xl line-clamp-3 hover:text-red-400 cursor-pointer md:w-full w-[220px]">
            {product.title}
          </h1>
          <p className="font-semibold flex items-center text-sm md:text-lg">$
            <span className="md:text-4xl text-3xl">{product.price}</span> (
            {product.discountPercentage}% off)
          </p>
          <p className="text-sm">
            FREE Delivery <span className="font-semibold">Fri, 28 Nov,</span>
            <br />
            or fastest delivery{" "}
            <span className="font-semibold">Tomorrow, 27 Apr</span>
          </p>
          <button
            className="bg-red-500 cursor-pointer text-white px-3 py-1 rounded-md"
            onClick={() => addToCart(product)}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductListView;
