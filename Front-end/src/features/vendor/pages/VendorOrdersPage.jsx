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
      width: '100%',
      minWidth: 0,
      boxSizing: 'border-box',
    },

    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
      gap: '1rem',
      flexWrap: 'wrap',
      minWidth: 0,
    },

    headerContent: {
      minWidth: 0,
      flex: 1,
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
      lineHeight: 1.5,
    },

    count: {
      background: '#eff6ff',
      color: '#1d4ed8',
      border: '1px solid #dbeafe',
      padding: '0.45rem 0.75rem',
      borderRadius: '999px',
      fontSize: '0.8rem',
      fontWeight: 700,
      flexShrink: 0,
    },

    alert: {
      borderRadius: '12px',
      padding: '0.85rem 1rem',
      fontSize: '0.9rem',
      lineHeight: 1.5,
      overflowWrap: 'anywhere',
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
      minWidth: 0,
    },

    orderCard: {
      background: '#ffffff',
      border: '1px solid #e2e8f0',
      borderRadius: '18px',
      padding: '1.1rem',
      boxShadow: '0 4px 14px rgba(15, 23, 42, 0.04)',
      minWidth: 0,
      boxSizing: 'border-box',
      overflow: 'hidden',
    },

    orderHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: '1rem',
      paddingBottom: '1rem',
      borderBottom: '1px solid #e2e8f0',
      flexWrap: 'wrap',
      minWidth: 0,
    },

    orderIdWrapper: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.7rem',
      minWidth: 0,
      flex: 1,
    },

    orderIcon: {
      width: '40px',
      height: '40px',
      minWidth: '40px',
      display: 'grid',
      placeItems: 'center',
      background: '#eff6ff',
      color: '#1d4ed8',
      borderRadius: '10px',
      fontWeight: 800,
      fontSize: '0.85rem',
    },

    orderIdContent: {
      minWidth: 0,
    },

    orderId: {
      margin: 0,
      color: '#0f172a',
      fontSize: '0.95rem',
      fontWeight: 800,
      overflowWrap: 'anywhere',
      wordBreak: 'break-word',
    },

    orderIdLabel: {
      margin: '0.2rem 0 0',
      color: '#94a3b8',
      fontSize: '0.75rem',
      overflowWrap: 'anywhere',
      wordBreak: 'break-word',
    },

    headerRight: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
      flexWrap: 'wrap',
      flexShrink: 0,
    },

    statusSelect: {
      borderRadius: '9px',
      padding: '0.5rem 0.7rem',
      fontSize: '0.82rem',
      fontWeight: 700,
      outline: 'none',
      cursor: 'pointer',
      maxWidth: '100%',
      boxSizing: 'border-box',
    },

    summary: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
      gap: '0.75rem',
      padding: '1rem 0',
      minWidth: 0,
    },

    summaryItem: {
      background: '#f8fafc',
      border: '1px solid #e2e8f0',
      borderRadius: '12px',
      padding: '0.8rem',
      minWidth: 0,
      boxSizing: 'border-box',
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
      overflowWrap: 'anywhere',
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
      minWidth: 0,
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
      minWidth: 0,
      boxSizing: 'border-box',
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
      minWidth: 0,
    },

    productCategory: {
      margin: '0.25rem 0 0',
      color: '#64748b',
      fontSize: '0.75rem',
      overflowWrap: 'anywhere',
    },

    productMeta: {
      color: '#64748b',
      fontSize: '0.8rem',
      whiteSpace: 'nowrap',
      flexShrink: 0,
    },

    productPrice: {
      color: '#334155',
      fontSize: '0.85rem',
      fontWeight: 600,
      whiteSpace: 'nowrap',
      flexShrink: 0,
    },

    productTotal: {
      color: '#0f172a',
      fontSize: '0.9rem',
      fontWeight: 800,
      whiteSpace: 'nowrap',
      flexShrink: 0,
    },

    empty: {
      background: '#ffffff',
      border: '1px solid #e2e8f0',
      borderRadius: '18px',
      padding: '3rem 1rem',
      textAlign: 'center',
      minWidth: 0,
      boxSizing: 'border-box',
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
      lineHeight: 1.5,
    },
  };

  return (
    <>
      <style>{`
        .vendor-orders-page {
          width: 100%;
          min-width: 0;
          box-sizing: border-box;
        }

        .vendor-order-card {
          width: 100%;
          min-width: 0;
          box-sizing: border-box;
        }

        .vendor-product {
          min-width: 0;
          box-sizing: border-box;
        }

        .vendor-product-info {
          min-width: 0;
        }

        .vendor-product-name {
          min-width: 0;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .vendor-order-id-content {
          min-width: 0;
        }

        .vendor-status-select {
          max-width: 100%;
        }

        @media (max-width: 900px) {
          .vendor-product {
            grid-template-columns: minmax(0, 1fr) auto auto !important;
          }

          .vendor-product-total {
            grid-column: 3;
            grid-row: 1;
          }

          .vendor-product-price {
            grid-column: 2;
            grid-row: 1;
          }

          .vendor-product-meta {
            grid-column: 2 / -1;
            grid-row: 2;
            justify-self: end;
          }
        }

        @media (max-width: 700px) {
          .vendor-orders-page {
            gap: 1rem !important;
          }

          .vendor-order-card {
            padding: 1rem !important;
            border-radius: 16px !important;
          }

          .vendor-order-header {
            align-items: flex-start !important;
          }

          .vendor-order-header-right {
            width: 100%;
            justify-content: flex-start;
          }

          .vendor-status-select {
            width: 100%;
            min-width: 0;
          }

          .vendor-summary {
            grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
          }

          .vendor-product {
            grid-template-columns: minmax(0, 1fr) auto !important;
            gap: 0.7rem !important;
          }

          .vendor-product-info {
            grid-column: 1 / -1;
          }

          .vendor-product-meta {
            grid-column: 1;
            grid-row: 2;
            justify-self: start;
          }

          .vendor-product-price {
            grid-column: 1;
            grid-row: 3;
            justify-self: start;
          }

          .vendor-product-total {
            grid-column: 2;
            grid-row: 2 / span 2;
            align-self: end;
            justify-self: end;
          }

          .vendor-product-name {
            white-space: normal;
            overflow-wrap: anywhere;
            word-break: break-word;
          }
        }

        @media (max-width: 500px) {
          .vendor-orders-page-title {
            font-size: 1.35rem !important;
          }

          .vendor-orders-page-subtitle {
            font-size: 0.85rem !important;
          }

          .vendor-order-card {
            padding: 0.85rem !important;
            border-radius: 15px !important;
          }

          .vendor-order-header {
            padding-bottom: 0.85rem !important;
          }

          .vendor-order-icon {
            width: 36px !important;
            height: 36px !important;
            min-width: 36px !important;
          }

          .vendor-order-id {
            font-size: 0.88rem !important;
          }

          .vendor-order-id-label {
            font-size: 0.68rem !important;
          }

          .vendor-summary {
            grid-template-columns: 1fr !important;
            gap: 0.6rem !important;
          }

          .vendor-summary-item {
            padding: 0.7rem !important;
          }

          .vendor-product {
            padding: 0.75rem !important;
            border-radius: 10px !important;
          }

          .vendor-product-name {
            font-size: 0.85rem !important;
          }

          .vendor-product-category {
            font-size: 0.7rem !important;
          }

          .vendor-product-meta,
          .vendor-product-price {
            font-size: 0.75rem !important;
          }

          .vendor-product-total {
            font-size: 0.82rem !important;
          }

          .vendor-empty {
            padding: 2.5rem 0.85rem !important;
            border-radius: 16px !important;
          }
        }

        @media (max-width: 380px) {
          .vendor-orders-page-title {
            font-size: 1.2rem !important;
          }

          .vendor-order-card {
            padding: 0.75rem !important;
          }

          .vendor-order-id-wrapper {
            gap: 0.55rem !important;
          }

          .vendor-product {
            grid-template-columns: 1fr !important;
          }

          .vendor-product-info {
            grid-column: 1 !important;
            grid-row: 1 !important;
          }

          .vendor-product-meta {
            grid-column: 1 !important;
            grid-row: 2 !important;
            justify-self: start !important;
          }

          .vendor-product-price {
            grid-column: 1 !important;
            grid-row: 3 !important;
            justify-self: start !important;
          }

          .vendor-product-total {
            grid-column: 1 !important;
            grid-row: 4 !important;
            justify-self: end !important;
            align-self: auto !important;
          }
        }

        @media (max-width: 330px) {
          .vendor-order-icon {
            width: 32px !important;
            height: 32px !important;
            min-width: 32px !important;
            font-size: 0.75rem !important;
          }

          .vendor-order-id {
            font-size: 0.82rem !important;
          }

          .vendor-order-id-label {
            font-size: 0.63rem !important;
          }

          .vendor-status-select {
            font-size: 0.75rem !important;
          }

          .vendor-product {
            padding: 0.65rem !important;
          }
        }
      `}</style>

      <div
        style={styles.page}
        className="vendor-orders-page"
      >
        {/* Header */}
        <div style={styles.header}>
          <div
            style={styles.headerContent}
            className="vendor-orders-header-content"
          >
            <h1
              style={styles.title}
              className="vendor-orders-page-title"
            >
              Vendor Orders
            </h1>

            <p
              style={styles.subtitle}
              className="vendor-orders-page-subtitle"
            >
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
          <div
            style={styles.empty}
            className="vendor-empty"
          >
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
                <div
                  key={orderId}
                  style={styles.orderCard}
                  className="vendor-order-card"
                >
                  {/* Order Header */}
                  <div
                    style={styles.orderHeader}
                    className="vendor-order-header"
                  >
                    <div
                      style={styles.orderIdWrapper}
                      className="vendor-order-id-wrapper"
                    >
                      <div
                        style={styles.orderIcon}
                        className="vendor-order-icon"
                      >
                        #
                      </div>

                      <div
                        style={styles.orderIdContent}
                        className="vendor-order-id-content"
                      >
                        <p
                          style={styles.orderId}
                          className="vendor-order-id"
                        >
                          Order #{order.parentOrder}
                        </p>

                        <p
                          style={styles.orderIdLabel}
                          className="vendor-order-id-label"
                        >
                          Vendor Order ID: {orderId}
                        </p>
                      </div>
                    </div>

                    <div
                      style={styles.headerRight}
                      className="vendor-order-header-right"
                    >
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
                        className="vendor-status-select"
                      >
                        {[
                          'Pending',
                          'Processing',
                          'Shipped',
                          'Delivered',
                          'Cancelled',
                        ].map((status) => (
                          <option key={status} value={status}>
                            {busyId === orderId &&
                            status === order.status
                              ? 'Updating...'
                              : status}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Order Summary */}
                  <div
                    style={styles.summary}
                    className="vendor-summary"
                  >
                    <div
                      style={styles.summaryItem}
                      className="vendor-summary-item"
                    >
                      <div style={styles.summaryLabel}>
                        Products
                      </div>

                      <div style={styles.summaryValue}>
                        {order.products?.length || 0}
                      </div>
                    </div>

                    <div
                      style={styles.summaryItem}
                      className="vendor-summary-item"
                    >
                      <div style={styles.summaryLabel}>
                        Total Items
                      </div>

                      <div style={styles.summaryValue}>
                        {order.totalAmount || 0}
                      </div>
                    </div>

                    <div
                      style={styles.summaryItem}
                      className="vendor-summary-item"
                    >
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
                          item?.name ||
                          'Product';

                        const category =
                          product?.category || item.category || 'Uncategorized';

                        const quantity = Number(
                          item.quantity || 0
                        );

                        const unitPrice = Number(
                          item.price || 0
                        );

                        const subtotal = quantity * unitPrice;

                        return (
                          <div
                            key={
                              item._id ||
                              product?._id ||
                              productName
                            }
                            style={styles.product}
                            className="vendor-product"
                          >
                            <div
                              style={styles.productInfo}
                              className="vendor-product-info"
                            >
                              <p
                                style={styles.productName}
                                className="vendor-product-name"
                              >
                                {productName}
                              </p>

                              <p
                                style={styles.productCategory}
                                className="vendor-product-category"
                              >
                                {category}
                              </p>
                            </div>

                            <span
                              style={styles.productMeta}
                              className="vendor-product-meta"
                            >
                              Qty: {quantity}
                            </span>

                            <span
                              style={styles.productPrice}
                              className="vendor-product-price"
                            >
                              ${unitPrice.toFixed(2)} each
                            </span>

                            <strong
                              style={styles.productTotal}
                              className="vendor-product-total"
                            >
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
    </>
  );
}