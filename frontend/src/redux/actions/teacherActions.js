import { getTeachers, addTeacher } from "../../services/api";

export const fetchTeachers = () => async (dispatch) => {
  dispatch({ type: "TEACHERS_REQUEST" });
  try {
    const { data } = await getTeachers();
    dispatch({ type: "TEACHERS_SUCCESS", payload: data });
  } catch (error) {
    dispatch({ type: "TEACHERS_FAIL", payload: error.message });
  }
};

export const createTeacher = (teacher) => async (dispatch) => {
  dispatch({ type: "TEACHER_ADD_REQUEST" });
  try {
    const { data } = await addTeacher(teacher);
    dispatch({ type: "TEACHER_ADD_SUCCESS", payload: data });
  } catch (error) {
    dispatch({ type: "TEACHER_ADD_FAIL", payload: error.message });
  }
};
