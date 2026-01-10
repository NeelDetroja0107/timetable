import axios from "axios";

const API_URL = "http://127.0.0.1:8000/division/";

export const getDivisions = async () => {
  try {
    const res = await axios.get(API_URL);
    return res.data;
  } catch (error) {
    console.error("Error fetching divisions:", error);
    return [];
  }
};

export const createDivision = async (data) => {
  try {
    const res = await axios.post(API_URL, data);
    return res.data;
  } catch (error) {
    console.error("Error creating division:", error);
    throw error;
  }
};

export const deleteDivision = async (id) => {
  try {
    const res = await axios.delete(`${API_URL}${id}`);
    return res.data;
  } catch (error) {
    console.error("Error deleting division:", error);
    throw error;
  }
};
