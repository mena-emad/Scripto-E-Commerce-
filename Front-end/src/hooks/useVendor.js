import { useEffect, useState } from 'react';
import { productsApi, vendorApi } from '../container';

export default function useVendor(user) {
  const [data, setData] = useState({ stats: {}, products: [], orders: [], profile: null });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const load = async () => {
    if (user?.role !== 'vendor') return;
    if (user.vendorInfo && !user.vendorInfo.isApproved) {
      setError('Your vendor account is awaiting admin approval.');
      return;
    }
    try {
      setLoading(true);
      setError('');
      const [stats, products, orders, profile] = await Promise.all([
        vendorApi.getDashboardStats(), vendorApi.getProducts(), vendorApi.getOrders(), vendorApi.getProfile(),
      ]);
      setData({
        stats: stats.stats || {},
        products: products.products || [],
        orders: orders.orders || [],
        profile: profile.vendor || null,
      });
    } catch (requestError) {
      setError(requestError?.response?.status === 403
        ? 'Your vendor account is awaiting admin approval.'
        : requestError?.response?.data?.message || 'Unable to load vendor data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, [user]);

  const updateOrderStatus = async (id, status) => {
    const response = await vendorApi.updateOrderStatus(id, status);
    await load();
    return response;
  };

  const updateProfile = async (data) => {
    const response = await vendorApi.updateProfile(data);
    setData((previous) => ({ ...previous, profile: response.vendor || previous.profile }));
    return response;
  };

  const createProduct = async (data) => {
    const response = await productsApi.addProduct(data);
    await load();
    return response;
  };

  const updateProduct = async (id, data) => {
    const response = await productsApi.updateProduct(id, data);
    await load();
    return response;
  };

  const deleteProduct = async (id) => {
    const response = await productsApi.deleteProduct(id);
    await load();
    return response;
  };

  return { ...data, loading, error, load, updateOrderStatus, updateProfile, createProduct, updateProduct, deleteProduct };
}
