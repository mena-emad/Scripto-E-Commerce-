class CartAPI{
    constructor(httpClient,baseURL){
        this.httpClient = httpClient;
        this.baseURL = baseURL;
    }

    async addToCart(productId,quantity){
        const response = await this.httpClient.post(`/api/v1/${this.baseURL}/add-to-cart`,{productId,quantity});
        return response.data;

    }

    async updateCart(productId,quantity){
        const response = await this.httpClient.patch(`/api/v1/${this.baseURL}/update-cart`,{productId,quantity});
        return response.data;
    }

    async removeFromCart(productId){
        const response = await this.httpClient.delete(`/api/v1/${this.baseURL}/remove-from-cart`,{data:{productId}});
        return response.data;
    }

    async getMyCart(){
        const response = await this.httpClient.get(`/api/v1/${this.baseURL}/get-my-cart`);
        return response.data;
    }

    async clearCart(){
        const response = await this.httpClient.delete(`/api/v1/${this.baseURL}/clear-cart`);
        return response.data;
    }


}

export default CartAPI;
