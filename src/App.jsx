import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ProductPage from './pages/ProductPage';
import PageNotFound from './pages/PageNotFound';
import CartContextProvider from './store/CartContext';
import UserProgressContextProvider from './store/UserProgressContext';
import Cart from './components/Cart/Cart';
import Checkout from './components/Checkout/Checkout';
import { UserProvider } from './store/UserContext';

function App() {
  return (
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <UserProvider>
        <UserProgressContextProvider>
          <CartContextProvider>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/dashboard/:id" element={<ProductPage />} />
              <Route path="*" element={<PageNotFound />} />
            </Routes>
            <Cart />
            <Checkout />
          </CartContextProvider>
        </UserProgressContextProvider>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
