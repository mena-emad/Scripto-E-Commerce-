class ProudctsAPI{
    constructor(httpClient,baseURL){
        this.httpClient = httpClient;
        this.baseURL = baseURL;
    }

    async getProducts(params = {}){
        const response = await this.httpClient.get(`/api/v1/${this.baseURL}/get-products`,{params});
        return response.data;
    }

    async addProduct(product){
        const response = await this.httpClient.post(`/api/v1/${this.baseURL}/add-product`,product,{
            headers: {'Content-Type': 'multipart/form-data'}
        });
        return response.data;
    }

    async updateProduct(id,newProduct){
        const response = await this.httpClient.put(`/api/v1/${this.baseURL}/update-product/${id}`,newProduct,{
            headers: {'Content-Type': 'multipart/form-data'}
        });
        return response.data;
    }

    async deleteProduct(id){
        const response = await this.httpClient.delete(`/api/v1/${this.baseURL}/delete-product/${id}`);
        return response.data;
    }
}

export default ProudctsAPI