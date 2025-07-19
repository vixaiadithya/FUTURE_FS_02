import React, { useState } from 'react';
import { Header } from './components/Header';
import { ProductListing } from './components/ProductListing';
import { ProductDetail } from './components/ProductDetail';
import { Cart } from './components/Cart';
import { Checkout } from './components/Checkout';
import { OrderConfirmation } from './components/OrderConfirmation';
import { CartProvider } from './contexts/CartContext';

type AppView = 'products' | 'product-detail' | 'checkout' | 'order-confirmation';

export default function App() {
  const [currentView, setCurrentView] = useState<AppView>('products');
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);
  const [showCart, setShowCart] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [orderData, setOrderData] = useState<any>(null);

  const handleProductClick = (id: number) => {
    setSelectedProductId(id);
    setCurrentView('product-detail');
  };

  const handleBackToProducts = () => {
    setCurrentView('products');
    setSelectedProductId(null);
  };

  const handleCheckout = () => {
    setShowCart(false);
    setCurrentView('checkout');
  };

  const handleOrderComplete = (data: any) => {
    setOrderData(data);
    setCurrentView('order-confirmation');
  };

  const handleContinueShopping = () => {
    setCurrentView('products');
    setOrderData(null);
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'product-detail':
        return selectedProductId ? (
          <ProductDetail
            productId={selectedProductId}
            onBack={handleBackToProducts}
          />
        ) : null;
      case 'checkout':
        return (
          <Checkout
            onBack={() => setShowCart(true)}
            onOrderComplete={handleOrderComplete}
          />
        );
      case 'order-confirmation':
        return orderData ? (
          <OrderConfirmation
            orderData={orderData}
            onContinueShopping={handleContinueShopping}
          />
        ) : null;
      case 'products':
      default:
        return (
          <ProductListing
            searchQuery={searchQuery}
            onProductClick={handleProductClick}
          />
        );
    }
  };

  return (
    <CartProvider>
      <div className="min-h-screen bg-background">
        <Header
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onCartClick={() => setShowCart(true)}
          onHomeClick={handleContinueShopping}
        />
        
        <main>
          {renderCurrentView()}
        </main>

        {showCart && (
          <Cart
            onClose={() => setShowCart(false)}
            onCheckout={handleCheckout}
          />
        )}
      </div>
    </CartProvider>
  );
}