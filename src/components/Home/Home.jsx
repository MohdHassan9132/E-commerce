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
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <div className="container mx-auto px-4">
      {/* Hero Section */}
      <section className="w-full bg-white text-center py-16 shadow-md">
        <h1 className="text-4xl md:text-5xl font-extrabold text-yellow-600 drop-shadow-lg">
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
      <section className="mt-12 px-4">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
          Best-Selling Dairy Products 🏆
        </h2>
        <div className="max-w-6xl mx-auto">
          <Slider {...settings}>
            {products.map((product) => (
              <div key={product.id} className="p-4">
                <div className="bg-white p-4 rounded-lg shadow-lg hover:scale-105 transition-transform">
                  <Link to={`/products/${product.id}`}>
                    <img
                      src={images[product.image]}
                      alt={product.name}
                      className="h-44 md:h-56 w-full object-contain rounded-lg"
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
                    Add to Cart 
                  </button>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </section>

            {/* Features Section */}
            <section className="mt-16 text-center px-6">
        <h2 className="text-3xl font-bold text-gray-800">Why Choose Us? ⭐</h2>
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6 mt-8">
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-yellow-600">100% Organic 🌱</h3>
            <p className="text-gray-700 mt-2">We provide the freshest organic dairy products with no preservatives.</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-yellow-600">Fast Delivery 🚚</h3>
            <p className="text-gray-700 mt-2">Enjoy same-day delivery to ensure freshness and quality.</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-yellow-600">Trusted by Thousands 💖</h3>
            <p className="text-gray-700 mt-2">Over 10,000 happy customers trust us for their daily dairy needs.</p>
          </div>
        </div>
      </section>

      {/* Customer Reviews Section */}
      <section className="mt-16 bg-gray-100 py-12 px-6 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
          What Our Customers Say 💬
        </h2>
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <p className="text-gray-700">
              "Absolutely love the fresh milk! It's so pure and tastes amazing."
            </p>
            <p className="text-yellow-600 font-bold mt-2">- Sadiq Ameen</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <p className="text-gray-700">
              "Their cheese selection is top-notch! Highly recommended."
            </p>
            <p className="text-yellow-600 font-bold mt-2">- Junaid K.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <p className="text-gray-700">
              "Super fast delivery and excellent quality dairy products!"
            </p>
            <p className="text-yellow-600 font-bold mt-2">- Mohd Hammad</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <p className="text-gray-700">
              "Organic, fresh, and delicious. Best dairy shop ever!"
            </p>
            <p className="text-yellow-600 font-bold mt-2">- Mohd Anas</p>
          </div>
        </div>
      </section>



      {/* Call-to-Action */}
      <section className="mt-16 text-center py-12 bg-yellow-500 text-white rounded-lg shadow-md">
        <h2 className="text-3xl font-bold">Try Our Dairy Products Today! 🥛</h2>
        <p className="text-lg mt-2">Get fresh, organic dairy delivered straight to your home.</p>
        <Link to="/products">
          <button className="mt-6 px-6 py-3 bg-white text-yellow-600 font-semibold rounded-lg hover:bg-gray-200 transition-all">
            Browse Products 🛍️
          </button>
        </Link>
      </section>
    </div>
  );
};

export default Home;
