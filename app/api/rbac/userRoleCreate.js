import axios from "axios";

const api = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_API_URL}`,
});
class UserRoleService {
    rbacEndpoint="/api/v1/rbac/user"
    getroles="/api/v1/roles"
    
    async createRole(data) {
        try {
            const response = await api.post(`${this.rbacEndpoint}/create`, data);
            console.log(response)
            return response.data;
        } catch (error) {
            console.error("Error in createRole:", error);
            throw error;
        }
    }
    async asignRole(data) {
        try {
            const response = await api.post(`${this.rbacEndpoint}/assign/role`, data);
            // console.log(response)
            return response.data;
        } catch (error) {
            console.error("Error in asignRole:", error);
            throw error;
        }
    }
    async getAllRoles() {
        try {
            const response = await api.get(`${this.getroles}/all`);
            return response.data;
        } catch (error) {
            console.error("Error in getAllRoles:", error);
            throw error;
        }
    }
    async getRoleById(id) {
        try {
            const response = await api.get(`${this.getroles}/get/${id}`);
            // console.log(response)
            return response;
        } catch (error) {
            console.error("Error in getRoleById:", error);
            throw error;
        }
    }
    
}

export const userRoleService = new UserRoleService();
