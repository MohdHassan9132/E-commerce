import { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import { Link, useParams } from "react-router-dom";
import images from "../../data/images";
import products from "../../data/product";

const Products = () => {
  const { id } = useParams();
  const { addToCart } = useContext(CartContext);

  if (id) {
    const product = products.find((p) => p.id === Number(id));
    return product ? (
      <div className="flex flex-col md:flex-row items-center bg-white p-6 rounded-lg shadow-lg">
        <img 
          src={images[product.image]} 
          alt={product.name} 
          className="w-96 h-96 object-cover rounded-md shadow-md transition-transform duration-300 hover:scale-105" 
        />
        <div className="md:ml-10 mt-6 md:mt-0 text-center md:text-left">
          <h1 className="text-3xl font-bold text-yellow-600">{product.name}</h1>
          <p className="text-gray-600 mt-2">{product.description}</p>
          <p className="text-green-600 text-2xl font-semibold mt-3">{product.price}</p>
          <button
            onClick={() => addToCart(product)}
            className="mt-6 px-6 py-2  bg-green-800 text-white font-semibold rounded-md hover:bg-yellow-600 transition-all"
          >
            Add to Cart
          </button>
        </div>
      </div>
    ) : (
      <h1 className="text-center text-red-500 text-xl font-semibold">Product Not Found</h1>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-yellow-600 text-center">Our Products</h1>
      <div className="grid md:grid-cols-3 gap-6 mt-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white p-4 rounded-lg shadow-md text-center transition-all duration-300 hover:shadow-lg hover:scale-105">
            <Link to={`/products/${product.id}`} className="block">
              <img 
                src={images[product.image]} 
                alt={product.name} 
                className="w-full h-48 object-cover rounded-md" 
              />
              <h2 className="text-xl font-semibold mt-4 text-gray-800">{product.name}</h2>
              <p className="text-yellow-600 font-semibold">{product.price}</p>
            </Link>
            <button
              onClick={() => addToCart(product)}
              className="mt-4 px-4 py-2  bg-green-800 text-white font-semibold rounded-md hover:bg-yellow-600 transition-all"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
