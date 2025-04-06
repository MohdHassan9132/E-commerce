import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { databases, storage } from "../../appwriteConfig";
import { CartContext } from "../../context/CartContext";

const DATABASE_ID = "67c6ae2b003333b15b7a";
const COLLECTION_ID = "67c6ae48001b7a650f40";
const BUCKET_ID = "67c6c224003c507f072a";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await databases.getDocument(
          DATABASE_ID,
          COLLECTION_ID,
          id
        );
        console.log("Fetched product data:", response);

        let imageUrl = null;
        if (response.image) {
          const url = storage.getFileView(BUCKET_ID, response.image);
          imageUrl = url.toString();
          console.log("Generated image URL:", imageUrl);
        } else {
          console.warn("No image ID found for this product.");
        }

        setProduct({ ...response, imageUrl });
      } catch (err) {
        console.error("Error fetching product details:", err);
        setError("Failed to load product details.");
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [id]);

  if (loading) {
    return <div className="container mx-auto p-4">Loading...</div>;
  }

  if (error) {
    return <div className="container mx-auto p-4">{error}</div>;
  }

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <div className="bg-white shadow-md rounded-lg p-4">
        {product.imageUrl ? (
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-56 md:h-80 object-contain rounded-md bg-gray-100"
          />
        ) : (
          <div className="w-full h-56 md:h-80 flex items-center justify-center bg-gray-200 rounded-md">
            No Image
          </div>
        )}
        <h1 className="text-2xl font-bold mt-4">{product.name}</h1>
        <p className="text-xl text-green-600 mt-2">₹{product.price}</p>
        <button
          onClick={() => addToCart(product)}
          className="bg-green-800 text-white px-4 py-2 rounded mt-2"
        >
          Add to Cart
        </button>
        <p className="mt-4">{product.description}</p>
      </div>
    </div>
  );
};

export default ProductDetails;
