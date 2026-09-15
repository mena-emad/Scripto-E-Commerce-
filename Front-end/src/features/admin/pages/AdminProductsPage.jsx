import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function AdminProductsPage({ products, vendors, onApprove }) {
  const [busyId, setBusyId] = useState('');
  const [error, setError] = useState('');

  const approve = async (id) => {
    try {
      setBusyId(id);
      setError('');
      await onApprove(id);
    } catch (requestError) {
      setError(
        requestError?.response?.data?.message ||
          'Unable to approve product.'
      );
    } finally {
      setBusyId('');
    }
  };

  const getVendorName = (product) => {
    return (
      product.vendor?.storeName ||
      vendors.find(
        (vendor) =>
          vendor._id === product.vendor ||
          vendor.storeName === product.vendor
      )?.storeName ||
      product.vendor ||
      'Unknown vendor'
    );
  };

  const getStatusStyle = (status) => {
    if (status === 'approved') {
      return {
        background: '#f0fdf4',
        color: '#16a34a',
        border: '1px solid #bbf7d0',
      };
    }

    if (status === 'rejected') {
      return {
        background: '#fef2f2',
        color: '#dc2626',
        border: '1px solid #fecaca',
      };
    }

    if (status === 'out of stock') {
      return {
        background: '#fffbeb',
        color: '#d97706',
        border: '1px solid #fde68a',
      };
    }

    return {
      background: '#eff6ff',
      color: '#2563eb',
      border: '1px solid #bfdbfe',
    };
  };

  return (
    <div style={styles.page}>
      {/* Header */}
      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>Products</h1>
          <p style={styles.subtitle}>
            Review, approve and manage all products
          </p>
        </div>

        <div style={styles.countBadge}>
          {products.length}
        </div>
      </div>

      {/* Error */}
      {error && (
        <div style={styles.errorBox}>
          <div style={styles.errorIcon}>!</div>
          <span>{error}</span>
        </div>
      )}

      {/* Products */}
      <div style={styles.productsGrid}>
        {products.length === 0 ? (
          <div style={styles.emptyState}>
            <div style={styles.emptyIcon}>📦</div>
            <h3 style={styles.emptyTitle}>No products found</h3>
            <p style={styles.emptyText}>
              There are no products available at the moment.
            </p>
          </div>
        ) : (
          products.map((product) => {
            console.log(product)
            const productId = product._id || product.id;
            const status = product.status || 'pending';
            const isBusy = busyId === product._id;

            return (
              <div key={productId} style={styles.productCard}>
                {/* Product Header */}
                <div style={styles.productHeader}>
                  <img src={product.vendor.storeLogo.url} style={styles.productIcon}>
                  
                  </img>

                  <div style={styles.productMainInfo}>
                    <h3 style={styles.productName}>
                      {product.name}
                    </h3>

                    <span style={styles.category}>
                      {product.category || 'Uncategorized'}
                    </span>
                  </div>

                  <span
                    style={{
                      ...styles.statusBadge,
                      ...getStatusStyle(status),
                    }}
                  >
                    {status}
                  </span>
                </div>

                {/* Vendor */}
                <div style={styles.vendorBox}>
                  <img src={product.vendor.storeLogo.url} style={styles.vendorIcon}></img>

                  <div>
                    <span style={styles.vendorLabel}>
                      Vendor
                    </span>

                    <strong style={styles.vendorName}>
                      {getVendorName(product)}
                    </strong>
                  </div>
                </div>

                {/* Divider */}
                <div style={styles.divider} />

                {/* Actions */}
                <div style={styles.actions}>
                  <Link
                    to={`/admin/products/${productId}`}
                    style={styles.detailsButton}
                  >
                    View Details
                  </Link>

                  {status === 'approved' ? (
                    <span style={styles.approvedText}>
                      ✓ Approved
                    </span>
                  ) : status === 'rejected' ||
                    status === 'out of stock' ? (
                    <span
                      style={{
                        ...styles.statusText,
                        color:
                          status === 'rejected'
                            ? '#dc2626'
                            : '#d97706',
                      }}
                    >
                      {status}
                    </span>
                  ) : (
                    <button
                      type="button"
                      disabled={isBusy}
                      onClick={() => approve(product._id)}
                      style={{
                        ...styles.approveButton,
                        opacity: isBusy ? 0.6 : 1,
                        cursor: isBusy
                          ? 'not-allowed'
                          : 'pointer',
                      }}
                    >
                      {isBusy ? 'Approving...' : 'Approve'}
                    </button>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

const styles = {
  page: {
    display: 'grid',
    gap: '1.25rem',
    color: '#0f172a',
  },

  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '1rem',
  },

  title: {
    margin: 0,
    fontSize: '1.6rem',
    fontWeight: 800,
    color: '#0f172a',
  },

  subtitle: {
    margin: '0.35rem 0 0',
    color: '#64748b',
    fontSize: '0.9rem',
  },

  countBadge: {
    minWidth: '40px',
    height: '40px',
    padding: '0 0.7rem',
    borderRadius: '12px',
    background: '#eff6ff',
    color: '#2563eb',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 800,
    fontSize: '0.9rem',
  },

  errorBox: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.7rem',
    padding: '0.9rem 1rem',
    borderRadius: '14px',
    background: '#fef2f2',
    border: '1px solid #fecaca',
    color: '#dc2626',
    fontSize: '0.88rem',
    fontWeight: 600,
  },

  errorIcon: {
    width: '24px',
    height: '24px',
    borderRadius: '50%',
    background: '#dc2626',
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 800,
    flexShrink: 0,
  },

  productsGrid: {
    display: 'grid',
    gridTemplateColumns:
      'repeat(auto-fit, minmax(320px, 1fr))',
    gap: '1rem',
  },

  productCard: {
    background: '#fff',
    border: '1px solid #e2e8f0',
    borderRadius: '18px',
    padding: '1.15rem',
    boxShadow: '0 4px 20px rgba(15, 23, 42, 0.06)',
  },

  productHeader: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '0.8rem',
  },

  productIcon: {
    width: '46px',
    height: '46px',
    borderRadius: '13px',
    background: '#eff6ff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.2rem',
    flexShrink: 0,
  },

  productMainInfo: {
    flex: 1,
    minWidth: 0,
  },

  productName: {
    margin: 0,
    color: '#0f172a',
    fontSize: '0.98rem',
    fontWeight: 800,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },

  category: {
    display: 'block',
    marginTop: '0.3rem',
    color: '#64748b',
    fontSize: '0.8rem',
  },

  statusBadge: {
    padding: '0.35rem 0.6rem',
    borderRadius: '8px',
    fontSize: '0.72rem',
    fontWeight: 800,
    textTransform: 'capitalize',
    whiteSpace: 'nowrap',
  },

  vendorBox: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.7rem',
    marginTop: '1rem',
    padding: '0.75rem',
    borderRadius: '12px',
    background: '#f8fafc',
    border: '1px solid #e2e8f0',
  },

  vendorIcon: {
    width: '36px',
    height: '36px',
    borderRadius: '10px',
    background: '#fff',
    border: '1px solid #e2e8f0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },

  vendorLabel: {
    display: 'block',
    color: '#64748b',
    fontSize: '0.7rem',
    marginBottom: '0.15rem',
  },

  vendorName: {
    display: 'block',
    color: '#334155',
    fontSize: '0.82rem',
  },

  divider: {
    height: '1px',
    background: '#e2e8f0',
    margin: '1rem 0',
  },

  actions: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: '0.6rem',
    flexWrap: 'wrap',
  },

  detailsButton: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    textDecoration: 'none',
    background: '#eff6ff',
    color: '#2563eb',
    border: '1px solid #bfdbfe',
    borderRadius: '10px',
    padding: '0.6rem 0.85rem',
    fontSize: '0.8rem',
    fontWeight: 700,
  },

  approveButton: {
    border: 'none',
    borderRadius: '10px',
    padding: '0.6rem 0.9rem',
    background: '#2563eb',
    color: '#fff',
    fontSize: '0.8rem',
    fontWeight: 700,
    transition: '0.2s ease',
  },

  approvedText: {
    padding: '0.6rem 0.75rem',
    borderRadius: '10px',
    background: '#f0fdf4',
    border: '1px solid #bbf7d0',
    color: '#16a34a',
    fontSize: '0.8rem',
    fontWeight: 700,
  },

  statusText: {
    padding: '0.6rem 0.75rem',
    borderRadius: '10px',
    background: '#f8fafc',
    border: '1px solid #e2e8f0',
    fontSize: '0.8rem',
    fontWeight: 700,
    textTransform: 'capitalize',
  },

  emptyState: {
    gridColumn: '1 / -1',
    minHeight: '260px',
    background: '#fff',
    border: '1px dashed #cbd5e1',
    borderRadius: '18px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    padding: '2rem',
  },

  emptyIcon: {
    fontSize: '2.5rem',
    marginBottom: '0.5rem',
  },

  emptyTitle: {
    margin: 0,
    color: '#0f172a',
    fontSize: '1rem',
  },

  emptyText: {
    margin: '0.4rem 0 0',
    color: '#64748b',
    fontSize: '0.85rem',
  },
};