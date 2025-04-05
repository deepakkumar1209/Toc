import axios from "axios";

const API_URL = "http://127.0.0.1:5000";  // Flask backend

export const convertRegex = async (regex, type) => {
    try {
        const response = await axios.post(`${API_URL}/convert`, { regex, type });
        return response.data.image;  // Returns the image filename
    } catch (error) {
        console.error("Error converting regex:", error);
        return null;
    }
};
