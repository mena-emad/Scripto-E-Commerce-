import { useState } from 'react';

export default function VendorOrdersPage({
  orders = [],
  onUpdateOrderStatus,
  accessError,
}) {
  const [busyId, setBusyId] = useState('');
  const [error, setError] = useState('');

  const updateStatus = async (id, status) => {
    try {
      setBusyId(id);
      setError('');

      await onUpdateOrderStatus(id, status);
    } catch (requestError) {
      setError(
        requestError?.response?.data?.message ||
          'Unable to update order status.'
      );
    } finally {
      setBusyId('');
    }
  };

  const getStatusStyle = (status) => {
    switch (status?.toLowerCase()) {
      case 'delivered':
        return {
          background: '#f0fdf4',
          color: '#15803d',
          border: '1px solid #bbf7d0',
        };

      case 'shipped':
        return {
          background: '#eff6ff',
          color: '#1d4ed8',
          border: '1px solid #bfdbfe',
        };

      case 'processing':
        return {
          background: '#fffbeb',
          color: '#b45309',
          border: '1px solid #fde68a',
        };

      case 'cancelled':
        return {
          background: '#fef2f2',
          color: '#b91c1c',
          border: '1px solid #fecaca',
        };

      case 'pending':
      default:
        return {
          background: '#f8fafc',
          color: '#475569',
          border: '1px solid #cbd5e1',
        };
    }
  };

  const styles = {
    page: {
      display: 'grid',
      gap: '1.25rem',
    },

    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
      gap: '1rem',
      flexWrap: 'wrap',
    },

    title: {
      margin: 0,
      color: '#0f172a',
      fontSize: '1.6rem',
      fontWeight: 800,
      letterSpacing: '-0.02em',
    },

    subtitle: {
      margin: '0.35rem 0 0',
      color: '#64748b',
      fontSize: '0.95rem',
    },

    count: {
      background: '#eff6ff',
      color: '#1d4ed8',
      border: '1px solid #dbeafe',
      padding: '0.45rem 0.75rem',
      borderRadius: '999px',
      fontSize: '0.8rem',
      fontWeight: 700,
    },

    alert: {
      borderRadius: '12px',
      padding: '0.85rem 1rem',
      fontSize: '0.9rem',
      lineHeight: 1.5,
    },

    warningAlert: {
      background: '#fffbeb',
      border: '1px solid #fde68a',
      color: '#92400e',
    },

    errorAlert: {
      background: '#fef2f2',
      border: '1px solid #fecaca',
      color: '#b91c1c',
    },

    orders: {
      display: 'grid',
      gap: '1rem',
    },

    orderCard: {
      background: '#ffffff',
      border: '1px solid #e2e8f0',
      borderRadius: '18px',
      padding: '1.1rem',
      boxShadow: '0 4px 14px rgba(15, 23, 42, 0.04)',
    },

    orderHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: '1rem',
      paddingBottom: '1rem',
      borderBottom: '1px solid #e2e8f0',
      flexWrap: 'wrap',
    },

    orderIdWrapper: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.7rem',
    },

    orderIcon: {
      width: '40px',
      height: '40px',
      display: 'grid',
      placeItems: 'center',
      background: '#eff6ff',
      color: '#1d4ed8',
      borderRadius: '10px',
      fontWeight: 800,
      fontSize: '0.85rem',
    },

    orderId: {
      margin: 0,
      color: '#0f172a',
      fontSize: '0.95rem',
      fontWeight: 800,
    },

    orderIdLabel: {
      margin: '0.2rem 0 0',
      color: '#94a3b8',
      fontSize: '0.75rem',
    },

    headerRight: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
      flexWrap: 'wrap',
    },

    statusSelect: {
      borderRadius: '9px',
      padding: '0.5rem 0.7rem',
      fontSize: '0.82rem',
      fontWeight: 700,
      outline: 'none',
      cursor: 'pointer',
    },

    summary: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
      gap: '0.75rem',
      padding: '1rem 0',
    },

    summaryItem: {
      background: '#f8fafc',
      border: '1px solid #e2e8f0',
      borderRadius: '12px',
      padding: '0.8rem',
    },

    summaryLabel: {
      color: '#64748b',
      fontSize: '0.75rem',
      fontWeight: 600,
      marginBottom: '0.3rem',
    },

    summaryValue: {
      color: '#0f172a',
      fontSize: '1rem',
      fontWeight: 800,
    },

    productsTitle: {
      margin: '0.2rem 0 0.7rem',
      color: '#334155',
      fontSize: '0.85rem',
      fontWeight: 700,
    },

    products: {
      display: 'grid',
      gap: '0.6rem',
    },

    product: {
      display: 'grid',
      gridTemplateColumns: 'minmax(0, 1fr) auto auto auto',
      alignItems: 'center',
      gap: '1rem',
      padding: '0.8rem',
      background: '#ffffff',
      border: '1px solid #e2e8f0',
      borderRadius: '12px',
    },

    productInfo: {
      minWidth: 0,
    },

    productName: {
      margin: 0,
      color: '#0f172a',
      fontSize: '0.9rem',
      fontWeight: 700,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    },

    productCategory: {
      margin: '0.25rem 0 0',
      color: '#64748b',
      fontSize: '0.75rem',
    },

    productMeta: {
      color: '#64748b',
      fontSize: '0.8rem',
      whiteSpace: 'nowrap',
    },

    productPrice: {
      color: '#334155',
      fontSize: '0.85rem',
      fontWeight: 600,
      whiteSpace: 'nowrap',
    },

    productTotal: {
      color: '#0f172a',
      fontSize: '0.9rem',
      fontWeight: 800,
      whiteSpace: 'nowrap',
    },

    empty: {
      background: '#ffffff',
      border: '1px solid #e2e8f0',
      borderRadius: '18px',
      padding: '3rem 1rem',
      textAlign: 'center',
    },

    emptyIcon: {
      width: '48px',
      height: '48px',
      display: 'grid',
      placeItems: 'center',
      margin: '0 auto 0.8rem',
      borderRadius: '12px',
      background: '#f1f5f9',
      color: '#64748b',
      fontWeight: 800,
    },

    emptyTitle: {
      margin: 0,
      color: '#334155',
      fontWeight: 700,
    },

    emptyText: {
      margin: '0.35rem 0 0',
      color: '#64748b',
      fontSize: '0.85rem',
    },
  };

  return (
    <div style={styles.page}>
      {/* Header */}
      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>Vendor Orders</h1>

          <p style={styles.subtitle}>
            Manage your orders and keep track of their status.
          </p>
        </div>

        <span style={styles.count}>
          {orders.length} {orders.length === 1 ? 'Order' : 'Orders'}
        </span>
      </div>

      {/* Access Error */}
      {accessError && (
        <div
          style={{
            ...styles.alert,
            ...styles.warningAlert,
          }}
        >
          {accessError}
        </div>
      )}

      {/* Request Error */}
      {error && (
        <div
          style={{
            ...styles.alert,
            ...styles.errorAlert,
          }}
        >
          {error}
        </div>
      )}

      {/* Orders */}
      {orders.length === 0 ? (
        <div style={styles.empty}>
          <div style={styles.emptyIcon}>📦</div>

          <p style={styles.emptyTitle}>No orders yet</p>

          <p style={styles.emptyText}>
            Orders containing your products will appear here.
          </p>
        </div>
      ) : (
        <div style={styles.orders}>
          {orders.map((order) => {
            const orderId = order._id || order.id;
            const statusStyle = getStatusStyle(order.status);

            return (
              <div key={orderId} style={styles.orderCard}>
                {/* Order Header */}
                <div style={styles.orderHeader}>
                  <div style={styles.orderIdWrapper}>
                    <div style={styles.orderIcon}>#</div>

                    <div>
                      <p style={styles.orderId}>
                        Order #{order.parentOrder}
                      </p>

                      <p style={styles.orderIdLabel}>
                        Vendor Order ID: {orderId}
                      </p>
                    </div>
                  </div>

                  <div style={styles.headerRight}>
                    <select
                      value={order.status || 'Pending'}
                      disabled={busyId === orderId}
                      onChange={(event) =>
                        updateStatus(orderId, event.target.value)
                      }
                      style={{
                        ...styles.statusSelect,
                        ...statusStyle,
                        opacity: busyId === orderId ? 0.6 : 1,
                      }}
                    >
                      {[
                        'Pending',
                        'Processing',
                        'Shipped',
                        'Delivered',
                        'Cancelled',
                      ].map((status) => (
                        <option key={status} value={status}>
                          {busyId === orderId && status === order.status
                            ? 'Updating...'
                            : status}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Order Summary */}
                <div style={styles.summary}>
                  <div style={styles.summaryItem}>
                    <div style={styles.summaryLabel}>
                      Products
                    </div>

                    <div style={styles.summaryValue}>
                      {order.products?.length || 0}
                    </div>
                  </div>

                  <div style={styles.summaryItem}>
                    <div style={styles.summaryLabel}>
                      Total Items
                    </div>

                    <div style={styles.summaryValue}>
                      {order.totalAmount || 0}
                    </div>
                  </div>

                  <div style={styles.summaryItem}>
                    <div style={styles.summaryLabel}>
                      Order Total
                    </div>

                    <div style={styles.summaryValue}>
                      ${Number(order.totalPrice || 0).toFixed(2)}
                    </div>
                  </div>
                </div>

                {/* Products */}
                <div>
                  <p style={styles.productsTitle}>
                    Order Items
                  </p>

                  <div style={styles.products}>
                    {(order.products || []).map((item) => {
                      const product = item.product;

                      const productName =
                        product?.name ||
                        item.productName ||
                        'Product';

                      const category =
                        product?.category || 'Uncategorized';

                      const quantity = Number(item.quantity || 0);

                      const unitPrice = Number(item.price || 0);

                      const subtotal = quantity * unitPrice;

                      return (
                        <div
                          key={item._id || product?._id || productName}
                          style={styles.product}
                        >
                          <div style={styles.productInfo}>
                            <p style={styles.productName}>
                              {productName}
                            </p>

                            <p style={styles.productCategory}>
                              {category}
                            </p>
                          </div>

                          <span style={styles.productMeta}>
                            Qty: {quantity}
                          </span>

                          <span style={styles.productPrice}>
                            ${unitPrice.toFixed(2)} each
                          </span>

                          <strong style={styles.productTotal}>
                            ${subtotal.toFixed(2)}
                          </strong>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}