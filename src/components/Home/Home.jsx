import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import images from "../../data/images";
import products from "../../data/product";
import {CartContext} from "../../context/CartContext";
import { useContext } from "react";
const Home = () => {
  const {addToCart}=useContext(CartContext)
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
  };

  return (
    <div className="container mx-auto p-6 text-center">
      <h1 className="text-4xl font-bold text-yellow-600">
        Welcome to Our Dairy Products
      </h1>

      <Slider {...settings} className="mt-6">
        {products.map((product) => (
          <div key={product.id} className="p-4">
            <Link to={`/products/${product.id}`} className="block">
              <img
                src={images[product.image]}
                alt={product.name}
                className="max-w-[200px] max-h-[200px] mx-auto object-contain rounded-lg shadow-md transition-all duration-300 hover:scale-105"
              />
              <h2 className="text-lg font-semibold mt-2 text-gray-800">
                {product.name}
              </h2>
              </Link>
              <button
                onClick={() => addToCart(product)}
                className="mt-6 px-6 py-2 bg-yellow-500 text-white font-semibold rounded-md hover:bg-yellow-600 transition-all"
              >
                Add to Cart
              </button>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Home;
