import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/footer';
import AssistanceButton from '@/components/AssistanceButton';
import RelatedProducts from '@/components/products/RelatedProducts';
import CartPopup from '@/components/cart/CartPopup';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<any>(null);
  const [showCartPopup, setShowCartPopup] = useState(false);

  useEffect(() => {
    // Fetch product details based on the ID
    const fetchProduct = async () => {
      try {
        // Replace this with your actual data fetching logic
        const mockProduct = {
          id: parseInt(id || '1'),
          name: 'Sample Product',
          description: 'This is a sample product description.',
          price: 99.99,
          image: '/placeholder.svg',
          brand: 'Sample Brand',
        };
        setProduct(mockProduct);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    // Implement your add to cart logic here
    console.log('Product added to cart:', product);
    setShowCartPopup(true);
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  // Mock related products data
  const relatedProductsData = [
    { id: 2, name: 'Another Product', price: 79.99, image: '/placeholder.svg', brand: 'Another Brand' },
    { id: 3, name: 'Similar Product', price: 89.99, image: '/placeholder.svg', brand: 'Similar Brand' },
    { id: 4, name: 'Related Product', price: 69.99, image: '/placeholder.svg', brand: 'Related Brand' },
  ];
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-20 lg:pt-36">
        <div className="container mx-auto px-4 py-8">
          {/* Product Detail Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-auto rounded-md" 
              />
            </div>
            <div>
              <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
              <p className="text-gray-600 mb-6">{product.description}</p>
              <p className="text-xl font-semibold mb-4">{product.price} €</p>
              <button 
                className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
                onClick={handleAddToCart}
              >
                Ajouter au panier
              </button>
            </div>
          </div>
          
          {/* Related Products Section */}
          <RelatedProducts 
            products={relatedProductsData} 
            currentProductId={product.id.toString()} 
          />
        </div>
      </main>
      
      <Footer />
      <AssistanceButton />
      
      {/* Cart Popup */}
      {showCartPopup && (
        <CartPopup 
          onClose={() => setShowCartPopup(false)} 
        />
      )}
    </div>
  );
};

export default ProductDetail;
