import Badge from '../../../components/ui/Badge';
import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function AdminDashboardPage({
  stats,
  recentUsers,
  recentProducts,
  onToggleBlock,
  onDeleteUser,
  onDeleteProduct,
}) {
  const [busyId, setBusyId] = useState('');
  const [error, setError] = useState('');

  const runAction = async (action, id, message) => {
    try {
      setBusyId(id);
      setError('');
      await action(id);
    } catch (requestError) {
      setError(requestError?.response?.data?.message || message);
    } finally {
      setBusyId('');
    }
  };

  const confirmAction = (message, action, id, errorMessage) => {
    if (window.confirm(message)) {
      runAction(action, id, errorMessage);
    }
  };

  return (
    <div style={styles.page}>
      {/* Error */}
      {error && (
        <div style={styles.errorBox}>
          <span style={styles.errorIcon}>!</span>
          <span>{error}</span>
        </div>
      )}

      {/* Stats */}
      <div style={styles.statsGrid}>
        {stats.map((stat) => (
          <div key={stat.label} style={styles.statCard}>
            <div style={styles.statLabel}>{stat.label}</div>

            <div style={styles.statValue}>
              {stat.value}
            </div>
          </div>
        ))}
      </div>

      {/* Users & Products */}
      <div style={styles.sectionsGrid}>
        {/* Users */}
        <section style={styles.sectionCard}>
          <div style={styles.sectionHeader}>
            <div>
              <h2 style={styles.sectionTitle}>Recent Users</h2>
              <p style={styles.sectionSubtitle}>
                Manage recently registered users
              </p>
            </div>

            <div style={styles.countBadge}>
              {recentUsers.length}
            </div>
          </div>

          <div style={styles.itemsGrid}>
            {recentUsers.length === 0 ? (
              <div style={styles.emptyState}>
                <div style={styles.emptyIcon}>👤</div>
                <strong>No users found</strong>
                <span>No recent users available.</span>
              </div>
            ) : (
              recentUsers.map((user) => (
                <div
                  key={user._id || user.id}
                  style={styles.itemCard}
                >
                  <div style={styles.itemTop}>
                    <div style={styles.userInfo}>
                      <div style={styles.avatar}>
                        {(user.name || 'U')
                          .charAt(0)
                          .toUpperCase()}
                      </div>

                      <div style={styles.userDetails}>
                        <strong style={styles.itemTitle}>
                          {user.name}
                        </strong>

                        <span style={styles.itemSubtitle}>
                          {user.role}
                        </span>
                      </div>
                    </div>

                    <Badge
                      tone={
                        user.isBlocked
                          ? 'danger'
                          : 'success'
                      }
                    >
                      {user.isBlocked
                        ? 'Blocked'
                        : 'Active'}
                    </Badge>
                  </div>

                  <div style={styles.divider} />

                  <div style={styles.actions}>
                    <button
                      type="button"
                      disabled={busyId === user._id}
                      onClick={() =>
                        runAction(
                          onToggleBlock,
                          user._id,
                          'Unable to update user status.'
                        )
                      }
                      style={{
                        ...styles.button,
                        ...styles.secondaryButton,
                        opacity:
                          busyId === user._id ? 0.6 : 1,
                      }}
                    >
                      {user.isBlocked
                        ? 'Unblock'
                        : 'Block'}
                    </button>

                    <button
                      type="button"
                      disabled={busyId === user._id}
                      onClick={() =>
                        confirmAction(
                          'Delete this user account permanently?',
                          onDeleteUser,
                          user._id,
                          'Unable to delete user.'
                        )
                      }
                      style={{
                        ...styles.button,
                        ...styles.deleteButton,
                        opacity:
                          busyId === user._id ? 0.6 : 1,
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

        {/* Products */}
        <section style={styles.sectionCard}>
          <div style={styles.sectionHeader}>
            <div>
              <h2 style={styles.sectionTitle}>Recent Products</h2>
              <p style={styles.sectionSubtitle}>
                Review and manage recent products
              </p>
            </div>

            <div style={styles.countBadge}>
              {recentProducts.length}
            </div>
          </div>

          <div style={styles.itemsGrid}>
            {recentProducts.length === 0 ? (
              <div style={styles.emptyState}>
                <div style={styles.emptyIcon}>📦</div>
                <strong>No products found</strong>
                <span>No recent products available.</span>
              </div>
            ) : (
              recentProducts.map((product) => {
                const productId =
                  product._id || product.id;

                return (
                  <div
                    key={productId}
                    style={styles.itemCard}
                  >
                    <div style={styles.itemTop}>
                      <div style={styles.productInfo}>
                        <div style={styles.productIcon}>
                          📦
                        </div>

                        <div style={styles.productDetails}>
                          <strong style={styles.itemTitle}>
                            {product.name}
                          </strong>

                          <span style={styles.itemSubtitle}>
                            {product.vendor?.storeName ||
                              product.vendor ||
                              'Unknown vendor'}
                          </span>
                        </div>
                      </div>

                      <Badge
                        tone={
                          product.status === 'approved'
                            ? 'success'
                            : 'warning'
                        }
                      >
                        {product.status || 'pending'}
                      </Badge>
                    </div>

                    <div style={styles.divider} />

                    <div style={styles.actions}>
                      <Link
                        to={`/admin/products/${productId}`}
                        style={styles.detailsButton}
                      >
                        View Details
                      </Link>

                      <button
                        type="button"
                        disabled={busyId === productId}
                        onClick={() =>
                          confirmAction(
                            'Delete this product permanently?',
                            onDeleteProduct,
                            productId,
                            'Unable to delete product.'
                          )
                        }
                        style={{
                          ...styles.button,
                          ...styles.deleteButton,
                          opacity:
                            busyId === productId ? 0.6 : 1,
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

const styles = {
  page: {
    display: 'grid',
    gap: '1.5rem',
    color: '#0f172a',
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
    fontSize: '0.9rem',
    fontWeight: 600,
  },

  errorIcon: {
    width: '24px',
    height: '24px',
    borderRadius: '50%',
    background: '#dc2626',
    color: '#ffffff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 800,
    flexShrink: 0,
  },

  statsGrid: {
    display: 'grid',
    gridTemplateColumns:
      'repeat(auto-fit, minmax(190px, 1fr))',
    gap: '1rem',
  },

  statCard: {
    background: '#ffffff',
    border: '1px solid #e2e8f0',
    borderRadius: '18px',
    padding: '1.25rem',
    boxShadow:
      '0 4px 20px rgba(15, 23, 42, 0.06)',
  },

  statLabel: {
    color: '#64748b',
    fontSize: '0.9rem',
    fontWeight: 600,
    marginBottom: '0.5rem',
  },

  statValue: {
    color: '#0f172a',
    fontSize: '1.9rem',
    fontWeight: 800,
  },

  sectionsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
    gap: '1.5rem',
  },

  sectionCard: {
    background: '#ffffff',
    border: '1px solid #e2e8f0',
    borderRadius: '20px',
    padding: '1.25rem',
    boxShadow:
      '0 4px 20px rgba(15, 23, 42, 0.06)',
  },

  sectionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '1rem',
    marginBottom: '1rem',
  },

  sectionTitle: {
    margin: 0,
    color: '#0f172a',
    fontSize: '1.1rem',
    fontWeight: 800,
  },

  sectionSubtitle: {
    margin: '0.3rem 0 0',
    color: '#64748b',
    fontSize: '0.82rem',
  },

  countBadge: {
    minWidth: '32px',
    height: '32px',
    padding: '0 0.5rem',
    borderRadius: '10px',
    background: '#eff6ff',
    color: '#2563eb',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '0.85rem',
    fontWeight: 800,
  },

  itemsGrid: {
    display: 'grid',
    gap: '0.85rem',
  },

  itemCard: {
    background: '#f8fafc',
    border: '1px solid #e2e8f0',
    borderRadius: '16px',
    padding: '1rem',
  },

  itemTop: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: '1rem',
  },

  userInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    minWidth: 0,
  },

  productInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    minWidth: 0,
  },

  avatar: {
    width: '42px',
    height: '42px',
    borderRadius: '12px',
    background: '#eff6ff',
    color: '#2563eb',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 800,
    flexShrink: 0,
  },

  productIcon: {
    width: '42px',
    height: '42px',
    borderRadius: '12px',
    background: '#ffffff',
    border: '1px solid #e2e8f0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.1rem',
    flexShrink: 0,
  },

  userDetails: {
    display: 'grid',
    gap: '0.2rem',
    minWidth: 0,
  },

  productDetails: {
    display: 'grid',
    gap: '0.2rem',
    minWidth: 0,
  },

  itemTitle: {
    color: '#0f172a',
    fontSize: '0.92rem',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },

  itemSubtitle: {
    color: '#64748b',
    fontSize: '0.78rem',
  },

  divider: {
    height: '1px',
    background: '#e2e8f0',
    margin: '0.9rem 0',
  },

  actions: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: '0.6rem',
    flexWrap: 'wrap',
  },

  button: {
    border: 'none',
    borderRadius: '10px',
    padding: '0.6rem 0.85rem',
    fontSize: '0.82rem',
    fontWeight: 700,
    cursor: 'pointer',
    transition: '0.2s ease',
  },

  secondaryButton: {
    background: '#e2e8f0',
    color: '#334155',
  },

  deleteButton: {
    background: '#fef2f2',
    color: '#dc2626',
    border: '1px solid #fecaca',
  },

  detailsButton: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    textDecoration: 'none',
    background: '#2563eb',
    color: '#ffffff',
    borderRadius: '10px',
    padding: '0.6rem 0.85rem',
    fontSize: '0.82rem',
    fontWeight: 700,
  },

  emptyState: {
    minHeight: '180px',
    border: '1px dashed #cbd5e1',
    borderRadius: '14px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.35rem',
    color: '#64748b',
    textAlign: 'center',
  },

  emptyIcon: {
    fontSize: '2rem',
    marginBottom: '0.25rem',
  },
};