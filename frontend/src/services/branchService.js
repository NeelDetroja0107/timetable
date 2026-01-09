import axios from "axios";

const API_URL = "http://127.0.0.1:8000/branch/";


export const getBranches = async () => {
  try {
    const res = await axios.get(API_URL);
    return res.data;
  } catch (error) {
    console.error("Error fetching branches:", error);
    return [];
  }
};


export const createBranch = async (data) => {
  try {
    const res = await axios.post(API_URL, data);
    return res.data;
  } catch (error) {
    console.error("Error creating branch:", error);
    throw error;
  }
};


export const deleteBranch = async (id) => {
  try {
    const res = await axios.delete(`${API_URL}${id}`);
    return res.data;
  } catch (error) {
    console.error("Error deleting branch:", error);
    throw error;
  }
};
