import { useCallback, useEffect, useState } from 'react';
import { adminApi } from '../container';

export default function useAdmin(user) {
  const [data, setData] = useState({ stats: {}, users: [], vendors: [], products: [] });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const getProductDetails = useCallback((id) => adminApi.getProduct(id), []);
  const getVendorDetails = useCallback((id) => adminApi.getVendor(id), []);

  const load = async () => {
    if (user?.role !== 'admin') return;
    try {
      setLoading(true);
      setError('');
      const [stats, users, vendors, products] = await Promise.all([
        adminApi.getStats(), adminApi.getUsers(), adminApi.getVendors(), adminApi.getProducts(),
      ]);
      setData({
        stats: stats.statics || {},
        users: users.users || [],
        vendors: vendors.vendors || [],
        products: products.products || [],
      });
    } catch (requestError) {
      setError(requestError?.response?.data?.message || 'Unable to load admin data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, [user]);

  const approveVendor = async (id) => {
    const response = await adminApi.approveVendor(id);
    await load();
    return response;
  };

  const approveProduct = async (id) => {
    const response = await adminApi.approveProduct(id);
    await load();
    return response;
  };

  const deleteUser = async (id) => {
    const response = await adminApi.deleteUser(id);
    await load();
    return response;
  };

  const toggleBlockUser = async (id) => {
    const response = await adminApi.toggleBlockUser(id);
    await load();
    return response;
  };

  const toggleBlockVendor = async (vendorId) => {
    const response = await adminApi.toggleBlockUser(vendorId);
    await load();
    return response;
  };

  const deleteProduct = async (id) => {
    const response = await adminApi.deleteProduct(id);
    await load();
    return response;
  };

  const toggleProductActive = async (id, isActive) => {
    const response = await adminApi.toggleProductActive(id, isActive);
    await load();
    return response;
  };

  return { ...data, loading, error, load, getProductDetails, getVendorDetails, approveVendor, approveProduct, deleteUser, toggleBlockUser, toggleBlockVendor, deleteProduct, toggleProductActive };
}
