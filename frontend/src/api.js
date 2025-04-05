import axios from "axios";

const API_URL = "https://toc-1.onrender.com";  // Live Flask backend

export const convertRegex = async (regex, type) => {
    try {
        const response = await axios.post(`${API_URL}/convert`, { regex, type });
        return response.data.image;  // Returns the image filename
    } catch (error) {
        console.error("Error converting regex:", error);
        return null;
    }
};
