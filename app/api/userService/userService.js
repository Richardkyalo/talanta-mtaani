import axios from "axios";

const api = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_API_URL}`, 
});

class UserService {
    userApi = '/api/v1/user';
    refereeApi ="/api/referee"

    async checkIfUserExists(email) {
        try {

            const response = await api.post(`${this.userApi}/getUserByEmail`,  {email});
            return response.data; 
        } catch (error) {
            console.error("Error in checkIfUserExists:", error);
            throw error; 
            }
    }
    async getUserByUserName(username) {
        try {
            const response = await api.post(`${this.userApi}/get/user/username`, {username});
            return response.data;
        } catch (error) {
            console.error("Error in getUserByUserName:", error);
            throw error;
        }
    }
    async getAllUsers(page, limit) {
        try {
            const response = await api.get(`${this.userApi}/get-all?page=${page}&limit=${limit}`);
            return response.data;
        } catch (error) {
            console.error("Error in getAllUsers:", error);
            throw error;
        }
    }
    async updateUser(id, data) {
        try {
            const response = await api.put(`${this.userApi}/${id}`, data);
            return response.data;
        } catch (error) {
            console.error("Error in updateUser:", error);
            throw error;
        }
    }
    async createReferee(data) {
        try {
            const response = await api.post(`${this.refereeApi}/create`, data);
            return response.data;
        } catch (error) {
            console.error("Error in createReferee:", error);
            throw error;
        }
    }
    async getReferees() {
        try {
            const response = await api.get(`${this.refereeApi}/getAll`);
            return response.data;
        } catch (error) {
            console.error("Error in getReferees:", error);
            throw error;
        }
    }
    async getRefereeById(id) {
        try {
            const response = await api.get(`${this.refereeApi}/getById/${id}`);
            return response.data;
        } catch (error) {
            console.error("Error in getRefereeById:", error);
            throw error;
        }
    }
}

export const userService = new UserService();
