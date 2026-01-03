import axios from "axios";

const API = axios.create({ baseURL: "http://127.0.0.1:8000" });

// Teacher
export const getTeachers = () => API.get("/teachers");
export const addTeacher = (data) => API.post("/teachers", data);

// Branch
export const getBranches = () => API.get("/branches");
export const addBranch = (data) => API.post("/branches", data);

// Division
export const getDivisions = () => API.get("/divisions");
export const addDivision = (data) => API.post("/divisions", data);

// Subject
export const getSubjects = () => API.get("/subjects");
export const addSubject = (data) => API.post("/subjects", data);

// Classroom
export const getClassrooms = () => API.get("/classrooms");
export const addClassroom = (data) => API.post("/classrooms", data);

// Timetable
export const getTimetables = () => API.get("/timetables");
export const addTimetable = (data) => API.post("/timetables", data);

// Report
export const generateReport = (params) => API.post("/reports", params);

export default API;
