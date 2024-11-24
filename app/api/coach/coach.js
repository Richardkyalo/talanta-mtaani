import axios from "axios";

const api = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_API_URL}`,
});

class coachService {
  coachApi ="/api/coach";

  async createCoach(data) {
    try {
      const response = await api.post(`${this.coachApi}/create`, data);
      return response.data;
    } catch (error) {
      console.error("Error in createCoach:", error);
      throw error;
    }
  }
  async getAllCoaches() {
    try {
      const response = await api.get(`${this.coachApi}/getall`);
      return response.data;
    } catch (error) {
      console.error("Error in getCoaches:", error);
      throw error;
    }
  }
  async getCoachById(id) {
    try {
      const response = await api.get(`${this.coachApi}/getbyid/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error in getCoachById:", error);
      throw error;
    }
  }
  async updateCoach(id, data) {
    try {
      const response = await api.put(`${this.coachApi}/update/${id}`, data);
      return response.data;
    } catch (error) {
      console.error("Error in updateCoach:", error);
      throw error;
    }
  }
}

export const CoachService = new coachService();