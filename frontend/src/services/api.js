import axios from 'axios';

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8080/api/v1/inventory',
    timeout: 15000,
});

export const inventoryService = {
    getMovements: async (params) => {
        const queryParams = { ...params };
        if (queryParams.start) queryParams.start = `${queryParams.start}T00:00:00Z`;
        if (queryParams.end) queryParams.end = `${queryParams.end}T23:59:59Z`;
        
        const { data } = await api.get('/movements', { params: queryParams });
        return data;
    },

    getSkus: async () => {
        const { data } = await api.get('/movements/skus');
        return data;
    },

    getExportUrl: (params) => {
        const queryParams = new URLSearchParams({ ...params, export: true });
        if (params.start) queryParams.set('start', `${params.start}T00:00:00Z`);
        if (params.end) queryParams.set('end', `${params.end}T23:59:59Z`);
        
        return `${api.defaults.baseURL}/movements?${queryParams.toString()}`;
    }
};
