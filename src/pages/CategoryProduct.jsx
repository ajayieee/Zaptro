import axios from "axios";
import { ChevronLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../assets/Loading4.webm";
import ProductListView from "../components/ProductListView";

function CategoryProduct() {
  const { category } = useParams();
  //   console.log(category);
  const navigate = useNavigate();

  const [searchdata, setSearchdata] = useState();
  useEffect(
    function () {
      async function getFilterData() {
        try {
          const res = await axios.get(
            `https://dummyjson.com/products/category/${category}`
          );
          const data = await res.data.products;
          console.log(data);
          setSearchdata(data);
        } catch (error) {
          console.log(error);
        }
      }

      getFilterData();
      window.scrollTo(0, 0);
    },
    [category]
  );

  return (
    <div>
      {searchdata?.length > 0 ? (
        <div className="mx-auto max-w-6xl  mt-10 px-4">
          <button
            className="flex gap-1 cursor-pointer bg-gray-800 mb-5 text-white px-3 py-1 rounded-md items-center"
            onClick={() => navigate("/")}
          >
            <ChevronLeft />
            Back
          </button>
          {searchdata.map((product, index) => (
            <ProductListView key={index} product={product} />
          ))}
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

export default CategoryProduct;
