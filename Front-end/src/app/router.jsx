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
import AdminProductDetailPage from '../features/admin/pages/AdminProductDetailPage';
import AdminVendorDetailPage from '../features/admin/pages/AdminVendorDetailPage';
import VerifyEmailPage from '../features/auth/pages/Verify';
import ForgotPasswordPage from '../features/auth/pages/ForgotPasswordPage';
import ResetPasswordPage from '../features/auth/pages/ResetPasswordPage';
import useAuth from '../hooks/auth/useAuth';
import useAdmin from '../hooks/useAdmin';
import useVendor from '../hooks/useVendor';

const formatStats = (stats, excludedKeys) => Object.entries(stats)
  .filter(([key, value]) => !excludedKeys.includes(key) && (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean'))
  .map(([key, value]) => ({
    label: key.replace(/([A-Z])/g, ' $1').replace(/^./, (character) => character.toUpperCase()),
    value
  }));

function ProtectedRoute({ user, loading, roles, children }) {
  if (loading) return <div style={{ padding: '2rem', textAlign: 'center' }}>Checking your session...</div>;
  if (!user) return <Navigate to="/login" replace />;
  if (roles && !roles.includes(user.role)) return <Navigate to="/" replace />;
  return children;
}

export default function AppRouter({ products, categories, cartItems, cartTotal, orderList, onLogin, onRegister, onAddToCart, onRemoveCartItem, onUpdateCartQuantity, onPlaceOrder }) {
  const { user: currentUser, loading: authLoading } = useAuth();
  const adminData = useAdmin(currentUser);
  const vendorData = useVendor(currentUser);

  return (
    <Routes>
      <Route path="/login" element={<LoginPage onLogin={onLogin} />} />
      <Route path="/register" element={<RegisterPage onRegister={onRegister} />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/reset-password" element={<ResetPasswordPage />} />
      <Route path="/" element={<HomePage products={products} categories={categories} currentUser={currentUser} onAddToCart={onAddToCart} />} />
      <Route path="/verify" element={<VerifyEmailPage/>}/>
      <Route path="/products" element={<ProductsPage products={products} categories={categories} currentUser={currentUser} onAddToCart={onAddToCart} />} />
      <Route path="/products/:id" element={<ProductDetailPage products={[...products, ...vendorData.products, ...adminData.products]} currentUser={currentUser} onAddToCart={onAddToCart} />} />
      <Route path="/cart" element={<ProtectedRoute user={currentUser} loading={authLoading}><CartPage items={cartItems} total={cartTotal} onRemove={onRemoveCartItem} onQuantityChange={onUpdateCartQuantity} /></ProtectedRoute>} />
      <Route path="/checkout" element={<ProtectedRoute user={currentUser} loading={authLoading}><CheckoutPage cartItems={cartItems} total={cartTotal} onPlaceOrder={onPlaceOrder} /></ProtectedRoute>} />
      <Route path="/orders" element={<ProtectedRoute user={currentUser} loading={authLoading}><OrdersPage orders={orderList} currentUser={currentUser} /></ProtectedRoute>} />
      <Route path="/profile" element={<ProtectedRoute user={currentUser} loading={authLoading}><ProfilePage /></ProtectedRoute>} />
      <Route path="/vendor/dashboard" element={<ProtectedRoute user={currentUser} loading={authLoading} roles={['vendor']}><VendorDashboardPage products={vendorData.products} vendorOrders={vendorData.orders} metrics={formatStats(vendorData.stats, [])} onUpdateOrderStatus={vendorData.updateOrderStatus} accessError={vendorData.error} /></ProtectedRoute>} />
      <Route path="/vendor/products" element={<ProtectedRoute user={currentUser} loading={authLoading} roles={['vendor']}><VendorProductsPage products={vendorData.products} onCreate={vendorData.createProduct} onUpdate={vendorData.updateProduct} onDelete={vendorData.deleteProduct} accessError={vendorData.error} /></ProtectedRoute>} />
      <Route path="/vendor/orders" element={<ProtectedRoute user={currentUser} loading={authLoading} roles={['vendor']}><VendorOrdersPage orders={vendorData.orders} onUpdateOrderStatus={vendorData.updateOrderStatus} accessError={vendorData.error} /></ProtectedRoute>} />
      <Route path="/vendor/profile" element={<ProtectedRoute user={currentUser} loading={authLoading} roles={['vendor']}><VendorProfilePage vendor={vendorData.profile} onUpdate={vendorData.updateProfile} accessError={vendorData.error} /></ProtectedRoute>} />
      <Route path="/admin/dashboard" element={<ProtectedRoute user={currentUser} loading={authLoading} roles={['admin']}><AdminDashboardPage stats={formatStats(adminData.stats, [])} recentUsers={adminData.users.slice(0, 4)} recentProducts={adminData.products.slice(0, 4)} onToggleBlock={adminData.toggleBlockUser} onDeleteUser={adminData.deleteUser} onDeleteProduct={adminData.deleteProduct} /></ProtectedRoute>} />
      <Route path="/admin/users" element={<ProtectedRoute user={currentUser} loading={authLoading} roles={['admin']}><AdminUsersPage users={adminData.users} onDelete={adminData.deleteUser} onToggleBlock={adminData.toggleBlockUser} /></ProtectedRoute>} />
      <Route path="/admin/vendors" element={<ProtectedRoute user={currentUser} loading={authLoading} roles={['admin']}><AdminVendorsPage vendors={adminData.vendors} onApprove={adminData.approveVendor} onToggleBlock={adminData.toggleBlockVendor} /></ProtectedRoute>} />
      <Route path="/admin/products" element={<ProtectedRoute user={currentUser} loading={authLoading} roles={['admin']}><AdminProductsPage products={adminData.products} vendors={adminData.vendors} onApprove={adminData.approveProduct} /></ProtectedRoute>} />
      <Route path="/admin/products/:id" element={<ProtectedRoute user={currentUser} loading={authLoading} roles={['admin']}><AdminProductDetailPage getProductDetails={adminData.getProductDetails} onApprove={adminData.approveProduct} onToggleActive={adminData.toggleProductActive} /></ProtectedRoute>} />
      <Route path="/admin/vendors/:id" element={<ProtectedRoute user={currentUser} loading={authLoading} roles={['admin']}><AdminVendorDetailPage getVendorDetails={adminData.getVendorDetails} onApprove={adminData.approveVendor} onToggleBlock={adminData.toggleBlockVendor} /></ProtectedRoute>} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
