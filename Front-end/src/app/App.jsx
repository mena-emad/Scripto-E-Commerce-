import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';

import AppRouter from './router';
import Toast from '../components/feedback/Toast';
import useTheme from '../hooks/useTheme';
import useAuth from '../hooks/auth/useAuth';
import useProducts from '../hooks/useProducts';
import useCart from '../hooks/useCart';
import useOrders from '../hooks/useOrders';

const appStyles = {
  shell: {
    minHeight: '100vh',
    background: 'var(--color-background)',
    color: 'var(--color-text-primary)'
  },

  topbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '1rem 2rem',
    background: 'var(--color-surface)',
    borderBottom: '1px solid var(--color-border)',
    position: 'sticky',
    top: 0,
    zIndex: 20
  },

  nav: {
    display: 'flex',
    gap: '1rem',
    flexWrap: 'wrap'
  },

  link: {
    color: 'var(--color-text-primary)',
    fontWeight: 600,
    fontSize: '0.95rem'
  },

  container: {
    maxWidth: '1280px',
    margin: '0 auto',
    padding: '1.5rem 1rem 3rem'
  },

  card: {
    background: '#fff',
    border: '1px solid #e2e8f0',
    borderRadius: '18px',
    boxShadow: '0 10px 25px rgba(15, 23, 42, 0.04)'
  }
};

function TopBar({ currentUser, onLogout, cartCount }) {
  const navigate = useNavigate();
  const location = useLocation();

  const { theme, toggleTheme } = useTheme();

  const navLinks = [
    { label: 'Home', to: '/' },
    { label: 'Products', to: '/products' },
    { label: 'Cart', to: '/cart' },
    { label: 'Orders', to: '/orders' },
    { label: 'Profile', to: '/profile' }
  ];

  // Vendor navigation
  if (currentUser?.role === 'vendor') {
    navLinks.length = 0;

    navLinks.push(
      {
        label: 'Vendor Dashboard',
        to: '/vendor/dashboard'
      },
      {
        label: 'Products',
        to: '/vendor/products'
      },
      {
        label: 'Orders',
        to: '/vendor/orders'
      },
      {
        label: 'Profile',
        to: '/vendor/profile'
      }
    );
  }

  // Admin navigation
  if (currentUser?.role === 'admin') {
    navLinks.length = 0;

    navLinks.push(
      {
        label: 'Admin Dashboard',
        to: '/admin/dashboard'
      },
      {
        label: 'Users',
        to: '/admin/users'
      },
      {
        label: 'Vendors',
        to: '/admin/vendors'
      },
      {
        label: 'Products',
        to: '/admin/products'
      },
      {
        label: 'Profile',
        to: '/profile'
      }
    );
  }

  return (
    <div style={appStyles.topbar} className="app-topbar">
      {/* Logo */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem'
        }}
      >
        <Link
          to="/"
          style={{
            fontSize: '1.55rem',
            fontWeight: 800,
            color: 'var(--color-text-primary)',
            textDecoration: 'none'
          }}
        >
          Scripto
        </Link>
      </div>

      {/* Navigation */}
      <nav style={appStyles.nav}>
        {navLinks.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            style={{
              ...appStyles.link,
              color:
                location.pathname === link.to
                  ? '#1d4ed8'
                  : 'var(--color-text-primary)',
              textDecoration: 'none'
            }}
          >
            {link.label}
          </Link>
        ))}
      </nav>

      {/* Actions */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem'
        }}
      >
        {/* Theme Toggle */}
        <button
          type="button"
          onClick={toggleTheme}
          aria-label={`Switch to ${
            theme === 'light' ? 'dark' : 'light'
          } mode`}
          title={`Switch to ${
            theme === 'light' ? 'dark' : 'light'
          } mode`}
          style={{
            background: 'transparent',
            border: '1px solid var(--color-border)',
            borderRadius: '999px',
            padding: '0.55rem 0.7rem',
            cursor: 'pointer'
          }}
        >
          {theme === 'light' ? 'Moon' : 'Sun'}
        </button>

        {/* Guest */}
        {!currentUser ? (
          <>
            <Link
              to="/login"
              style={{
                ...appStyles.link,
                color: '#1d4ed8',
                textDecoration: 'none'
              }}
            >
              Login
            </Link>

            <Link
              to="/register"
              style={{
                ...appStyles.link,
                color: '#1d4ed8',
                textDecoration: 'none'
              }}
            >
              Register
            </Link>
          </>
        ) : (
          <>
            {/* Cart */}
            <button
              type="button"
              onClick={() => navigate('/cart')}
              style={{
                background: '#eff6ff',
                border: '1px solid #bfdbfe',
                borderRadius: '999px',
                padding: '0.55rem 0.8rem',
                fontWeight: 700,
                color: '#1d4ed8',
                cursor: 'pointer'
              }}
            >
              Cart ({cartCount})
            </button>

            {/* Logout */}
            <button
              type="button"
              onClick={onLogout}
              style={{
                background: '#0f172a',
                border: 'none',
                borderRadius: '12px',
                color: '#fff',
                padding: '0.7rem 1rem',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              Logout
            </button>
          </>
        )}
      </div>
    </div>
  );
}

function App() {
  const navigate = useNavigate();
  const { user: currentUser, logout } = useAuth();

  useEffect(() => {
    const handleSessionExpired = () => navigate('/login', { replace: true });
    window.addEventListener('auth:session-expired', handleSessionExpired);
    return () => window.removeEventListener('auth:session-expired', handleSessionExpired);
  }, [navigate]);

  /*
   * Toast state
   */
  const [toast, setToast] = useState({
    message: '',
    visible: false,
    type: 'success'
  });

  /*
   * Cart state
   */
  const { products, error: productsError } = useProducts();
  const { cartItems, cartTotal, addToCart, updateQuantity, removeItem } = useCart(currentUser);
  const { orders: orderList, makeOrder } = useOrders(currentUser);

  /*
   * Cart count
   */
  const cartCount = useMemo(() => {
    return cartItems.reduce(
      (sum, item) => sum + item.quantity,
      0
    );
  }, [cartItems]);

  /*
   * Show Toast
   */
  const showToast = (message, type = 'success') => {
    setToast({
      message,
      visible: true,
      type
    });

    setTimeout(() => {
      setToast((prev) => ({
        ...prev,
        visible: false
      }));
    }, 2200);
  };

  /*
   * Login
   */
  const triggerLogin = (user) => {
    if (!user) {
      console.error('triggerLogin received invalid user:', user);
      return;
    }

    showToast(
      `Welcome back, ${user.name?.split(' ')[0] || 'User'}!`,
      'success'
    );
  };

  /*
   * Logout
   */
  const handleLogout = async () => {
    try {
      await logout();
      showToast('Logged out successfully.', 'info');
    } catch (error) {
      showToast('Unable to log out. Please try again.', 'error');
    }
  };

  /*
   * Add product to cart
   */
  const onAddToCart = async (product, quantity = 1) => {
    try {
      await addToCart(product.id, quantity);
      showToast(`${product.name} added to cart.`, 'success');
    } catch (error) {
      showToast(error?.response?.data?.message || 'Unable to add product to cart.', 'error');
    }
  };

  /*
   * Remove product from cart
   */
  const onRemoveCartItem = (productId) => {
    removeItem(productId)
      .then(() => showToast('Item removed from cart.', 'info'))
      .catch((error) => showToast(error?.response?.data?.message || 'Unable to remove item.', 'error'));
  };

  /*
   * Update cart quantity
   */
  const onUpdateCartQuantity = (
    productId,
    quantity
  ) => {
    const nextQuantity = Math.max(1, quantity);
    updateQuantity(productId, nextQuantity)
      .catch((error) => showToast(error?.response?.data?.message || 'Unable to update cart.', 'error'));
  };

  /*
   * Place order
   */
  const onPlaceOrder = async (payload) => {
    await makeOrder(payload);
    showToast('Order placed successfully.', 'success');
  };

  return (
    <div style={appStyles.shell}>
      {/* Top Bar */}
      <TopBar
        currentUser={currentUser}
        onLogout={handleLogout}
        cartCount={cartCount}
      />

      {/* Main Content */}
      <div style={appStyles.container}>
        <AppRouter
          products={products}
          categories={[...new Set(products.map((product) => product.category).filter(Boolean))]}
          cartItems={cartItems}
          cartTotal={cartTotal}
          orderList={orderList}
          onLogin={triggerLogin}
          onRegister={triggerLogin}
          onAddToCart={onAddToCart}
          onRemoveCartItem={onRemoveCartItem}
          onUpdateCartQuantity={onUpdateCartQuantity}
          onPlaceOrder={onPlaceOrder}
        />
      </div>

      {/* Toast */}
      <Toast
        message={toast.message}
        type={toast.type}
        visible={toast.visible}
      />
    </div>
  );
}

export default App;


