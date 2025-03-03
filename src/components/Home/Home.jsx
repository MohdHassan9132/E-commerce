import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import images from "../../data/images";
import products from "../../data/product";
import { CartContext } from "../../context/CartContext";
import { useContext } from "react";

const Home = () => {
  const { addToCart } = useContext(CartContext);

  const settings = {
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="container mx-auto">
      {/* Hero Section - Full Width as Nav */}
      <section className="w-full bg-white text-center py-16 px-4 shadow-md">
        <h1 className="text-5xl font-extrabold text-yellow-600 drop-shadow-lg">
          Fresh & Organic Dairy Products 🥛
        </h1>
        <p className="text-lg text-gray-700 mt-3 max-w-2xl mx-auto">
          Enjoy farm-fresh milk, cheese, and butter delivered to your doorstep.
        </p>
        <Link to="/products">
          <button className="mt-6 px-6 py-3 bg-yellow-500 text-white font-semibold rounded-lg hover:bg-yellow-600 transition-all">
            Shop Now 🛒
          </button>
        </Link>
      </section>

      {/* Product Slider Section */}
      <section className="mt-12 px-6">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
          Best-Selling Dairy Products 🏆
        </h2>

        <Slider {...settings} className="mx-auto max-w-6xl">
          {products.map((product) => (
            <div key={product.id} className="p-4">
              <div className="bg-white p-4 rounded-lg shadow-lg transition-transform transform hover:scale-105">
                <Link to={`/products/{product.id}`}>
                  <img
                    src={images[product.image]}
                    alt={product.name}
                    className="h-44 mx-auto object-contain rounded-lg"
                  />
                  <h3 className="text-xl font-semibold mt-3 text-gray-700">
                    {product.name}
                  </h3>
                </Link>
                <p className="text-yellow-600 font-bold mt-2 text-lg">
                  {product.price}
                </p>
                <button
                  onClick={() => addToCart(product)}
                  className="mt-4 w-full px-5 py-2 bg-yellow-500 text-white font-semibold rounded-lg hover:bg-yellow-600 transition-all"
                >
                  Add to Cart 🛍️
                </button>
              </div>
            </div>
          ))}
        </Slider>
      </section>

      {/* Why Choose Us? (Flex Layout & Bigger) */}
      <section className="mt-12 px-6">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
          Why Choose Us? 🤔
        </h2>
        <div className="flex flex-wrap justify-center gap-6">
          <div className="p-6 bg-white rounded-lg shadow-md w-80 text-center">
            <h3 className="text-xl font-semibold text-yellow-600">🚜 100% Organic</h3>
            <p className="text-gray-600 mt-2">Our dairy products are sourced from certified organic farms.</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-md w-80 text-center">
            <h3 className="text-xl font-semibold text-yellow-600">🛵 Fast & Fresh Delivery</h3>
            <p className="text-gray-600 mt-2">We deliver fresh dairy products straight from the farm to your doorstep.</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-md w-80 text-center">
            <h3 className="text-xl font-semibold text-yellow-600">💰 Best Prices Guaranteed</h3>
            <p className="text-gray-600 mt-2">Enjoy high-quality dairy at unbeatable prices.</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-md w-80 text-center">
            <h3 className="text-xl font-semibold text-yellow-600">⭐ 5-Star Customer Reviews</h3>
            <p className="text-gray-600 mt-2">Loved by thousands of customers across the country.</p>
          </div>
        </div>
      </section>

      {/* Customer Testimonials (Flex Row) */}
      <section className="mt-12 px-6">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
          What Our Customers Say ❤️
        </h2>
        <div className="flex justify-center gap-6">
          <div className="p-6 bg-white rounded-lg shadow-md w-80 text-center">
            <p className="text-gray-600">"The freshest milk I've ever tasted! Fast delivery and great service."</p>
            <h4 className="font-semibold text-yellow-600 mt-2">- Mohd Hammad</h4>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-md w-80 text-center">
            <p className="text-gray-600">"Organic and pure! My family loves their dairy products."</p>
            <h4 className="font-semibold text-yellow-600 mt-2">- Mohd Anas</h4>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
