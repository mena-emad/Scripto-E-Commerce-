import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';

export default function CheckoutPage({ cartItems, onPlaceOrder }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    fullName: 'Customer User',
    address: '123 Market Street',
    city: 'Riyadh',
    phone: '+966500000000'
  });

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleSubmit = (e) => {
    e.preventDefault();
    onPlaceOrder({ ...form, total, items: cartItems });
    navigate('/orders');
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 0.8fr', gap: '1.2rem' }}>
      <form onSubmit={handleSubmit} style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '18px', padding: '1.25rem' }}>
        <h2 style={{ marginTop: 0 }}>Checkout</h2>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <label>
            <div style={{ marginBottom: '0.35rem', fontWeight: 600 }}>Full name</div>
            <input value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} style={inputStyle} />
          </label>
          <label>
            <div style={{ marginBottom: '0.35rem', fontWeight: 600 }}>Phone</div>
            <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} style={inputStyle} />
          </label>
          <label style={{ gridColumn: '1 / -1' }}>
            <div style={{ marginBottom: '0.35rem', fontWeight: 600 }}>Address</div>
            <input value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} style={inputStyle} />
          </label>
          <label>
            <div style={{ marginBottom: '0.35rem', fontWeight: 600 }}>City</div>
            <input value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} style={inputStyle} />
          </label>
          <label>
            <div style={{ marginBottom: '0.35rem', fontWeight: 600 }}>Payment</div>
            <input value="Cash on delivery" readOnly style={{ ...inputStyle, background: '#f8fafc' }} />
          </label>
        </div>

        <div style={{ marginTop: '1.2rem' }}>
          <Button type="submit">Place order</Button>
        </div>
      </form>

      <aside style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '18px', padding: '1.25rem', height: 'fit-content' }}>
        <h3 style={{ marginTop: 0 }}>Summary</h3>
        {cartItems.map((item) => (
          <div key={item.productId} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.6rem' }}>
            <span>{item.productName} x {item.quantity}</span>
            <strong>${item.price * item.quantity}</strong>
          </div>
        ))}
        <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '0.9rem', marginTop: '0.9rem', display: 'flex', justifyContent: 'space-between', fontSize: '1.1rem' }}>
          <span>Total</span>
          <strong>${total}</strong>
        </div>
      </aside>
    </div>
  );
}

const inputStyle = {
  width: '100%',
  padding: '0.8rem 0.9rem',
  borderRadius: '12px',
  border: '1px solid #cbd5e1',
  background: '#fff',
  fontSize: '0.98rem'
};
