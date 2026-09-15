import Badge from '../../../components/ui/Badge';

const styles = {
  page: {
    background: '#ffffff',
    border: '1px solid #e2e8f0',
    borderRadius: '22px',
    padding: '1.5rem',
    boxShadow: '0 12px 24px rgba(15, 23, 42, 0.05)',
  },

  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '1rem',
    flexWrap: 'wrap',
    marginBottom: '1.25rem',
  },

  title: {
    margin: 0,
    color: '#0f172a',
    fontSize: '1.5rem',
    fontWeight: 800,
  },

  subtitle: {
    margin: '0.35rem 0 0',
    color: '#64748b',
    fontSize: '0.9rem',
  },

  ordersList: {
    display: 'grid',
    gap: '1rem',
  },

  orderCard: {
    border: '1px solid #e2e8f0',
    borderRadius: '18px',
    padding: '1.15rem',
    background: '#ffffff',
    transition: 'box-shadow 0.2s ease',
  },

  orderHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '1rem',
    flexWrap: 'wrap',
  },

  orderId: {
    margin: 0,
    color: '#0f172a',
    fontSize: '1rem',
    fontWeight: 700,
  },

  date: {
    marginTop: '0.35rem',
    color: '#64748b',
    fontSize: '0.85rem',
  },

  items: {
    marginTop: '1rem',
    paddingTop: '1rem',
    borderTop: '1px solid #e2e8f0',
    display: 'grid',
    gap: '0.65rem',
  },

  item: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '1rem',
    color: '#475569',
    fontSize: '0.95rem',
  },

  itemName: {
    color: '#334155',
  },

  itemPrice: {
    color: '#0f172a',
    fontWeight: 600,
    whiteSpace: 'nowrap',
  },

  total: {
    marginTop: '1rem',
    paddingTop: '1rem',
    borderTop: '1px solid #e2e8f0',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '1rem',
  },

  totalLabel: {
    color: '#475569',
    fontWeight: 600,
  },

  totalValue: {
    color: '#0f172a',
    fontSize: '1.1rem',
    fontWeight: 800,
  },

  empty: {
    background: '#ffffff',
    border: '1px solid #e2e8f0',
    borderRadius: '18px',
    padding: '3rem 2rem',
    textAlign: 'center',
    boxShadow: '0 12px 24px rgba(15, 23, 42, 0.04)',
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
  },
};

export default function OrdersPage({ orders }) {
  if (!orders.length) {
    return (
      <div style={styles.empty}>
        <div style={styles.emptyIcon}>⌁</div>

        <h2 style={styles.emptyTitle}>
          No orders yet
        </h2>

        <p style={styles.emptyText}>
          Your orders will appear here once you place your first order.
        </p>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <div>
          <h2 style={styles.title}>My Orders</h2>

          <p style={styles.subtitle}>
            Track your recent orders and their current status.
          </p>
        </div>

        <Badge tone="success">
          {orders.length} {orders.length === 1 ? 'Order' : 'Orders'}
        </Badge>
      </div>

      <div style={styles.ordersList}>
        {orders.map((order) => (
          <div
            key={order.id || order._id}
            style={styles.orderCard}
          >
            <div style={styles.orderHeader}>
              <div>
                <h3 style={styles.orderId}>
                  Order #{order.id}
                </h3>

                <div style={styles.date}>
                  {new Date(order.createdAt).toLocaleDateString()}
                </div>
              </div>

              <Badge
                tone={
                  order.status === 'Delivered'
                    ? 'success'
                    : order.status === 'Cancelled'
                      ? 'danger'
                      : 'warning'
                }
              >
                {order.status}
              </Badge>
            </div>

            <div style={styles.items}>
              {(order.items || []).map((item) => (
                <div
                  key={`${order.id}-${item.productId}`}
                  style={styles.item}
                >
                  <span style={styles.itemName}>
                    {item.productName} × {item.quantity}
                  </span>

                  <span style={styles.itemPrice}>
                    ${item.price * item.quantity}
                  </span>
                </div>
              ))}
            </div>

            <div style={styles.total}>
              <span style={styles.totalLabel}>
                Order Total
              </span>

              <span style={styles.totalValue}>
                ${order.total}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}