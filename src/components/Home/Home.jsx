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
    <div className="container mx-auto px-4 bg-gray-50">
      {/* Hero Section */}
      <section className="w-full bg-gradient-to-r from-green-900 to-green-800 text-center py-20 shadow-xl rounded-lg mt-6">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white drop-shadow-lg">
        Fresh Dairy & Tasty Bites ! 🥛🍔🍕        </h1>
        <p className="text-lg text-gray-100 mt-4 max-w-2xl mx-auto">
          From farm-fresh milk, cheese, and butter to mouthwatering burgers,
          pizzas, and sandwiches – enjoy premium quality food, delivered to your
          doorstep.
        </p>
        <Link to="/products">
          <button className="mt-8 px-8 py-3 bg-yellow-500 text-green-900 font-bold rounded-full hover:bg-yellow-400 transition-all transform hover:scale-105 shadow-lg">
            Shop Now 🛒
          </button>
        </Link>
      </section>

      {/* Product Slider Section */}
      <section className="mt-16 px-4">
        <h2 className="text-3xl font-bold text-green-900 text-center mb-8 relative">
          <span className="inline-block relative z-10">
            Best-Selling Dairy Products 🏆
          </span>
          <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-yellow-400 rounded-full"></span>
        </h2>
        <div className="max-w-6xl mx-auto">
          <Slider {...settings}>
            {products.map((product) => (
              <div key={product.id} className="p-4">
                <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all border-t-4 border-green-800">
                  <Link to={`/products/${product.id}`}>
                    <div className="overflow-hidden rounded-lg mb-4">
                      <img
                        src={images[product.image]}
                        alt={product.name}
                        className="h-44 md:h-56 w-full object-contain transform hover:scale-105 transition-transform"
                      />
                    </div>
                    <h3 className="text-xl font-semibold text-green-900">
                      {product.name}
                    </h3>
                  </Link>
                  <p className="text-yellow-600 font-bold mt-2 text-lg">
                    {product.price}
                  </p>
                  <button
                    onClick={() => addToCart(product)}
                    className="mt-4 w-full px-5 py-3 bg-green-800 text-white font-semibold rounded-lg hover:bg-green-700 transition-all flex items-center justify-center space-x-2"
                  >
                    <span>Add to Cart</span>
                    <span className="text-yellow-300">+</span>
                  </button>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </section>

      {/* Features Section */}
      <section className="mt-20 text-center px-6">
        <h2 className="text-3xl font-bold text-green-900 mb-12 relative inline-block">
          <span>Why Choose Us? ⭐</span>
          <span className="absolute bottom-0 left-0 w-full h-1 bg-yellow-400 rounded-full"></span>
        </h2>
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8 mt-8">
          <div className="p-8 bg-white rounded-lg shadow-md hover:shadow-xl transition-all border-l-4 border-green-800">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl text-green-800">🌱</span>
            </div>
            <h3 className="text-xl font-bold text-green-800">100% Organic</h3>
            <p className="text-gray-700 mt-3">
              We provide the freshest organic dairy products with no
              preservatives.
            </p>
          </div>
          <div className="p-8 bg-white rounded-lg shadow-md hover:shadow-xl transition-all border-l-4 border-green-800">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl text-green-800">🚚</span>
            </div>
            <h3 className="text-xl font-bold text-green-800">Fast Delivery</h3>
            <p className="text-gray-700 mt-3">
              Enjoy same-day delivery to ensure freshness and quality.
            </p>
          </div>
          <div className="p-8 bg-white rounded-lg shadow-md hover:shadow-xl transition-all border-l-4 border-green-800">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl text-green-800">💖</span>
            </div>
            <h3 className="text-xl font-bold text-green-800">
              Trusted by Thousands
            </h3>
            <p className="text-gray-700 mt-3">
              Over 10,000 happy customers trust us for their daily dairy needs.
            </p>
          </div>
        </div>
      </section>

      {/* Customer Reviews Section */}
      <section className="mt-20 bg-green-50 py-16 px-6 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-green-900 text-center mb-10 relative inline-block">
          <span>What Our Customers Say 💬</span>
          <span className="absolute bottom-0 left-0 w-full h-1 bg-yellow-400 rounded-full"></span>
        </h2>
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-all relative">
            <div className="absolute -top-4 -left-4 w-10 h-10 bg-green-800 rounded-full flex items-center justify-center text-white text-2xl">
              "
            </div>
            <p className="text-gray-700 italic">
              "Absolutely love the fresh milk! It's so pure and tastes amazing."
            </p>
            <p className="text-green-800 font-bold mt-4">- Sadiq Ameen</p>
            <div className="mt-2 text-yellow-500">★★★★★</div>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-all relative">
            <div className="absolute -top-4 -left-4 w-10 h-10 bg-green-800 rounded-full flex items-center justify-center text-white text-2xl">
              "
            </div>
            <p className="text-gray-700 italic">
              "Their cheese selection is top-notch! Highly recommended."
            </p>
            <p className="text-green-800 font-bold mt-4">- Junaid K.</p>
            <div className="mt-2 text-yellow-500">★★★★★</div>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-all relative">
            <div className="absolute -top-4 -left-4 w-10 h-10 bg-green-800 rounded-full flex items-center justify-center text-white text-2xl">
              "
            </div>
            <p className="text-gray-700 italic">
              "Super fast delivery and excellent quality dairy products!"
            </p>
            <p className="text-green-800 font-bold mt-4">- Mohd Hammad</p>
            <div className="mt-2 text-yellow-500">★★★★★</div>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-all relative">
            <div className="absolute -top-4 -left-4 w-10 h-10 bg-green-800 rounded-full flex items-center justify-center text-white text-2xl">
              "
            </div>
            <p className="text-gray-700 italic">
              "Organic, fresh, and delicious. Best dairy shop ever!"
            </p>
            <p className="text-green-800 font-bold mt-4">- Mohd Anas</p>
            <div className="mt-2 text-yellow-500">★★★★★</div>
          </div>
        </div>
      </section>

      {/* Call-to-Action */}
      <section className="mt-20 mb-16 text-center py-16 bg-gradient-to-r from-green-900 to-green-800 text-white rounded-lg shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 transform translate-x-16 -translate-y-16 bg-yellow-400 opacity-20 rounded-full"></div>
        <div className="absolute bottom-0 left-0 w-40 h-40 transform -translate-x-20 translate-y-20 bg-yellow-400 opacity-20 rounded-full"></div>
        <h2 className="text-3xl font-bold relative z-10">
          Try Our Dairy Products Today! 🥛
        </h2>
        <p className="text-lg mt-3 max-w-xl mx-auto relative z-10">
          Get fresh, organic dairy delivered straight to your home with our
          premium service.
        </p>
        <Link to="/products">
          <button className="mt-8 px-8 py-3 bg-yellow-500 text-green-900 font-bold rounded-full hover:bg-yellow-400 transition-all transform hover:scale-105 shadow-lg relative z-10">
            Browse Products 🛍️
          </button>
        </Link>
        <div className="mt-6 inline-block bg-red-600 text-white px-4 py-2 rounded-full text-sm font-bold animate-pulse relative z-10">
          Limited Time Offer: Free Delivery on Orders Over ₹300!
        </div>
      </section>
    </div>
  );
};

export default Home;
