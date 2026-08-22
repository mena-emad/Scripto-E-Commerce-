import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useMemo, useState } from 'react';
import { users } from '../features/auth/data/users';
import { orders } from '../features/orders/data/orders';
import { cart } from '../features/cart/data/cart';
import AppRouter from './router';
import Toast from '../components/feedback/Toast';
import useTheme from '../hooks/useTheme';

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

  const navLinks = [
    { label: 'Home', to: '/' },
    { label: 'Products', to: '/products' },
    { label: 'Cart', to: '/cart' },
    { label: 'Orders', to: '/orders' },
    { label: 'Profile', to: '/profile' }
  ];

  if (currentUser?.role === 'vendor') {
    navLinks.length = 0;
    navLinks.push(
      { label: 'Vendor Dashboard', to: '/vendor/dashboard' },
      { label: 'Products', to: '/vendor/products' },
      { label: 'Orders', to: '/vendor/orders' },
      { label: 'Profile', to: '/vendor/profile' }
    );
  }

  if (currentUser?.role === 'admin') {
    navLinks.length = 0;
    navLinks.push(
      { label: 'Admin Dashboard', to: '/admin/dashboard' },
      { label: 'Users', to: '/admin/users' },
      { label: 'Vendors', to: '/admin/vendors' },
      { label: 'Products', to: '/admin/products' }
    );
  }

  const { theme, toggleTheme } = useTheme();

  return (
    <div style={appStyles.topbar}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <Link to="/" style={{ fontSize: '1.55rem', fontWeight: 800, color: 'var(--color-text-primary)' }}>Scripto</Link>
      </div>

      <nav style={appStyles.nav}>
        {navLinks.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            style={{
              ...appStyles.link,
              color: location.pathname === link.to ? '#1d4ed8' : 'var(--color-text-primary)'
            }}
          >
            {link.label}
          </Link>
        ))}
      </nav>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <button
          type="button"
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          style={{ background: 'transparent', border: '1px solid var(--color-border)', borderRadius: '999px', padding: '0.55rem 0.7rem', cursor: 'pointer' }}
        >
          {theme === 'light' ? 'Moon' : 'Sun'}
        </button>
        {!currentUser ? (
          <>
            <Link to="/login" style={{ ...appStyles.link, color: '#1d4ed8' }}>Login</Link>
            <Link to="/register" style={{ ...appStyles.link, color: '#1d4ed8' }}>Register</Link>
          </>
        ) : (
          <>
            <button
              onClick={() => navigate('/cart')}
              style={{ background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '999px', padding: '0.55rem 0.8rem', fontWeight: 700, color: '#1d4ed8', cursor: 'pointer' }}
            >
              Cart ({cartCount})
            </button>
            <button
              onClick={onLogout}
              style={{ background: '#0f172a', border: 'none', borderRadius: '12px', color: '#fff', padding: '0.7rem 1rem', fontWeight: 700, cursor: 'pointer' }}
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
  const [currentUser, setCurrentUser] = useState(() => {
    const stored = localStorage.getItem('scripto-user');
    return stored ? JSON.parse(stored) : null;
  });
  const [toast, setToast] = useState({ message: '', visible: false, type: 'success' });
  const [cartItems, setCartItems] = useState(cart.products);
  const [orderList, setOrderList] = useState(orders);

  const cartCount = useMemo(() => cartItems.reduce((sum, item) => sum + item.quantity, 0), [cartItems]);

  const showToast = (message, type = 'success') => {
    setToast({ message, visible: true, type });
    setTimeout(() => setToast((prev) => ({ ...prev, visible: false })), 2200);
  };

  const triggerLogin = (user) => {
    setCurrentUser(user);
    localStorage.setItem('scripto-user', JSON.stringify(user));
    showToast(`Welcome back, ${user.name.split(' ')[0]}!`, 'success');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('scripto-user');
    showToast('Logged out successfully.', 'info');
  };

  const onAddToCart = (product, quantity = 1) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.productId === product.id);
      if (existing) {
        return prev.map((item) => item.productId === product.id ? { ...item, quantity: item.quantity + quantity } : item);
      }
      return [...prev, { productId: product.id, productName: product.name, vendorId: product.vendor, quantity, price: product.price }];
    });
    showToast(`${product.name} added to cart.`, 'success');
  };

  const onRemoveCartItem = (productId) => {
    setCartItems((prev) => prev.filter((item) => item.productId !== productId));
    showToast('Item removed from cart.', 'info');
  };

  const onUpdateCartQuantity = (productId, quantity) => {
    setCartItems((prev) => prev.map((item) => item.productId === productId ? { ...item, quantity: Math.max(1, quantity) } : item));
  };

  const onPlaceOrder = (payload) => {
    const order = {
      id: `o${Date.now()}`,
      createdAt: new Date().toISOString(),
      status: 'Processing',
      total: payload.total,
      items: payload.items,
      customer: payload.fullName,
      address: payload.address
    };

    setOrderList((prev) => [order, ...prev]);
    setCartItems([]);
    showToast('Order placed successfully.', 'success');
  };

  return (
    <div style={appStyles.shell}>
      <TopBar currentUser={currentUser} onLogout={handleLogout} cartCount={cartCount} />
      <div style={appStyles.container}>
        <AppRouter
          currentUser={currentUser}
          cartItems={cartItems}
          orderList={orderList}
          onLogin={triggerLogin}
          onRegister={triggerLogin}
          onAddToCart={onAddToCart}
          onRemoveCartItem={onRemoveCartItem}
          onUpdateCartQuantity={onUpdateCartQuantity}
          onPlaceOrder={onPlaceOrder}
        />
      </div>

      <Toast message={toast.message} type={toast.type} visible={toast.visible} />
    </div>
  );
}

export default App;
