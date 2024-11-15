import axios from "axios";

const authApi = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_API_URL}`,
});
export const authUrlEndpoint = "/api/v1/user";

export const registerUser = async ({ data }) => {
    const response = await authApi.post(`${authUrlEndpoint}/register`, data);
    return response.data.data;
};
