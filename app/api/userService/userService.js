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
}

export const userService = new UserService();
