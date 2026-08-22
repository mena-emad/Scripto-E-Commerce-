import { Navigate, Route, Routes } from 'react-router-dom';
import LoginPage from '../features/auth/pages/LoginPage';
import RegisterPage from '../features/auth/pages/RegisterPage';
import HomePage from '../features/products/pages/HomePage';
import ProductsPage from '../features/products/pages/ProductsPage';
import ProductDetailPage from '../features/products/pages/ProductDetailPage';
import CartPage from '../features/cart/pages/CartPage';
import CheckoutPage from '../features/cart/pages/CheckoutPage';
import OrdersPage from '../features/orders/pages/OrdersPage';
import ProfilePage from '../features/profile/pages/ProfilePage';
import VendorDashboardPage from '../features/vendor/pages/VendorDashboardPage';
import VendorProductsPage from '../features/vendor/pages/VendorProductsPage';
import VendorOrdersPage from '../features/vendor/pages/VendorOrdersPage';
import VendorProfilePage from '../features/vendor/pages/VendorProfilePage';
import AdminDashboardPage from '../features/admin/pages/AdminDashboardPage';
import AdminUsersPage from '../features/admin/pages/AdminUsersPage';
import AdminVendorsPage from '../features/admin/pages/AdminVendorsPage';
import AdminProductsPage from '../features/admin/pages/AdminProductsPage';
import { products, categories } from '../features/products/data/products';
import { users } from '../features/auth/data/users';
import { vendors } from '../features/vendor/data/vendors';
import { vendorOrders } from '../features/orders/data/orders';
import { adminStats, vendorStats } from '../features/admin/data/stats';

const formatStats = (stats, excludedKeys) => Object.entries(stats)
  .filter(([key]) => !excludedKeys.includes(key))
  .map(([key, value]) => ({
    label: key.replace(/([A-Z])/g, ' $1').replace(/^./, (character) => character.toUpperCase()),
    value
  }));

export default function AppRouter({ currentUser, cartItems, orderList, onLogin, onRegister, onAddToCart, onRemoveCartItem, onUpdateCartQuantity, onPlaceOrder }) {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage onLogin={onLogin} users={users} />} />
      <Route path="/register" element={<RegisterPage users={users} onRegister={onRegister} />} />
      <Route path="/" element={<HomePage products={products} categories={categories} currentUser={currentUser} onAddToCart={onAddToCart} />} />
      <Route path="/products" element={<ProductsPage products={products} categories={categories} currentUser={currentUser} onAddToCart={onAddToCart} />} />
      <Route path="/products/:id" element={<ProductDetailPage products={products} currentUser={currentUser} onAddToCart={onAddToCart} />} />
      <Route path="/cart" element={<CartPage items={cartItems} onRemove={onRemoveCartItem} onQuantityChange={onUpdateCartQuantity} />} />
      <Route path="/checkout" element={<CheckoutPage cartItems={cartItems} onPlaceOrder={onPlaceOrder} />} />
      <Route path="/orders" element={<OrdersPage orders={orderList} currentUser={currentUser} />} />
      <Route path="/profile" element={<ProfilePage currentUser={currentUser || users[0]} />} />
      <Route path="/vendor/dashboard" element={<VendorDashboardPage products={products} vendorOrders={vendorOrders} metrics={formatStats(vendorStats, ['totalProducts', 'totalApprovedProducts', 'totalPendingProducts'])} />} />
      <Route path="/vendor/products" element={<VendorProductsPage currentUser={currentUser || users[1]} products={products} />} />
      <Route path="/vendor/orders" element={<VendorOrdersPage currentUser={currentUser || users[1]} orders={vendorOrders} />} />
      <Route path="/vendor/profile" element={<VendorProfilePage currentUser={currentUser || users[1]} vendor={vendors[0]} />} />
      <Route path="/admin/dashboard" element={<AdminDashboardPage stats={formatStats(adminStats, ['pendingProducts', 'pendingVendors'])} recentUsers={users.slice(0, 4)} recentProducts={products.slice(0, 4)} />} />
      <Route path="/admin/users" element={<AdminUsersPage users={users} />} />
      <Route path="/admin/vendors" element={<AdminVendorsPage vendors={vendors} />} />
      <Route path="/admin/products" element={<AdminProductsPage products={products} vendors={vendors} />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
