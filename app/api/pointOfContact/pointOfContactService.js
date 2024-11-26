import axios from "axios";
// import { error } from "console";

const api = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_API_URL}`, 
});

class pointOfContactService {
    pointOfContactApi= '/api/pointofC'

    async createPointOfC (data) {
        try {
            const response = await api.post(`${this.pointOfContactApi}/create`, data);
            return response.data;
        }catch (error) {
            console.error('error creating user', error);
            throw error;
        }
    }

    async getPointOfContactById(id) {
        try{
            const response = await api.get(`${this.pointOfContactApi}/getById/${id}`)
            return response.data;
        }catch(error) {
            console.error('error getting point of contact', error)
            throw error;
        }
    }
    async getPointOfContactByUserId(id) {
        try{
            const response = await api.get(`${this.pointOfContactApi}/get/ByUserId/${id}`)
            return response.data;
        }catch(error) {
            console.error('error getting all point of contact', error)
            throw error;
        }
    }
}

export const pointofContact = new pointOfContactService();