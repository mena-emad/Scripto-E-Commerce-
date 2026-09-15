import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';

export default function CheckoutPage({ cartItems, total = 0, onPlaceOrder }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    shippingAddress: '',
    paymentMethod: 'COD'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onPlaceOrder(form).then(() => navigate('/orders')).catch(() => {});
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 0.8fr', gap: '1.2rem' }} className="responsive-two-column">
      <form onSubmit={handleSubmit} style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '18px', padding: '1.25rem' }}>
        <h2 style={{ marginTop: 0 }}>Checkout</h2>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }} className="responsive-form-grid">
          <label style={{ gridColumn: '1 / -1' }}>
            <div style={{ marginBottom: '0.35rem', fontWeight: 600 }}>Shipping address</div>
            <input required value={form.shippingAddress} onChange={(e) => setForm({ ...form, shippingAddress: e.target.value })} style={inputStyle} />
          </label>
          <label>
            <div style={{ marginBottom: '0.35rem', fontWeight: 600 }}>Payment</div>
            <select value={form.paymentMethod} onChange={(e) => setForm({ ...form, paymentMethod: e.target.value })} style={inputStyle}>
              <option value="COD">Cash on delivery</option>
              <option value="Card">Card</option>
            </select>
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
