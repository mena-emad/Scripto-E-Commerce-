import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';

export default function CheckoutPage({ cartItems, total = 0, onPlaceOrder }) {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    shippingAddress: '',
    paymentMethod: 'COD'
  });

  const [cardData, setCardData] = useState({
    cardName: '',
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    // Card data is only used for frontend validation.
    // It is NOT sent to the backend.
    const orderData = {
      shippingAddress: form.shippingAddress,
      paymentMethod: form.paymentMethod
    };

    onPlaceOrder(orderData)
      .then(() => navigate('/orders'))
      .catch(() => {});
  };

  const handleFormChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleCardChange = (e) => {
    setCardData({
      ...cardData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div
      style={styles.layout}
      className="responsive-two-column"
    >
      <form onSubmit={handleSubmit} style={styles.card}>
        <div style={styles.header}>
          <div>
            <span style={styles.eyebrow}>Secure checkout</span>
            <h2 style={styles.title}>Checkout</h2>
            <p style={styles.subtitle}>
              Enter your shipping and payment information to complete your order.
            </p>
          </div>

          <div style={styles.stepBadge}>
            1 of 1
          </div>
        </div>

        <div style={styles.section}>
          <div style={styles.sectionHeader}>
            <h3 style={styles.sectionTitle}>Shipping information</h3>
            <span style={styles.requiredText}>Required</span>
          </div>

          <label style={styles.field}>
            <span style={styles.label}>Shipping address</span>

            <textarea
              required
              name="shippingAddress"
              value={form.shippingAddress}
              onChange={handleFormChange}
              placeholder="Enter your full shipping address"
              rows={4}
              style={styles.textarea}
            />
          </label>
        </div>

        <div style={styles.section}>
          <div style={styles.sectionHeader}>
            <h3 style={styles.sectionTitle}>Payment method</h3>
          </div>

          <label style={styles.field}>
            <span style={styles.label}>Payment</span>

            <select
              name="paymentMethod"
              value={form.paymentMethod}
              onChange={handleFormChange}
              style={styles.input}
            >
              <option value="COD">Cash on delivery</option>
              <option value="Card">Card</option>
            </select>
          </label>
        </div>

        {form.paymentMethod === 'Card' && (
          <div style={styles.cardPayment}>
            <div style={styles.cardPaymentHeader}>
              <div>
                <h3 style={styles.sectionTitle}>Card details</h3>
                <p style={styles.cardHint}>
                  Demo payment information only. It will not be sent to the backend.
                </p>
              </div>

              <div style={styles.demoBadge}>
                DEMO
              </div>
            </div>

            <div style={styles.cardGrid}>
              <label style={{ ...styles.field, gridColumn: '1 / -1' }}>
                <span style={styles.label}>Cardholder name</span>

                <input
                  required
                  name="cardName"
                  value={cardData.cardName}
                  onChange={handleCardChange}
                  placeholder="John Doe"
                  style={styles.input}
                />
              </label>

              <label style={{ ...styles.field, gridColumn: '1 / -1' }}>
                <span style={styles.label}>Card number</span>

                <input
                  required
                  name="cardNumber"
                  value={cardData.cardNumber}
                  onChange={handleCardChange}
                  placeholder="4242 4242 4242 4242"
                  inputMode="numeric"
                  maxLength={19}
                  style={styles.input}
                />
              </label>

              <label style={styles.field}>
                <span style={styles.label}>Expiry date</span>

                <input
                  required
                  name="expiryDate"
                  value={cardData.expiryDate}
                  onChange={handleCardChange}
                  placeholder="MM/YY"
                  maxLength={5}
                  style={styles.input}
                />
              </label>

              <label style={styles.field}>
                <span style={styles.label}>CVV</span>

                <input
                  required
                  type="password"
                  name="cvv"
                  value={cardData.cvv}
                  onChange={handleCardChange}
                  placeholder="123"
                  inputMode="numeric"
                  maxLength={4}
                  style={styles.input}
                />
              </label>
            </div>
          </div>
        )}

        <div style={styles.actions}>
          <Button type="submit">
            Place order
          </Button>
        </div>
      </form>

      <aside style={styles.summaryCard}>
        <div style={styles.summaryHeader}>
          <div>
            <span style={styles.eyebrow}>Order review</span>
            <h3 style={styles.summaryTitle}>Summary</h3>
          </div>

          <span style={styles.itemsBadge}>
            {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'}
          </span>
        </div>

        <div style={styles.items}>
          {cartItems.map((item) => (
            <div
              key={item.productId}
              style={styles.item}
            >
              <div style={styles.itemInfo}>
                <strong style={styles.itemName}>
                  {item.productName}
                </strong>

                <span style={styles.itemQuantity}>
                  Quantity: {item.quantity}
                </span>
              </div>

              <strong style={styles.itemPrice}>
                ${item.price * item.quantity}
              </strong>
            </div>
          ))}
        </div>

        <div style={styles.divider} />

        <div style={styles.totalRow}>
          <span>Subtotal</span>
          <span>${total}</span>
        </div>

        <div style={styles.totalRow}>
          <span>Shipping</span>
          <span style={styles.free}>FREE</span>
        </div>

        <div style={styles.divider} />

        <div style={styles.grandTotal}>
          <span>Total</span>
          <strong>${total}</strong>
        </div>

        <div style={styles.securityBox}>
          <span style={styles.securityIcon}>✓</span>

          <div>
            <strong style={styles.securityTitle}>
              Secure checkout
            </strong>

            <p style={styles.securityText}>
              Your demo card information is used only for frontend validation.
            </p>
          </div>
        </div>
      </aside>
    </div>
  );
}

const styles = {
  layout: {
    display: 'grid',
    gridTemplateColumns: '1fr 0.75fr',
    gap: '1.25rem',
    alignItems: 'start'
  },

  card: {
    background: '#ffffff',
    border: '1px solid #e2e8f0',
    borderRadius: '20px',
    padding: '1.5rem',
    boxShadow: '0 12px 30px rgba(15, 23, 42, 0.06)'
  },

  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: '1rem',
    paddingBottom: '1.25rem',
    borderBottom: '1px solid #e2e8f0'
  },

  eyebrow: {
    display: 'block',
    color: '#2563eb',
    fontSize: '0.78rem',
    fontWeight: 800,
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
    marginBottom: '0.35rem'
  },

  title: {
    margin: 0,
    color: '#0f172a',
    fontSize: '1.65rem'
  },

  subtitle: {
    margin: '0.4rem 0 0',
    color: '#64748b',
    lineHeight: 1.6,
    fontSize: '0.92rem'
  },

  stepBadge: {
    background: '#eff6ff',
    color: '#2563eb',
    border: '1px solid #bfdbfe',
    borderRadius: '999px',
    padding: '0.4rem 0.75rem',
    fontSize: '0.78rem',
    fontWeight: 700
  },

  section: {
    marginTop: '1.4rem'
  },

  sectionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '1rem',
    marginBottom: '0.9rem'
  },

  sectionTitle: {
    margin: 0,
    color: '#0f172a',
    fontSize: '1rem'
  },

  requiredText: {
    color: '#64748b',
    fontSize: '0.78rem'
  },

  field: {
    display: 'block'
  },

  label: {
    display: 'block',
    marginBottom: '0.4rem',
    color: '#334155',
    fontSize: '0.88rem',
    fontWeight: 700
  },

  input: {
    width: '100%',
    boxSizing: 'border-box',
    padding: '0.8rem 0.9rem',
    borderRadius: '12px',
    border: '1px solid #cbd5e1',
    background: '#f8fafc',
    color: '#0f172a',
    fontSize: '0.95rem',
    outline: 'none'
  },

  textarea: {
    width: '100%',
    boxSizing: 'border-box',
    padding: '0.8rem 0.9rem',
    borderRadius: '12px',
    border: '1px solid #cbd5e1',
    background: '#f8fafc',
    color: '#0f172a',
    fontSize: '0.95rem',
    outline: 'none',
    resize: 'vertical',
    fontFamily: 'inherit'
  },

  cardPayment: {
    marginTop: '1.4rem',
    padding: '1.1rem',
    borderRadius: '16px',
    border: '1px solid #bfdbfe',
    background: '#eff6ff'
  },

  cardPaymentHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: '1rem',
    marginBottom: '1rem'
  },

  cardHint: {
    margin: '0.35rem 0 0',
    color: '#475569',
    fontSize: '0.82rem',
    lineHeight: 1.5
  },

  demoBadge: {
    background: '#dbeafe',
    color: '#1d4ed8',
    borderRadius: '8px',
    padding: '0.35rem 0.55rem',
    fontSize: '0.7rem',
    fontWeight: 800
  },

  cardGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '0.9rem'
  },

  actions: {
    marginTop: '1.5rem',
    paddingTop: '1.2rem',
    borderTop: '1px solid #e2e8f0'
  },

  summaryCard: {
    background: '#ffffff',
    border: '1px solid #e2e8f0',
    borderRadius: '20px',
    padding: '1.35rem',
    height: 'fit-content',
    boxShadow: '0 12px 30px rgba(15, 23, 42, 0.06)'
  },

  summaryHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: '1rem'
  },

  summaryTitle: {
    margin: 0,
    color: '#0f172a',
    fontSize: '1.3rem'
  },

  itemsBadge: {
    background: '#f1f5f9',
    color: '#475569',
    borderRadius: '999px',
    padding: '0.4rem 0.7rem',
    fontSize: '0.78rem',
    fontWeight: 700
  },

  items: {
    marginTop: '1.2rem',
    display: 'grid',
    gap: '0.9rem'
  },

  item: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '1rem'
  },

  itemInfo: {
    display: 'grid',
    gap: '0.2rem'
  },

  itemName: {
    color: '#0f172a',
    fontSize: '0.9rem'
  },

  itemQuantity: {
    color: '#64748b',
    fontSize: '0.78rem'
  },

  itemPrice: {
    color: '#0f172a',
    whiteSpace: 'nowrap'
  },

  divider: {
    height: '1px',
    background: '#e2e8f0',
    margin: '1rem 0'
  },

  totalRow: {
    display: 'flex',
    justifyContent: 'space-between',
    color: '#475569',
    fontSize: '0.9rem',
    marginBottom: '0.65rem'
  },

  free: {
    color: '#16a34a',
    fontWeight: 800
  },

  grandTotal: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: '#0f172a',
    fontSize: '1.1rem'
  },

  securityBox: {
    display: 'flex',
    gap: '0.7rem',
    marginTop: '1.2rem',
    padding: '0.9rem',
    borderRadius: '12px',
    background: '#f0fdf4',
    border: '1px solid #bbf7d0'
  },

  securityIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '24px',
    height: '24px',
    borderRadius: '50%',
    background: '#16a34a',
    color: '#ffffff',
    fontSize: '0.75rem',
    fontWeight: 800,
    flexShrink: 0
  },

  securityTitle: {
    display: 'block',
    color: '#166534',
    fontSize: '0.82rem'
  },

  securityText: {
    margin: '0.2rem 0 0',
    color: '#15803d',
    fontSize: '0.75rem',
    lineHeight: 1.4
  }
};