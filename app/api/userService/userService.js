import axios from "axios";

const api = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_API_URL}`, 
});

class UserService {
    userApi = '/api/v1/user';

    async checkIfUserExists(email) {
        try {

            const response = await api.post(`${this.userApi}/getUserByEmail`,  {email});
            return response.data; 
        } catch (error) {
            console.error("Error in checkIfUserExists:", error);
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
}

export const userService = new UserService();
