import { useEffect, useState } from 'react';
import { cartApi } from '../container';

const normalizeCart = (cart) => ({
  ...(cart || {}),
  products: (cart?.products || []).map((item) => ({
    productId: item.product?._id || item.product,
    productName: item.product?.name || 'Product',
    vendorId: item.vendor,
    quantity: item.quantity,
    price: item.price ?? item.product?.salePrice ?? item.product?.price ?? 0,
    image: item.product?.images?.[0]?.url || item.product?.images?.[0],
  })),
});

export default function useCart(user) {
  const [cartItems, setCartItems] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const applyResponse = (response) => {
    const normalizedCart = normalizeCart(response.cart);
    setCartItems(normalizedCart.products);
    setCartTotal(Number(normalizedCart.totalPrice) || 0);
    return response;
  };

  const loadCart = async () => {
    if (!user) {
      setCartItems([]);
      setCartTotal(0);
      return;
    }
    try {
      setLoading(true);
      setError('');
      applyResponse(await cartApi.getMyCart());
    } catch (requestError) {
      setError(requestError?.response?.data?.message || 'Unable to load your cart.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCart();
  }, [user]);

  const addToCart = async (productId, quantity = 1) => {
    try {
      setLoading(true);
      setError('');
      return applyResponse(await cartApi.addToCart(productId, quantity));
    } catch (requestError) {
      setError(requestError?.response?.data?.message || 'Unable to add this product to your cart.');
      throw requestError;
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (productId, quantity) => {
    try {
      setLoading(true);
      setError('');
      return applyResponse(await cartApi.updateCart(productId, quantity));
    } catch (requestError) {
      setError(requestError?.response?.data?.message || 'Unable to update your cart.');
      throw requestError;
    } finally {
      setLoading(false);
    }
  };

  const removeItem = async (productId) => {
    try {
      setLoading(true);
      setError('');
      return applyResponse(await cartApi.removeFromCart(productId));
    } catch (requestError) {
      setError(requestError?.response?.data?.message || 'Unable to remove this item.');
      throw requestError;
    } finally {
      setLoading(false);
    }
  };

  const clearCart = async () => {
    try {
      setLoading(true);
      setError('');
      await cartApi.clearCart();
      setCartItems([]);
      setCartTotal(0);
    } catch (requestError) {
      setError(requestError?.response?.data?.message || 'Unable to clear your cart.');
      throw requestError;
    } finally {
      setLoading(false);
    }
  };

  return { cartItems, cartTotal, loading, error, addToCart, updateQuantity, removeItem, clearCart, loadCart };
}
