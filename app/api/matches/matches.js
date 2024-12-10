import axios from "axios";

const api = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_API_URL}`,
});

class MatchService {

    matchApi = "/api/match";
    matchStatApi = "/api/v1/matchStats";
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
    async getMatchesByDate (date) {
        try {
            const response = await api.post(`${this.matchApi}/getMatches/By/specific/date`, date);
            return response.data;
        } catch (error) {
            console.error("Error in getMatchesByDate:", error);
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
    async deleteMatch(id) {
        try {
            const response = await api.delete(`${this.matchApi}/${id}`);
            return response.data;
        } catch (error) {
            console.error("Error in deleteMatch:", error);
            throw error;
        }
    }
    async createMatchStats(data) {
        try {
            const response = await api.post(`${this.matchStatApi}/create`, data);
            return response.data;
        } catch (error) {
            console.error("Error in createMatchStats:", error);
            throw error;
        }
    }
    async updateMatchStat (data) {
        try {
            const response = await api.put(`${this.matchStatApi}/update`, data);
            return response.data;
        } catch (error) {
            console.error("Error in updateMatchStat:", error);
            throw error;
        }
    }
}
 export const matchService = new MatchService();