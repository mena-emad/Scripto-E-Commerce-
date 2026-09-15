class AdminAPI{
    constructor(httpClient,baseURL){
        this.httpClient = httpClient;
        this.baseURL = baseURL;
    }

    async getStats(params = {}){
        const response = await this.httpClient.get(`/api/v1/${this.baseURL}/statics`,{params});
        return response.data;
    }

    async getUsers(params = {}){
        const response = await this.httpClient.get(`/api/v1/${this.baseURL}/users`,{params});
        return response.data;
    }

    async getVendors(params = {}){
        const response = await this.httpClient.get(`/api/v1/${this.baseURL}/vendors`,{params});
        return response.data;
    }

    async getProducts(params = {}){
        const response = await this.httpClient.get(`/api/v1/${this.baseURL}/products`,{params});
        return response.data;
    }

    async getUser(id){
        const response = await this.httpClient.get(`/api/v1/${this.baseURL}/user/${id}`);
        return response.data;
    }

    async getVendor(id){
        const response = await this.httpClient.get(`/api/v1/${this.baseURL}/vendor/${id}`);
        return response.data;
    }

    async getProduct(id){
        const response = await this.httpClient.get(`/api/v1/${this.baseURL}/product/${id}`);
        return response.data;
    }

    async approveVendor(id){
        const response = await this.httpClient.patch(`/api/v1/${this.baseURL}/approve-vendor/${id}`);
        return response.data;
    }

    async approveProduct(id){
        const response = await this.httpClient.patch(`/api/v1/${this.baseURL}/approve-product/${id}`);
        return response.data;
    }

    async deleteProduct(id){
        const response = await this.httpClient.delete(`/api/v1/products/delete-product/${id}`);
        return response.data;
    }

    async toggleProductActive(id, isActive){
        const response = await this.httpClient.patch(`/api/v1/products/toggle-active/${id}`, { isActive });
        return response.data;
    }

    async deleteUser(id){
        const response = await this.httpClient.delete(`/api/v1/auth/delete-account/${id}`);
        return response.data;
    }

    async toggleBlockUser(id){
        const response = await this.httpClient.patch(`/api/v1/auth/block-account/${id}`);
        return response.data;
    }
}

export default AdminAPI;