import AuthAPI from "./features/auth/api/Auth.api";
import CartAPI from "./features/cart/api/cart.api";
import OrdersAPI from "./features/orders/api/Orders.api";
import ProductsAPI from "./features/products/api/Products.api";
import AdminAPI from "./features/admin/api/Admin.api";
import VendorAPI from "./features/vendor/api/Vendor.api";
import httpClient from "./config/api";



export const authApi = new AuthAPI(httpClient,"auth")
export const cartApi = new CartAPI(httpClient,"cart")
export const ordersApi = new OrdersAPI(httpClient,"orders")
export const productsApi = new ProductsAPI(httpClient,"products")
export const adminApi = new AdminAPI(httpClient,"admin")
export const vendorApi = new VendorAPI(httpClient,"vendor")

