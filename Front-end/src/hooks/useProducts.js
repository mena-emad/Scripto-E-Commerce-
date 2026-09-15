import { useEffect, useState } from 'react';
import { productsApi } from '../container';

export default function useProducts(params = {}) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadProducts = async (nextParams = params) => {
    try {
      setLoading(true);
      setError('');
      const response = await productsApi.getProducts(nextParams);
      setProducts((response.products || []).map((product) => ({
        ...product,
        id: product._id,
        images: product.images || [],
        vendor: product.vendor,
      })));
      return response;
    } catch (requestError) {
      setError(requestError?.response?.data?.message || 'Unable to load products.');
      setProducts([]);
      throw requestError;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts().catch(() => {});
  }, []);

  return { products, loading, error, loadProducts };
}
