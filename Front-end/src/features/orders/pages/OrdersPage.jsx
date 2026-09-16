import Badge from '../../../components/ui/Badge';

const styles = {
  page: {
    width: '100%',
    background: '#ffffff',
    border: '1px solid #e2e8f0',
    borderRadius: '22px',
    padding: '1.5rem',
    boxShadow: '0 12px 24px rgba(15, 23, 42, 0.05)',
    boxSizing: 'border-box',
    minWidth: 0,
  },

  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '1rem',
    flexWrap: 'wrap',
    marginBottom: '1.25rem',
    minWidth: 0,
  },

  headerContent: {
    minWidth: 0,
    flex: 1,
  },

  title: {
    margin: 0,
    color: '#0f172a',
    fontSize: '1.5rem',
    fontWeight: 800,
    overflowWrap: 'anywhere',
  },

  subtitle: {
    margin: '0.35rem 0 0',
    color: '#64748b',
    fontSize: '0.9rem',
    lineHeight: 1.5,
    overflowWrap: 'anywhere',
  },

  ordersList: {
    display: 'grid',
    gap: '1rem',
    minWidth: 0,
  },

  orderCard: {
    border: '1px solid #e2e8f0',
    borderRadius: '18px',
    padding: '1.15rem',
    background: '#ffffff',
    transition: 'box-shadow 0.2s ease',
    minWidth: 0,
    boxSizing: 'border-box',
    overflow: 'hidden',
  },

  orderHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '1rem',
    flexWrap: 'wrap',
    minWidth: 0,
  },

  orderHeaderInfo: {
    minWidth: 0,
    flex: 1,
  },

  orderId: {
    margin: 0,
    color: '#0f172a',
    fontSize: '1rem',
    fontWeight: 700,
    overflowWrap: 'anywhere',
    wordBreak: 'break-word',
  },

  date: {
    marginTop: '0.35rem',
    color: '#64748b',
    fontSize: '0.85rem',
  },

  statusBadge: {
    flexShrink: 0,
  },

  items: {
    marginTop: '1rem',
    paddingTop: '1rem',
    borderTop: '1px solid #e2e8f0',
    display: 'grid',
    gap: '0.65rem',
    minWidth: 0,
  },

  item: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '1rem',
    color: '#475569',
    fontSize: '0.95rem',
    minWidth: 0,
  },

  itemName: {
    color: '#334155',
    minWidth: 0,
    overflowWrap: 'anywhere',
    wordBreak: 'break-word',
  },

  itemPrice: {
    color: '#0f172a',
    fontWeight: 600,
    whiteSpace: 'nowrap',
    flexShrink: 0,
  },

  total: {
    marginTop: '1rem',
    paddingTop: '1rem',
    borderTop: '1px solid #e2e8f0',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '1rem',
    minWidth: 0,
  },

  totalLabel: {
    color: '#475569',
    fontWeight: 600,
  },

  totalValue: {
    color: '#0f172a',
    fontSize: '1.1rem',
    fontWeight: 800,
    whiteSpace: 'nowrap',
  },

  empty: {
    width: '100%',
    background: '#ffffff',
    border: '1px solid #e2e8f0',
    borderRadius: '18px',
    padding: '3rem 2rem',
    textAlign: 'center',
    boxShadow: '0 12px 24px rgba(15, 23, 42, 0.04)',
    boxSizing: 'border-box',
    minWidth: 0,
  },

  emptyIcon: {
    width: '56px',
    height: '56px',
    margin: '0 auto 1rem',
    borderRadius: '16px',
    background: '#eff6ff',
    color: '#2563eb',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.5rem',
    fontWeight: 800,
  },

  emptyTitle: {
    margin: 0,
    color: '#0f172a',
    fontSize: '1.2rem',
  },

  emptyText: {
    margin: '0.5rem 0 0',
    color: '#64748b',
    lineHeight: 1.5,
    overflowWrap: 'anywhere',
  },
};

export default function OrdersPage({ orders }) {
  if (!orders.length) {
    return (
      <>
        <div
          style={styles.empty}
          className="orders-empty"
        >
          <div style={styles.emptyIcon}>
            ⌁
          </div>

          <h2 style={styles.emptyTitle}>
            No orders yet
          </h2>

          <p style={styles.emptyText}>
            Your orders will appear here once
            you place your first order.
          </p>
        </div>

        <style>{`
          .orders-empty {
            min-width: 0;
          }

          @media (max-width: 500px) {
            .orders-empty {
              padding: 2.25rem 1.25rem !important;
              border-radius: 16px !important;
            }

            .orders-empty h2 {
              font-size: 1.1rem !important;
            }

            .orders-empty p {
              font-size: 0.85rem !important;
            }
          }

          @media (max-width: 350px) {
            .orders-empty {
              padding: 2rem 0.9rem !important;
            }
          }
        `}</style>
      </>
    );
  }

  return (
    <>
      <div
        style={styles.page}
        className="orders-page"
      >
        {/* Header */}
        <div style={styles.header}>
          <div style={styles.headerContent}>
            <h2 style={styles.title}>
              My Orders
            </h2>

            <p style={styles.subtitle}>
              Track your recent orders and their
              current status.
            </p>
          </div>

          <div className="orders-count">
            <Badge tone="success">
              {orders.length}{' '}
              {orders.length === 1
                ? 'Order'
                : 'Orders'}
            </Badge>
          </div>
        </div>

        {/* Orders */}
        <div style={styles.ordersList}>
          {orders.map((order) => (
            <div
              key={order.id || order._id}
              style={styles.orderCard}
              className="order-card"
            >
              {/* Order Header */}
              <div style={styles.orderHeader}>
                <div style={styles.orderHeaderInfo}>
                  <h3 style={styles.orderId}>
                    Order #{order.id}
                  </h3>

                  <div style={styles.date}>
                    {new Date(
                      order.createdAt
                    ).toLocaleDateString()}
                  </div>
                </div>

                <div style={styles.statusBadge}>
                  <Badge
                    tone={
                      order.status ===
                      'Delivered'
                        ? 'success'
                        : order.status ===
                            'Cancelled'
                          ? 'danger'
                          : 'warning'
                    }
                  >
                    {order.status}
                  </Badge>
                </div>
              </div>

              {/* Items */}
              <div style={styles.items}>
                {(order.items || []).map(
                  (item) => (
                    <div
                      key={`${order.id}-${item.productId}`}
                      style={styles.item}
                      className="order-item"
                    >
                      <span
                        style={styles.itemName}
                      >
                        {item.productName} ×{' '}
                        {item.quantity}
                      </span>

                      <span
                        style={styles.itemPrice}
                      >
                        $
                        {item.price *
                          item.quantity}
                      </span>
                    </div>
                  )
                )}
              </div>

              {/* Total */}
              <div
                style={styles.total}
                className="order-total"
              >
                <span style={styles.totalLabel}>
                  Order Total
                </span>

                <span
                  style={styles.totalValue}
                >
                  ${order.total}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .orders-page {
          min-width: 0;
          overflow: hidden;
        }

        .order-card {
          min-width: 0;
        }

        .order-item {
          min-width: 0;
        }

        .order-total {
          min-width: 0;
        }

        .orders-count {
          flex-shrink: 0;
        }

        @media (max-width: 700px) {
          .orders-page {
            padding: 1.15rem !important;
            border-radius: 18px !important;
          }

          .order-card {
            padding: 1rem !important;
            border-radius: 16px !important;
          }

          .orders-page h2 {
            font-size: 1.35rem !important;
          }

          .orders-page .subtitle {
            font-size: 0.85rem !important;
          }
        }

        @media (max-width: 550px) {
          .orders-page {
            padding: 1rem !important;
          }

          .orders-page .header {
            align-items: flex-start !important;
            flex-direction: column !important;
            gap: 0.75rem !important;
          }

          .orders-count {
            align-self: flex-start;
          }

          .order-card {
            padding: 0.9rem !important;
          }

          .order-header {
            align-items: flex-start !important;
            flex-direction: column !important;
            gap: 0.7rem !important;
          }

          .status-badge {
            align-self: flex-start;
          }

          .order-item {
            align-items: flex-start !important;
            gap: 0.75rem !important;
          }

          .order-item-name {
            flex: 1;
          }

          .order-total {
            gap: 0.75rem !important;
          }

          .order-total-value {
            font-size: 1rem !important;
          }
        }

        @media (max-width: 420px) {
          .orders-page {
            padding: 0.85rem !important;
            border-radius: 16px !important;
          }

          .order-card {
            padding: 0.8rem !important;
            border-radius: 14px !important;
          }

          .orders-page h2 {
            font-size: 1.2rem !important;
          }

          .orders-page .subtitle {
            font-size: 0.8rem !important;
          }

          .order-item {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 0.3rem !important;
          }

          .order-item-price {
            align-self: flex-end;
          }

          .order-total {
            align-items: flex-start !important;
          }

          .order-total-value {
            font-size: 0.95rem !important;
          }
        }

        @media (max-width: 350px) {
          .orders-page {
            padding: 0.7rem !important;
          }

          .order-card {
            padding: 0.7rem !important;
          }

          .order-item {
            font-size: 0.85rem !important;
          }
        }
      `}</style>
    </>
  );
}