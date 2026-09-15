class VendorAPI {
    constructor(httpClient, baseURL) {
        this.httpClient = httpClient;
        this.baseURL = baseURL;
    }

    async getProfile() {
        const response = await this.httpClient.get(`/api/v1/${this.baseURL}/profile`);
        return response.data;
    }

    async updateProfile(data) {
        const response = await this.httpClient.patch(`/api/v1/${this.baseURL}/profile`, data);
        return response.data;
    }

    async getProducts() {
        const response = await this.httpClient.get(`/api/v1/${this.baseURL}/products`);
        return response.data;
    }

    async getOrders() {
        const response = await this.httpClient.get(`/api/v1/${this.baseURL}/orders`);
        return response.data;
    }

    async getOrder(id) {
        const response = await this.httpClient.get(`/api/v1/${this.baseURL}/orders/${id}`);
        return response.data;
    }

    async updateOrderStatus(id, status) {
        const response = await this.httpClient.patch(`/api/v1/${this.baseURL}/orders/${id}/status`, { status });
        return response.data;
    }

    async getDashboardStats() {
        const response = await this.httpClient.get(`/api/v1/${this.baseURL}/dashboard/stats`);
        return response.data;
    }

    async getProductsStats() {
        const response = await this.httpClient.get(`/api/v1/${this.baseURL}/dashboard/products/stats`);
        return response.data;
    }

    async getRecentOrders(params = {}) {
        const response = await this.httpClient.get(`/api/v1/${this.baseURL}/dashboard/orders/recent`, { params });
        return response.data;
    }
}

export default VendorAPI;