import { useState } from 'react';

export default function AdminUsersPage({ users, onDelete, onToggleBlock }) {
  const [busyId, setBusyId] = useState('');
  const [error, setError] = useState('');
  console.log(users)
  const run = async (action, id) => {
    try {
      setBusyId(id);
      setError('');
      await action(id);
    } catch (requestError) {
      setError(
        requestError?.response?.data?.message ||
          'Unable to update user.'
      );
    } finally {
      setBusyId('');
    }
  };

  return (
    <div style={styles.page}>
      {/* Header */}
      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>Users</h1>
          <p style={styles.subtitle}>
            Manage registered users and their account status
          </p>
        </div>

        <div style={styles.countBadge}>
          {users.length}
        </div>
      </div>

      {/* Error */}
      {error && (
        <div style={styles.errorBox}>
          <div style={styles.errorIcon}>!</div>
          <span>{error}</span>
        </div>
      )}

      {/* Users */}
      <div style={styles.usersGrid}>
        {users.length === 0 ? (
          <div style={styles.emptyState}>
            <div style={styles.emptyIcon}>👤</div>

            <h3 style={styles.emptyTitle}>
              No users found
            </h3>

            <p style={styles.emptyText}>
              There are no users available at the moment.
            </p>
          </div>
        ) : (
          users.map((user) => {
            const userId = user._id || user.id;
            const isBusy = busyId === user._id;

            return (
              <div key={userId} style={styles.userCard}>
                {/* User Header */}
                <div style={styles.userHeader}>
                  <div style={styles.userInfo}>
                    <img src={user.image.url} style={styles.avatar}>

                    </img>

                    <div style={styles.userDetails}>
                      <h3 style={styles.userName}>
                        {user.name}
                      </h3>

                      <span style={styles.email}>
                        {user.email}
                      </span>
                    </div>
                  </div>

                  <span
                    style={{
                      ...styles.statusBadge,
                      ...(user.isBlocked
                        ? styles.blockedBadge
                        : styles.activeBadge),
                    }}
                  >
                    {user.isBlocked ? 'Blocked' : 'Active'}
                  </span>
                </div>

                {/* User Meta */}
                <div style={styles.metaBox}>
                  <span style={styles.metaLabel}>
                    Role
                  </span>

                  <span style={styles.roleBadge}>
                    {user.role || 'User'}
                  </span>
                </div>

                {/* Divider */}
                <div style={styles.divider} />

                {/* Actions */}
                <div style={styles.actions}>
                  <button
                    type="button"
                    disabled={isBusy}
                    onClick={() =>
                      run(onToggleBlock, user._id)
                    }
                    style={{
                      ...styles.blockButton,
                      ...(user.isBlocked
                        ? styles.unblockButton
                        : styles.blockButton),
                      opacity: isBusy ? 0.6 : 1,
                      cursor: isBusy
                        ? 'not-allowed'
                        : 'pointer',
                    }}
                  >
                    {isBusy
                      ? 'Updating...'
                      : user.isBlocked
                      ? 'Unblock'
                      : 'Block'}
                  </button>

                  <button
                    type="button"
                    disabled={isBusy}
                    onClick={() =>
                      run(onDelete, user._id)
                    }
                    style={{
                      ...styles.deleteButton,
                      opacity: isBusy ? 0.6 : 1,
                      cursor: isBusy
                        ? 'not-allowed'
                        : 'pointer',
                    }}
                  >
                    {isBusy ? 'Deleting...' : 'Delete'}
                  </button>
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

  usersGrid: {
    display: 'grid',
    gridTemplateColumns:
      'repeat(auto-fit, minmax(320px, 1fr))',
    gap: '1rem',
  },

  userCard: {
    background: '#fff',
    border: '1px solid #e2e8f0',
    borderRadius: '18px',
    padding: '1.15rem',
    boxShadow: '0 4px 20px rgba(15, 23, 42, 0.06)',
  },

  userHeader: {
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

  avatar: {
    width: '46px',
    height: '46px',
    borderRadius: '13px',
    background: '#eff6ff',
    color: '#2563eb',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1rem',
    fontWeight: 800,
    flexShrink: 0,
  },

  userDetails: {
    minWidth: 0,
  },

  userName: {
    margin: 0,
    color: '#0f172a',
    fontSize: '0.98rem',
    fontWeight: 800,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },

  email: {
    display: 'block',
    marginTop: '0.3rem',
    color: '#64748b',
    fontSize: '0.78rem',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },

  statusBadge: {
    padding: '0.35rem 0.6rem',
    borderRadius: '8px',
    fontSize: '0.72rem',
    fontWeight: 800,
    whiteSpace: 'nowrap',
  },

  activeBadge: {
    background: '#f0fdf4',
    color: '#16a34a',
    border: '1px solid #bbf7d0',
  },

  blockedBadge: {
    background: '#fef2f2',
    color: '#dc2626',
    border: '1px solid #fecaca',
  },

  metaBox: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: '1rem',
    padding: '0.75rem',
    borderRadius: '12px',
    background: '#f8fafc',
    border: '1px solid #e2e8f0',
  },

  metaLabel: {
    color: '#64748b',
    fontSize: '0.78rem',
    fontWeight: 600,
  },

  roleBadge: {
    padding: '0.3rem 0.6rem',
    borderRadius: '8px',
    background: '#eff6ff',
    color: '#2563eb',
    fontSize: '0.72rem',
    fontWeight: 800,
    textTransform: 'capitalize',
  },

  divider: {
    height: '1px',
    background: '#e2e8f0',
    margin: '1rem 0',
  },

  actions: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '0.6rem',
    flexWrap: 'wrap',
  },

  blockButton: {
    border: '1px solid #fecaca',
    borderRadius: '10px',
    padding: '0.6rem 0.9rem',
    background: '#fef2f2',
    color: '#dc2626',
    fontSize: '0.8rem',
    fontWeight: 700,
    transition: '0.2s ease',
  },

  unblockButton: {
    background: '#f0fdf4',
    color: '#16a34a',
    border: '1px solid #bbf7d0',
  },

  deleteButton: {
    border: '1px solid #fecaca',
    borderRadius: '10px',
    padding: '0.6rem 0.9rem',
    background: '#dc2626',
    color: '#fff',
    fontSize: '0.8rem',
    fontWeight: 700,
    transition: '0.2s ease',
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