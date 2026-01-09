import axios from "axios";

const API_URL = "http://127.0.0.1:8000/subject/";

export const getSubjects = async () => {
  try {
    const res = await axios.get(API_URL);
    return res.data;
  } catch (error) {
    console.error("Error fetching subjects:", error);
    return [];
  }
};

export const createSubject = async (data) => {
  try {
    const res = await axios.post(API_URL, data);
    return res.data;
  } catch (error) {
    console.error("Error creating subject:", error);
    throw error;
  }
};

export const deleteSubject = async (id) => {
  try {
    const res = await axios.delete(`${API_URL}${id}`);
    return res.data;
  } catch (error) {
    console.error("Error deleting subject:", error);
    throw error;
  }
};
