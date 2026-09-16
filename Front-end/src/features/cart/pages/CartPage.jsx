import { Link } from 'react-router-dom';
import Button from '../../../components/ui/Button';

const styles = {
  layout: {
    display: 'grid',
    gridTemplateColumns: '1.4fr 0.6fr',
    gap: '1.25rem',
    width: '100%',
    minWidth: 0,
    boxSizing: 'border-box',
  },

  card: {
    background: '#ffffff',
    border: '1px solid #e2e8f0',
    borderRadius: '22px',
    padding: '1.25rem',
    boxShadow: '0 12px 24px rgba(15, 23, 42, 0.05)',
    minWidth: 0,
    boxSizing: 'border-box',
  },

  item: {
    display: 'grid',
    gridTemplateColumns: 'minmax(0, 1fr) auto auto',
    gap: '1.25rem',
    alignItems: 'center',
    padding: '1.15rem 0',
    borderBottom: '1px solid #e2e8f0',
    minWidth: 0,
  },

  itemInfo: {
    minWidth: 0,
  },

  itemName: {
    margin: '0 0 0.4rem',
    color: '#0f172a',
    fontSize: '1rem',
    fontWeight: 700,
    overflowWrap: 'anywhere',
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
    flexShrink: 0,
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
    flexShrink: 0,
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
    flexShrink: 0,
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
    whiteSpace: 'nowrap',
  },

  summary: {
    background: '#ffffff',
    border: '1px solid #e2e8f0',
    borderRadius: '22px',
    padding: '1.25rem',
    height: 'fit-content',
    boxShadow: '0 12px 24px rgba(15, 23, 42, 0.05)',
    minWidth: 0,
    boxSizing: 'border-box',
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
    whiteSpace: 'nowrap',
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
    whiteSpace: 'nowrap',
  },

  empty: {
    background: '#ffffff',
    border: '1px solid #e2e8f0',
    borderRadius: '22px',
    padding: '3rem 2rem',
    textAlign: 'center',
    boxShadow: '0 12px 24px rgba(15, 23, 42, 0.04)',
    boxSizing: 'border-box',
    width: '100%',
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
      <>
        <style>
          {`
            .cart-empty {
              width: 100%;
              min-width: 0;
            }

            @media (max-width: 500px) {
              .cart-empty {
                padding: 2rem 1rem !important;
                border-radius: 16px !important;
              }

              .cart-empty-title {
                font-size: 1.15rem !important;
              }

              .cart-empty-text {
                font-size: 0.9rem;
              }
            }
          `}
        </style>

        <div
          className="cart-empty"
          style={styles.empty}
        >
          <div style={styles.emptyIcon}>
            🛒
          </div>

          <h2
            className="cart-empty-title"
            style={styles.emptyTitle}
          >
            Your cart is empty
          </h2>

          <p
            className="cart-empty-text"
            style={styles.emptyText}
          >
            Browse our approved products and add items to your
            cart.
          </p>

          <Link to="/products">
            <Button>
              Explore products
            </Button>
          </Link>
        </div>
      </>
    );
  }

  return (
    <>
      <style>
        {`
          .cart-layout {
            width: 100%;
            min-width: 0;
            box-sizing: border-box;
          }

          .cart-items-card {
            min-width: 0;
            overflow: hidden;
          }

          .cart-item {
            min-width: 0;
          }

          .cart-item:last-child {
            border-bottom: none !important;
          }

          .cart-item-info {
            min-width: 0;
          }

          .cart-item-name {
            overflow-wrap: anywhere;
            word-break: break-word;
          }

          .cart-item-actions {
            min-width: 0;
          }

          .cart-summary {
            min-width: 0;
          }

          @media (max-width: 1000px) {
            .cart-layout {
              grid-template-columns: 1fr !important;
            }

            .cart-summary {
              width: 100%;
            }
          }

          @media (max-width: 650px) {
            .cart-items-card {
              padding: 1rem !important;
            }

            .cart-item {
              grid-template-columns: minmax(0, 1fr) auto !important;
              gap: 0.85rem !important;
              align-items: center !important;
            }

            .cart-item-quantity {
              grid-column: 2;
              grid-row: 1;
            }

            .cart-item-actions {
              grid-column: 1 / -1;
              grid-row: 2;
              width: 100%;
              display: flex !important;
              justify-content: space-between !important;
              align-items: center !important;
              padding-top: 0.25rem;
            }

            .cart-item-total {
              font-size: 1rem;
            }

            .cart-summary {
              padding: 1rem !important;
              border-radius: 18px !important;
            }
          }

          @media (max-width: 420px) {
            .cart-items-card {
              padding: 0.85rem !important;
              border-radius: 16px !important;
            }

            .cart-item {
              gap: 0.65rem !important;
              padding: 1rem 0 !important;
            }

            .cart-item-name {
              font-size: 0.95rem !important;
            }

            .cart-item-price {
              font-size: 0.8rem !important;
            }

            .cart-item-quantity {
              transform: scale(0.9);
              transform-origin: right center;
            }

            .cart-summary {
              border-radius: 16px !important;
            }

            .cart-summary-title {
              font-size: 1.05rem !important;
            }

            .cart-total-value {
              font-size: 1.1rem !important;
            }
          }
        `}
      </style>

      <div
        style={styles.layout}
        className="responsive-two-column cart-layout"
      >
        {/* Cart Items */}
        <div
          style={styles.card}
          className="cart-items-card"
        >
          {items.map((item) => (
            <div
              key={item.productId}
              style={styles.item}
              className="cart-item"
            >
              <div
                style={styles.itemInfo}
                className="cart-item-info"
              >
                <h3
                  style={styles.itemName}
                  className="cart-item-name"
                >
                  {item.productName}
                </h3>

                <div
                  style={styles.itemPrice}
                  className="cart-item-price"
                >
                  ${item.price} each
                </div>
              </div>

              <div
                style={styles.quantityControl}
                className="cart-item-quantity"
              >
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

              <div
                style={styles.itemActions}
                className="cart-item-actions"
              >
                <strong
                  style={styles.itemTotal}
                  className="cart-item-total"
                >
                  ${item.price * item.quantity}
                </strong>

                <button
                  onClick={() =>
                    onRemove(item.productId)
                  }
                  style={styles.removeButton}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <aside
          style={styles.summary}
          className="cart-summary"
        >
          <h3
            style={styles.summaryTitle}
            className="cart-summary-title"
          >
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

            <strong
              style={styles.totalValue}
              className="cart-total-value"
            >
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
    </>
  );
}