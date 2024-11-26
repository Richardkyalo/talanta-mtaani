import axios from "axios";

const api = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_API_URL}`, 
});

class TeamService {
    teamApi= '/api/team'
    async createTeam(data) {
        try {
            const response = await api.post(`${this.teamApi}/create`, data);
            return response.data;
        } catch (error) {
            console.error("Error in createTeam:", error);
            throw error;
        }
    }
    async getAllTeams() {
        try {
            const response = await api.get(`${this.teamApi}/getAll`);
            return response.data;
        } catch (error) {
            console.error("Error in getAllTeams:", error);
            throw error;
        }
    }
    async getTeamById(id) {
        try {
            const response = await api.get(`${this.teamApi}/getById/${id}`);
            return response.data;
        } catch (error) {
            console.error("Error in getTeamById:", error);
            throw error;
        }
    }
    async updateTeam(id, data) {
        try {
            const response = await api.put(`${this.teamApi}/update/${id}`, data);
            return response.data;
        } catch (error) {
            console.error("Error in updateTeam:", error);
            throw error;
        }
    }

    async getTeamByCoachId(id) {    
        try {
            const response = await api.get(`${this.teamApi}/getByCoachId/${id}`);
            return response.data || {};
        } catch (error) {
            console.error("Error in getTeamByCoachId:", error);
            throw error;
        }
    }   
}

export const teamService = new TeamService();
