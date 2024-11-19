import axios from "axios";

const api = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_API_URL}`,
});
class UserRoleService {
    rbacEndpoint="/api/v1"
    
    async createRole(data) {
        try {
            const response = await api.post(`${this.rbacEndpoint}/user/create`, data);
            console.log(response)
            return response.data;
        } catch (error) {
            console.error("Error in createRole:", error);
            throw error;
        }
    }
    async getAllRoles() {
        try {
            const response = await api.get(`${this.rbacEndpoint}/role/get/all/roles`);
            return response.data;
        } catch (error) {
            console.error("Error in getAllRoles:", error);
            throw error;
        }
    }
    
}

export const userRoleService = new UserRoleService();
