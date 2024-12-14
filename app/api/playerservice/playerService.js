import axios from "axios";

const api = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_API_URL}`,
});
class PlayerService {
    playerApi = "/api/player";
    async createPlayer(data) {
        try {
            const response = await api.post(`${this.playerApi}/create`, data);
            return response.data;
        } catch (error) {
            console.error("Error in createPlayer:", error);
            throw error;
        }
    }

    async getAllPlayers() {
        try {
            const response = await api.get(`${this.playerApi}/getall/players`);
            return response.data;
        } catch (error) {
            console.error("Error in getAllPlayers:", error);
            throw error;
        }
    }
    async getPlayerById(id) {
        try {
            const response = await api.get(`${this.playerApi}/getbyid/${id}`);
            return response.data;
        } catch (error) {
            console.error("Error in getPlayerById:", error);
            throw error;
        }
    }
    async getPlayerByTeamId(id) {
        try {
            const response = await api.get(`${this.playerApi}/get/by/team/${id}`);
            return response.data;
        } catch (error) {
            console.error("Error in getPlayerByTeamId:", error);
            throw error;
        }
    }
    async deletePlayer(id) {
        try {
            const response = await api.delete(`${this.playerApi}/delete/${id}`);
            return response.data;
        } catch (error) {
            console.error("Error in deletePlayer:", error);
            throw error;
        }
    }
}
export const playerService = new PlayerService();