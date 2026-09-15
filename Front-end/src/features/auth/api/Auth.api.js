class AuthAPI{
    constructor(httpClient,baseURL){
        this.httpClient = httpClient;
        this.baseURL = baseURL;
    }

    async login(email,password){
        if(!email || !password){
            throw new Error("Email and password are required");
        }
        try{
            const response = await this.httpClient.post(`/api/v1/${this.baseURL}/login`,{email,password});
            return response.data;

        }catch(err){
            throw err;
        }
    }

    async signUp(user){
        if(!user){
            throw new Error("User is required");
        }
        const response = await this.httpClient.post(`/api/v1/${this.baseURL}/signup`,user);
        return response.data;
    }

    async logout(){
        const response = await this.httpClient.post(`/api/v1/${this.baseURL}/logout`);
        return response.data;
    }

    async getProfile(){
        const response = await this.httpClient.get(`/api/v1/${this.baseURL}/me`);
        return response.data;
    }

    async verifyOtp(email,otp){
        if(!email || !otp){
            throw new Error("Email and otp are required");
        }
        const response = await this.httpClient.post(`/api/v1/${this.baseURL}/verify-otp`,{email,otp});
        return response.data;
    }

    async generateNewAccessToken(){
        const response = await this.httpClient.post(`/api/v1/${this.baseURL}/generate-new-access-token`);
        return response.data;
    }

    async generateOtp(email){
        if(!email){
            throw new Error("Email is required");
        }
        const response = await this.httpClient.post(`/api/v1/${this.baseURL}/generate-otp`,{email});
        return response.data;
    }

    async forgotPassword(email){
        if(!email){
            throw new Error("Email is required");
        }
        const response = await this.httpClient.post(`/api/v1/${this.baseURL}/forgot-password`,{email});
        return response.data;
    }

    async resetPassword(email,otp,newPassword,confirmPassword){
        if(!email || !otp || !newPassword || !confirmPassword){
            throw new Error("Email, otp and newPassword are required");
        }
        const response = await this.httpClient.post(`/api/v1/${this.baseURL}/reset-password`,{email,otp,password:newPassword,confirmPassword});
        return response.data;
    }

    async updatePassword(currentPassword,newPassword,confirmPassword){
        if(!currentPassword || !newPassword || !confirmPassword){
            throw new Error("currentPassword, newPassword and confirmPassword are required");
        }
        const response = await this.httpClient.patch(`/api/v1/${this.baseURL}/update-password`,{currentPassword,newPassword,confirmPassword});
        return response.data;
    }

    async updateProfile(data){
        const response = await this.httpClient.patch(`/api/v1/${this.baseURL}/profile`,data,{
            headers: {'Content-Type': 'multipart/form-data'}
        });
        return response.data;
    }

    async deleteMyAccount(){
        const response = await this.httpClient.delete(`/api/v1/${this.baseURL}/delete-my-account`);
        return response.data;
    }

    async deleteAccount(id){
        const response = await this.httpClient.delete(`/api/v1/${this.baseURL}/delete-account/${id}`);
        return response.data;
    }

    async toggleblockAccount(id){
        const response = await this.httpClient.patch(`/api/v1/${this.baseURL}/block-account/${id}`);
        return response.data;
    }

    

}

export default AuthAPI