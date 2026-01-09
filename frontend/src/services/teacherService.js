import axios from "axios";

const API_URL = "http://127.0.0.1:8000/teacher/";

export const getTeachers = async () => {
  try {
    const res = await axios.get(API_URL);
    return res.data;
  } catch (error) {
    console.error("Error fetching teachers:", error);
    return [];
  }
};

export const createTeacher = async (data) => {
  try {
    const res = await axios.post(API_URL, data);
    return res.data;
  } catch (error) {
    console.error("Error creating teacher:", error);
    throw error; // Let component handle error message
  }
};

export const deleteTeacher = async (id) => {
  try {
    const res = await axios.delete(`${API_URL}${id}`);
    return res.data;
  } catch (error) {
    console.error("Error deleting teacher:", error);
    throw error;
  }
};