import { useEffect, useState } from 'react';
import { ordersApi } from '../container';

export default function useOrders(user) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const normalizeOrder = (order) => ({
    ...order,
    id: order._id,
    status: order.globalStatus,
    total: order.totalPrice,
    items: (order.products || []).map((item) => ({
      productId: item.product?._id || item.product,
      productName: item.product?.name || 'Product',
      quantity: item.quantity,
      price: item.price,
    })),
  });

  const loadOrders = async () => {
    if (!user) {
      setOrders([]);
      return;
    }
    try {
      setLoading(true);
      setError('');
      const response = await ordersApi.getMyOrders();
      setOrders((response.orders || []).map(normalizeOrder));
    } catch (requestError) {
      setError(requestError?.response?.data?.message || 'Unable to load your orders.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, [user]);

  const makeOrder = async (payload) => {
    try {
      setLoading(true);
      setError('');
      const response = await ordersApi.makeOrder(payload);
      setOrders((previous) => [normalizeOrder(response.order), ...previous]);
      return response;
    } catch (requestError) {
      setError(requestError?.response?.data?.message || 'Unable to place the order.');
      throw requestError;
    } finally {
      setLoading(false);
    }
  };

  return { orders, loading, error, loadOrders, makeOrder };
}
