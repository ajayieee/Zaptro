import { useEffect } from "react";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { useData } from "../context/DataContext";
import Category from "./Category";

function Carousel() {
  const { data, fetchAllProducts } = useData();
  console.log(data);

  useEffect(function () {
    fetchAllProducts();
  }, []);

  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    // console.log(className)

    return (
      <div
        onClick={onClick}
        // className={`arrow ${className}`}
        className="flex items-center justify-center absolute left-5 top-1/2 -translate-y-1/2 w-10 h-10 z-10"
        style={{ zIndex: 3 }}
      >
        <AiOutlineArrowLeft
          className="arrows"
          style={{
            ...style,
            display: "block",
            borderRadius: "50px",
            background: "#f53347",
            color: "white",
            position: "absolute",
            padding: "2px",
            left: "50px",
          }}
          onMouseHover="this.style.backgroundColor='#555'"
        />
      </div>
    );
  }

  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    // console.log(className)
    return (
      <div
        onClick={onClick}
        // className={`arrow right-arrow ${className}`}
        className="flex items-center justify-center absolute right-5 top-1/2 -translate-y-1/2 w-10 h-10 z-10"
      >
        <AiOutlineArrowRight
          className="arrows"
          style={{
            ...style,
            display: "block",
            borderRadius: "50px",
            background: "#f53347",
            color: "white",
            position: "absolute",
            padding: "2px",
            right: "50px",
          }}
        />
      </div>
    );
  }

  var settings = {
    dots: false, //false
    autoplay: true,
    autoplaySpeed: 2000,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    pauseOnHover: false,
    nextArrow: <SampleNextArrow to="next" />,
    prevArrow: <SamplePrevArrow to="prev" />,
  };

  return (
    <div>
      <Slider {...settings}>
        {data?.slice(78, 86)?.map((item, index) => {
          return (
            <div
              key={index}
              className="bg-gradient-to-r from-[rgb(15,12,41)] vis-[#302b63] to-[#24243e] -z-10 "
            >
              <div className="flex flex-col  md:flex-row gap-10 justify-center h-[600px] my-20  md:my-0 items-center px-10 sm:px-8 md:px-4 ">
                <div className="md:space-y-6 space-y-3 ">
                  <h3 className="text-red-500 font-semibold font-sans text-sm">
                    Powering Your World with the Best in Electronics
                  </h3>
                  <h1 className="text-sm md:text-4xl font-bold uppercase line-clamp-2 md:line-clamp-3 w-[500px] text-white ">
                    {item.title}
                  </h1>
                  <p className="md:w-[500px]  line-clamp-3 text-gray-400 pr-7 ">
                    {item.description}
                  </p>
                  <button className="bg-gradient-to-r from-red-500 to-purple-500 text-white px-3 py-2 rounded-md cursor-pointer mt-2">
                    Shop Now
                  </button>
                </div>
                <div className="flex items-center justify-center rounded-full bg-white w-[350px] h-[350px] shadow-2xl shadow-red-400 hover:scale-105 transition-all">
                  <img
                    src={item.images[0]}
                    alt={item.title}
                    className="object-contain w-[350px] h-[350px]  "
                    // className="rounded-full w-[550px] hover:scale-105 transition-all shadow-2xl shadow-red-400"
                  />
                </div>
              </div>
            </div>
          );
        })}
      </Slider>
      <Category />
    </div>
  );
}

export default Carousel;
