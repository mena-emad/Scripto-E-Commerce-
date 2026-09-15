import { Link } from 'react-router-dom';
import Button from '../../../components/ui/Button';

export default function CartPage({ items, total = 0, onRemove, onQuantityChange }) {

  if (!items.length) {
    return (
      <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '18px', padding: '2rem', textAlign: 'center' }}>
        <h2>Your cart is empty</h2>
        <p style={{ color: '#64748b' }}>Browse our approved products and add items to your cart.</p>
        <Link to="/products"><Button>Explore products</Button></Link>
      </div>
    );
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 0.6fr', gap: '1.2rem' }} className="responsive-two-column">
      <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '18px', padding: '1.25rem' }}>
        {items.map((item) => (
          <div key={item.productId} style={{ display: 'grid', gridTemplateColumns: '1fr auto auto', gap: '1rem', alignItems: 'center', borderBottom: '1px solid #e2e8f0', padding: '1rem 0' }}>
            <div>
              <h3 style={{ margin: '0 0 0.35rem' }}>{item.productName}</h3>
              <div style={{ color: '#64748b' }}>${item.price} each</div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <button onClick={() => onQuantityChange(item.productId, item.quantity - 1)} style={{ width: '28px', height: '28px', borderRadius: '8px', border: '1px solid #cbd5e1', background: '#fff', cursor: 'pointer' }}>-</button>
              <span style={{ minWidth: '24px', textAlign: 'center', fontWeight: 700 }}>{item.quantity}</span>
              <button onClick={() => onQuantityChange(item.productId, item.quantity + 1)} style={{ width: '28px', height: '28px', borderRadius: '8px', border: '1px solid #cbd5e1', background: '#fff', cursor: 'pointer' }}>+</button>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <strong>${item.price * item.quantity}</strong>
              <button onClick={() => onRemove(item.productId)} style={{ background: 'transparent', border: 'none', color: '#dc2626', cursor: 'pointer', fontWeight: 700 }}>Remove</button>
            </div>
          </div>
        ))}
      </div>

      <aside style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '18px', padding: '1.25rem', height: 'fit-content' }}>
        <h3 style={{ marginTop: 0 }}>Order summary</h3>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.6rem' }}>
          <span>Subtotal</span>
          <strong>${total}</strong>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.6rem' }}>
          <span>Shipping</span>
          <strong>$0</strong>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', fontSize: '1.1rem' }}>
          <span>Total</span>
          <strong>${total}</strong>
        </div>
        <Link to="/checkout"><Button fullWidth>Proceed to checkout</Button></Link>
      </aside>
    </div>
  );
}
