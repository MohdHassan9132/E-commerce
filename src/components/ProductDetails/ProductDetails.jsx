import { useParams } from "react-router-dom";
import images from "../../data/images";
import products from "../../data/product";
import { CartContext } from "../../context/CartContext";
import { useContext } from "react";
const ProductDetails = () => {
  const {addToCart} = useContext(CartContext)
  const { id } = useParams();
  const product = products.find((p) => p.id === Number(id));

  if (!product) return <h1 className="text-center text-red-500 text-xl">Product Not Found</h1>;

  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-col md:flex-row items-center">
        {/* ✅ Fix: Use images[product.image] */}
        <img src={images[product.image]} alt={product.name} className="w-96 h-96 object-cover rounded-md shadow-lg" />
        <div className="md:ml-10 mt-6 md:mt-0">
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-gray-600 mt-2">{product.description}</p>
          <p className="text-2xl font-semibold text-green-600 mt-3">{product.price}</p>
          <button onClick={()=> addToCart(product)} className="mt-6 px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
