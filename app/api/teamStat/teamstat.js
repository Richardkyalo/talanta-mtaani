import axios from "axios";
const api = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_API_URL}`, 
});

class teamStatService {
    teamStatApi = '/api/v1/team/stats'
    async createTeamStat(data) {
        try {
            const response = await api.post(`${this.teamStatApi}/create`, data);
            return response.data;
        } catch (error) {
            console.error("Error in createTeamStat:", error);
            throw error;
        }
    }

    async getAllTeamStats() {
        try {
            const response = await api.get(`${this.teamStatApi}/getAll`);
            return response.data;
        } catch (error) {
            console.error("Error in getAllTeamStats:", error);
            throw error;
        }
    }

    async getTeamStatById(id) {
        try {
            const response = await api.get(`${this.teamStatApi}/fetch/one/${id}`);
            return response.data;
        } catch (error) {
            console.error("Error in getTeamStatById:", error);
            throw error;
        }
    }

    async updateTeamStat(data) {
        try {
            const response = await api.put(`${this.teamStatApi}/update`, data);
            return response.data;
        } catch (error) {
            console.error("Error in updateTeamStat:", error);
            throw error;
        }
    }
    async getTeamStatByTeamId(id) {
        try {
            const response = await api.get(`${this.teamStatApi}/getByTeamId/${id}`);
            return response.data;
        } catch (error) {
            console.error("Error in getTeamStatByTeamId:", error);
            throw error;
        }
    }
}

export const teamStatisticService = new teamStatService();