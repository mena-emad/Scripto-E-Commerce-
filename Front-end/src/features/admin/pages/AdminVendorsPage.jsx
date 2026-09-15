import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function AdminVendorsPage({
  vendors,
  onApprove,
  onToggleBlock,
}) {
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
          'Unable to approve vendor.'
      );
    } finally {
      setBusyId('');
    }
  };

  const toggleBlock = async (id) => {
    try {
      setBusyId(id);
      setError('');
      await onToggleBlock(id);
    } catch (requestError) {
      setError(
        requestError?.response?.data?.message ||
          'Unable to update vendor account.'
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
          <h1 style={styles.title}>Vendors</h1>
          <p style={styles.subtitle}>
            Manage vendors, approvals and account status
          </p>
        </div>

        <div style={styles.countBadge}>
          {vendors.length}
        </div>
      </div>

      {/* Error */}
      {error && (
        <div style={styles.errorBox}>
          <div style={styles.errorIcon}>!</div>
          <span>{error}</span>
        </div>
      )}

      {/* Vendors */}
      <div style={styles.vendorsGrid}>
        {vendors.length === 0 ? (
          <div style={styles.emptyState}>
            <div style={styles.emptyIcon}>🏪</div>

            <h3 style={styles.emptyTitle}>
              No vendors found
            </h3>

            <p style={styles.emptyText}>
              There are no vendors available at the moment.
            </p>
          </div>
        ) : (
          vendors.map((vendor) => {
            const vendorId = vendor._id || vendor.id;
            const ownerId = vendor.owner?._id;

            const vendorBusy = busyId === vendor._id;
            const ownerBusy = busyId === ownerId;

            return (
              <div key={vendorId} style={styles.vendorCard}>
                {/* Vendor Header */}
                <div style={styles.vendorHeader}>
                  <div style={styles.vendorInfo}>
                    <img src={vendor.storeLogo.url} style={styles.vendorIcon}>
                      
                    </img>

                    <div style={styles.vendorDetails}>
                      <h3 style={styles.vendorName}>
                        {vendor.storeName}
                      </h3>

                      <span style={styles.address}>
                        {vendor.storeAdress || 'No address provided'}
                      </span>
                    </div>
                  </div>

                  <span
                    style={{
                      ...styles.statusBadge,
                      ...(vendor.isApproved
                        ? styles.approvedBadge
                        : styles.pendingBadge),
                    }}
                  >
                    {vendor.isApproved
                      ? 'Approved'
                      : 'Pending'}
                  </span>
                </div>

                {/* Owner */}
                {vendor.owner && (
                  <div style={styles.ownerBox}>
                    <img  src={vendor.storeLogo.url}style={styles.ownerAvatar}>

                    </img>

                    <div style={styles.ownerDetails}>
                      <span style={styles.ownerLabel}>
                        Owner
                      </span>

                      <strong style={styles.ownerName}>
                        {vendor.owner.name || 'Unknown owner'}
                      </strong>
                    </div>

                    <span
                      style={{
                        ...styles.ownerStatus,
                        ...(vendor.owner.isBlocked
                          ? styles.blockedOwner
                          : styles.activeOwner),
                      }}
                    >
                      {vendor.owner.isBlocked
                        ? 'Blocked'
                        : 'Active'}
                    </span>
                  </div>
                )}

                {/* Divider */}
                <div style={styles.divider} />

                {/* Actions */}
                <div style={styles.actions}>
                  <Link
                    to={`/admin/vendors/${vendorId}`}
                    style={styles.detailsButton}
                  >
                    View Details
                  </Link>

                  {vendor.isApproved ? (
                    <span style={styles.approvedText}>
                      ✓ Approved
                    </span>
                  ) : (
                    <button
                      type="button"
                      disabled={vendorBusy}
                      onClick={() => approve(vendor._id)}
                      style={{
                        ...styles.approveButton,
                        opacity: vendorBusy ? 0.6 : 1,
                        cursor: vendorBusy
                          ? 'not-allowed'
                          : 'pointer',
                      }}
                    >
                      {vendorBusy
                        ? 'Approving...'
                        : 'Approve'}
                    </button>
                  )}

                  {ownerId && (
                    <button
                      type="button"
                      disabled={ownerBusy}
                      onClick={() => toggleBlock(ownerId)}
                      style={{
                        ...styles.blockButton,
                        ...(vendor.owner.isBlocked
                          ? styles.unblockButton
                          : {}),
                        opacity: ownerBusy ? 0.6 : 1,
                        cursor: ownerBusy
                          ? 'not-allowed'
                          : 'pointer',
                      }}
                    >
                      {ownerBusy
                        ? 'Updating...'
                        : vendor.owner.isBlocked
                        ? 'Unblock'
                        : 'Block'}
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

  vendorsGrid: {
    display: 'grid',
    gridTemplateColumns:
      'repeat(auto-fit, minmax(340px, 1fr))',
    gap: '1rem',
  },

  vendorCard: {
    background: '#fff',
    border: '1px solid #e2e8f0',
    borderRadius: '18px',
    padding: '1.15rem',
    boxShadow: '0 4px 20px rgba(15, 23, 42, 0.06)',
  },

  vendorHeader: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: '1rem',
  },

  vendorInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    minWidth: 0,
  },

  vendorIcon: {
    width: '46px',
    height: '46px',
    borderRadius: '13px',
    background: '#eff6ff',
    color: '#2563eb',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.2rem',
    flexShrink: 0,
  },

  vendorDetails: {
    minWidth: 0,
  },

  vendorName: {
    margin: 0,
    color: '#0f172a',
    fontSize: '0.98rem',
    fontWeight: 800,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },

  address: {
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

  approvedBadge: {
    background: '#f0fdf4',
    color: '#16a34a',
    border: '1px solid #bbf7d0',
  },

  pendingBadge: {
    background: '#fffbeb',
    color: '#d97706',
    border: '1px solid #fde68a',
  },

  ownerBox: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.7rem',
    marginTop: '1rem',
    padding: '0.75rem',
    borderRadius: '12px',
    background: '#f8fafc',
    border: '1px solid #e2e8f0',
  },

  ownerAvatar: {
    width: '36px',
    height: '36px',
    borderRadius: '10px',
    background: '#e0e7ff',
    color: '#4338ca',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 800,
    flexShrink: 0,
  },

  ownerDetails: {
    flex: 1,
    minWidth: 0,
  },

  ownerLabel: {
    display: 'block',
    color: '#64748b',
    fontSize: '0.68rem',
    marginBottom: '0.15rem',
  },

  ownerName: {
    display: 'block',
    color: '#334155',
    fontSize: '0.82rem',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },

  ownerStatus: {
    padding: '0.3rem 0.55rem',
    borderRadius: '7px',
    fontSize: '0.68rem',
    fontWeight: 800,
  },

  activeOwner: {
    background: '#f0fdf4',
    color: '#16a34a',
  },

  blockedOwner: {
    background: '#fef2f2',
    color: '#dc2626',
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

  blockButton: {
    border: '1px solid #fecaca',
    borderRadius: '10px',
    padding: '0.6rem 0.9rem',
    background: '#fef2f2',
    color: '#dc2626',
    fontSize: '0.8rem',
    fontWeight: 700,
  },

  unblockButton: {
    background: '#f0fdf4',
    color: '#16a34a',
    border: '1px solid #bbf7d0',
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