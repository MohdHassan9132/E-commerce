import { useState, useEffect } from "react";
import { databases, storage, DATABASE_ID } from "../../appwriteConfig";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const PRODUCTS_COLLECTION_ID = "67c6ae48001b7a650f40";
const BUCKET_ID = "67c6c224003c507f072a";

const AddProduct = () => {
  const { user, isSeller, loading } = useAuth();
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);

  // Form state
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState(null);

  // Check if the user is authenticated and is a seller.
  useEffect(() => {
    if (!loading) {
      if (!user) {
        navigate("/login");
      } else if (!isSeller) {
        navigate("/");
      }
    }
  }, [user, isSeller, loading, navigate]);

  // Fetch products
  const fetchProducts = async () => {
    try {
      const response = await databases.listDocuments(DATABASE_ID, PRODUCTS_COLLECTION_ID);
      setProducts(response.documents);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    if (!loading) {
      fetchProducts();
    }
  }, [loading]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);

    if (!image) {
      setMessage({ text: "Please upload an image", type: "error" });
      return;
    }

    try {
      const file = await storage.createFile(BUCKET_ID, "unique()", image);
      const fileId = file.$id;

      await databases.createDocument(DATABASE_ID, PRODUCTS_COLLECTION_ID, "unique()", {
        name,
        price: parseFloat(price),
        description,
        image: fileId,
      });

      setMessage({ text: "Product added successfully!", type: "success" });
      setName("");
      setPrice("");
      setDescription("");
      setImage(null);
      fetchProducts();
    } catch (error) {
      console.error("Error adding product:", error);
      setMessage({ text: "Failed to add product. Try again.", type: "error" });
    }
  };

  // Handle product deletion
  const handleDelete = async (productId, imageId) => {
    try {
      if (imageId) {
        await storage.deleteFile(BUCKET_ID, imageId);
      }
      await databases.deleteDocument(DATABASE_ID, PRODUCTS_COLLECTION_ID, productId);
      fetchProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  if (loading) return <p className="text-center">Checking authentication...</p>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Flex container for form & products */}
      <div className="flex flex-col md:flex-row gap-8">
        {/* Product Form */}
        <div className="bg-white p-6 rounded-lg shadow-md w-full md:w-1/3">
          <h2 className="text-2xl font-semibold text-gray-700 text-center mb-4">Add Product</h2>
          <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
            <input
              type="text"
              placeholder="Product Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="border border-gray-300 rounded-lg p-2 w-full focus:ring-2 focus:ring-blue-400"
            />

            <input
              type="number"
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
              className="border border-gray-300 rounded-lg p-2 w-full focus:ring-2 focus:ring-blue-400"
            />

            <textarea
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="border border-gray-300 rounded-lg p-2 w-full resize-none focus:ring-2 focus:ring-blue-400"
              rows="3"
            />

            <input
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
              required
              className="border border-gray-300 rounded-lg p-2 w-full file:bg-blue-500 file:text-white file:px-3 file:py-1 file:rounded-md file:border-none file:cursor-pointer"
            />

            <button
              type="submit"
              className="bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-all font-medium"
            >
              Add Product
            </button>
          </form>

          {message && (
            <p className={`mt-3 text-center text-sm ${message.type === "success" ? "text-green-600" : "text-red-600"}`}>
              {message.text}
            </p>
          )}
        </div>

        {/* Product List */}
        <div className="flex-1">
          <h2 className="text-3xl font-bold text-center mb-4">Existing Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.map((product) => (
              <div key={product.$id} className="bg-white shadow-md rounded-lg p-4">
                {product.image && (
                  <img
                    src={storage.getFilePreview(BUCKET_ID, product.image)}
                    alt={product.name}
                    className="w-full h-40 object-cover rounded-md mb-2"
                  />
                )}
                <h3 className="text-xl font-bold">{product.name}</h3>
                <p className="text-green-600 font-semibold">₹{product.price}</p>
                <p className="text-gray-600">{product.description}</p>
                <button
                  onClick={() => handleDelete(product.$id, product.image)}
                  className="mt-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
