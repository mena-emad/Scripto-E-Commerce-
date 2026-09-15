import { Link } from 'react-router-dom';
import Button from '../../../components/ui/Button';

const styles = {
  layout: {
    display: 'grid',
    gridTemplateColumns: '1.4fr 0.6fr',
    gap: '1.25rem',
  },

  card: {
    background: '#ffffff',
    border: '1px solid #e2e8f0',
    borderRadius: '22px',
    padding: '1.25rem',
    boxShadow: '0 12px 24px rgba(15, 23, 42, 0.05)',
  },

  item: {
    display: 'grid',
    gridTemplateColumns: '1fr auto auto',
    gap: '1.25rem',
    alignItems: 'center',
    padding: '1.15rem 0',
    borderBottom: '1px solid #e2e8f0',
  },

  itemInfo: {
    minWidth: 0,
  },

  itemName: {
    margin: '0 0 0.4rem',
    color: '#0f172a',
    fontSize: '1rem',
    fontWeight: 700,
  },

  itemPrice: {
    color: '#64748b',
    fontSize: '0.9rem',
  },

  quantityControl: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.25rem',
    background: '#f1f5f9',
    border: '1px solid #e2e8f0',
    borderRadius: '10px',
  },

  quantityButton: {
    width: '30px',
    height: '30px',
    borderRadius: '8px',
    border: '1px solid #cbd5e1',
    background: '#ffffff',
    color: '#0f172a',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: 700,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  quantity: {
    minWidth: '28px',
    textAlign: 'center',
    color: '#0f172a',
    fontWeight: 700,
  },

  itemActions: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  },

  itemTotal: {
    color: '#0f172a',
    fontWeight: 800,
    whiteSpace: 'nowrap',
  },

  removeButton: {
    background: 'transparent',
    border: 'none',
    color: '#dc2626',
    cursor: 'pointer',
    fontWeight: 700,
    padding: 0,
  },

  summary: {
    background: '#ffffff',
    border: '1px solid #e2e8f0',
    borderRadius: '22px',
    padding: '1.25rem',
    height: 'fit-content',
    boxShadow: '0 12px 24px rgba(15, 23, 42, 0.05)',
  },

  summaryTitle: {
    margin: '0 0 1.25rem',
    color: '#0f172a',
    fontSize: '1.15rem',
    fontWeight: 800,
  },

  summaryRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '1rem',
    marginBottom: '0.8rem',
    color: '#475569',
  },

  summaryValue: {
    color: '#0f172a',
    fontWeight: 600,
  },

  divider: {
    border: 0,
    borderTop: '1px solid #e2e8f0',
    margin: '1rem 0',
  },

  totalRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '1rem',
    marginBottom: '1.25rem',
  },

  totalLabel: {
    color: '#0f172a',
    fontSize: '1.05rem',
    fontWeight: 700,
  },

  totalValue: {
    color: '#0f172a',
    fontSize: '1.25rem',
    fontWeight: 800,
  },

  empty: {
    background: '#ffffff',
    border: '1px solid #e2e8f0',
    borderRadius: '22px',
    padding: '3rem 2rem',
    textAlign: 'center',
    boxShadow: '0 12px 24px rgba(15, 23, 42, 0.04)',
  },

  emptyIcon: {
    width: '60px',
    height: '60px',
    margin: '0 auto 1rem',
    borderRadius: '18px',
    background: '#eff6ff',
    color: '#2563eb',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.5rem',
    fontWeight: 800,
  },

  emptyTitle: {
    margin: '0 0 0.5rem',
    color: '#0f172a',
    fontSize: '1.3rem',
  },

  emptyText: {
    margin: '0 0 1.25rem',
    color: '#64748b',
    lineHeight: 1.6,
  },
};

export default function CartPage({
  items,
  total = 0,
  onRemove,
  onQuantityChange,
}) {
  if (!items.length) {
    return (
      <div style={styles.empty}>
        <div style={styles.emptyIcon}>🛒</div>

        <h2 style={styles.emptyTitle}>
          Your cart is empty
        </h2>

        <p style={styles.emptyText}>
          Browse our approved products and add items to your cart.
        </p>

        <Link to="/products">
          <Button>Explore products</Button>
        </Link>
      </div>
    );
  }

  return (
    <div
      style={styles.layout}
      className="responsive-two-column"
    >
      {/* Cart Items */}
      <div style={styles.card}>
        {items.map((item) => (
          <div
            key={item.productId}
            style={styles.item}
          >
            <div style={styles.itemInfo}>
              <h3 style={styles.itemName}>
                {item.productName}
              </h3>

              <div style={styles.itemPrice}>
                ${item.price} each
              </div>
            </div>

            <div style={styles.quantityControl}>
              <button
                onClick={() =>
                  onQuantityChange(
                    item.productId,
                    item.quantity - 1
                  )
                }
                style={styles.quantityButton}
                aria-label={`Decrease ${item.productName} quantity`}
              >
                −
              </button>

              <span style={styles.quantity}>
                {item.quantity}
              </span>

              <button
                onClick={() =>
                  onQuantityChange(
                    item.productId,
                    item.quantity + 1
                  )
                }
                style={styles.quantityButton}
                aria-label={`Increase ${item.productName} quantity`}
              >
                +
              </button>
            </div>

            <div style={styles.itemActions}>
              <strong style={styles.itemTotal}>
                ${item.price * item.quantity}
              </strong>

              <button
                onClick={() => onRemove(item.productId)}
                style={styles.removeButton}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Order Summary */}
      <aside style={styles.summary}>
        <h3 style={styles.summaryTitle}>
          Order Summary
        </h3>

        <div style={styles.summaryRow}>
          <span>Subtotal</span>
          <strong style={styles.summaryValue}>
            ${total}
          </strong>
        </div>

        <div style={styles.summaryRow}>
          <span>Shipping</span>
          <strong style={styles.summaryValue}>
            $0
          </strong>
        </div>

        <hr style={styles.divider} />

        <div style={styles.totalRow}>
          <span style={styles.totalLabel}>
            Total
          </span>

          <strong style={styles.totalValue}>
            ${total}
          </strong>
        </div>

        <Link to="/checkout">
          <Button fullWidth>
            Proceed to checkout
          </Button>
        </Link>
      </aside>
    </div>
  );
}