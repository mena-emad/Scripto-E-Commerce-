import axios from 'axios';

const configuredBaseUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
const baseURL = configuredBaseUrl
    .replace(/\/api\/v1\/?$/, '')
    .replace(/\/$/, '');
const httpClient = axios.create({
    baseURL,
    withCredentials: true,
});

let refreshRequest = null;

const isAuthEndpoint = (url = '') => (
    url.includes('/api/v1/auth/login') ||
    url.includes('/api/v1/auth/signup') ||
    url.includes('/api/v1/auth/verify-otp') ||
    url.includes('/api/v1/auth/generate-otp') ||
    url.includes('/api/v1/auth/generate-new-access-token')
);

httpClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (
            error.response?.status !== 401 ||
            !originalRequest ||
            originalRequest._retry ||
            isAuthEndpoint(originalRequest.url)
        ) {
            return Promise.reject(error);
        }

        originalRequest._retry = true;
        refreshRequest ||= httpClient
            .post('/api/v1/auth/generate-new-access-token')
            .finally(() => {
                refreshRequest = null;
            });

        try {
            await refreshRequest;
            return httpClient(originalRequest);
        } catch (refreshError) {
            window.dispatchEvent(new CustomEvent('auth:session-expired'));
            return Promise.reject(refreshError);
        }
    }
);

export default httpClient;