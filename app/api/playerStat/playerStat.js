import axios from "axios";

const api = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_API_URL}`,
});

class playerStatService {
    playerStatApi = "/api/v1/players/stats";
    async createPlayerStat(data) {
        try {
            const response = await api.post(`${this.playerStatApi}/create`, data);
            return response.data;
        } catch (error) {
            console.error("Error in createPlayerStat:", error);
            throw error;
        }
    }
    async getAllPlayerStats() {
        try {
            const response = await api.get(`${this.playerStatApi}/getAll`);
            return response.data;
        } catch (error) {
            console.error("Error in getAllPlayerStats:", error);
            throw error;
        }
    }
    async getPlayerStatById(id) {
        try {
            const response = await api.get(`${this.playerStatApi}/getbyid/${id}`);
            return response.data;
        } catch (error) {
            console.error("Error in getPlayerStatById:", error);
            throw error;
        }
    }
    async updatePlayerStat(data) {
        try {
            const response = await api.put(`${this.playerStatApi}/update`, data);
            return response.data;
        } catch (error) {
            console.error("Error in updatePlayerStat:", error);
            throw error;
        }
    }
}

export const playerStatServiceInstance = new playerStatService();