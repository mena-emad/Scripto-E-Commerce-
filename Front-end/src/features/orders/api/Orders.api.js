class OrdersAPI{
    constructor(httpClient,baseURL){
        this.httpClient = httpClient;
        this.baseURL = baseURL;
    }

    async makeOrder(order){
        const response = await this.httpClient.post(`/api/v1/${this.baseURL}/make-order`,order);
        return response.data;
    }

    async getMyOrders(){
        const response = await this.httpClient.get(`/api/v1/${this.baseURL}/my-orders`);
        return response.data;
    }
}

export default OrdersAPI;