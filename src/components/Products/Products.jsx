import { useEffect, useState, useContext } from "react";
import { databases, storage } from "../../appwriteConfig";
import { CartContext } from "../../context/CartContext";
import { Link } from "react-router-dom";

const DATABASE_ID = "67c6ae2b003333b15b7a";
const COLLECTION_ID = "67c6ae48001b7a650f40";
const BUCKET_ID = "67c6c224003c507f072a";

const Products = () => {
  const [products, setProducts] = useState([]);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await databases.listDocuments(DATABASE_ID, COLLECTION_ID);
        console.log("Raw response from Appwrite DB:", response);

        const updatedProducts = response.documents.map((product) => {
          const imageUrl = product.image
            ? storage.getFileView(BUCKET_ID, product.image)
            : null;

          console.log(`Generated image URL for ${product.name}:`, imageUrl);

          return { ...product, imageUrl };
        });

        setProducts(updatedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-4">All Products</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => (
          <div
            key={product.$id}
            className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center transition-all duration-300 hover:shadow-xl hover:scale-105"
          >
            {product.imageUrl ? (
              <Link to={`/products/${product.$id}`}>
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="h-44 md:h-56 w-full object-contain transform hover:scale-105 transition-transform rounded-md shadow-lg"
                />
              </Link>
            ) : (
              <div className="w-full h-40 flex items-center justify-center bg-gray-200 rounded-md">
                No Image
              </div>
            )}
            <h2 className="text-lg font-semibold mt-2">{product.name}</h2>
            <p className="text-green-600 font-bold text-xl">₹{product.price}</p>
            <button
              onClick={() => addToCart(product)}
              className="mt-4 w-full px-5 py-3 bg-green-800 text-white font-semibold rounded-lg hover:bg-green-700 transition-all flex items-center justify-center space-x-2"
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
