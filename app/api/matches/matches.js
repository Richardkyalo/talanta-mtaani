import axios from "axios";

const api = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_API_URL}`,
});

class MatchService {

    matchApi = "/api/match";
    async createMatch(data) {
        try {
            const response = await api.post(`${this.matchApi}/create`, data);
            return response.data;
        } catch (error) {
            console.error("Error in createMatch:", error);
            throw error;
        }
    }
    async getAllMatches() {
        try {
            const response = await api.get(`${this.matchApi}/getAll`);
            return response.data;
        } catch (error) {
            console.error("Error in getAllMatches:", error);
            throw error;
        }
    }
    async getMatchById(id) {
        try {
            const response = await api.get(`${this.matchApi}/${id}`);
            return response.data;
        } catch (error) {
            console.error("Error in getMatchById:", error);
            throw error;
        }
    }
    async getTodayMatches() {
        try {
            const response = await api.get(`${this.matchApi}/getTodaysMatches`);
            return response.data;
        } catch (error) {
            console.error("Error in getTodayMatches:", error);
            throw error;
        }
    }
    async getPoolMatches() {
        try {
            const response = await api.get(`${this.matchApi}/getPoolMatches/`);
            return response.data;
        } catch (error) {
            console.error("Error in getPoolMatches:", error);
            throw error;
        }
    }
    async updateMatch(data) {
        try {
            const response = await api.put(`${this.matchApi}/update`, data);
            return response.data;
        } catch (error) {
            console.error("Error in updateMatch:", error);
            throw error;
        }
    }
}
 export const matchService = new MatchService();