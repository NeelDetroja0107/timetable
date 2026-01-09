import { getSubjects, createSubject, deleteSubject } from "../../services/subjectService";


export const fetchSubjects = () => async (dispatch) => {
  dispatch({ type: "SUBJECTS_REQUEST" });
  try {
    const data = await getSubjects();
    dispatch({ type: "SUBJECTS_SUCCESS", payload: data });
  } catch (error) {
    dispatch({
      type: "SUBJECTS_FAIL",
      payload: error.message,
    });
  }
};


export const addSubject = (subject) => async (dispatch) => {
  dispatch({ type: "SUBJECT_ADD_REQUEST" });
  try {
    const data = await createSubject(subject);
    dispatch({ type: "SUBJECT_ADD_SUCCESS", payload: data });
  } catch (error) {
    dispatch({
      type: "SUBJECT_ADD_FAIL",
      payload: error.message,
    });
  }
};


export const removeSubject = (id) => async (dispatch) => {
  dispatch({ type: "SUBJECT_DELETE_REQUEST" });
  try {
    await deleteSubject(id);
    dispatch({ type: "SUBJECT_DELETE_SUCCESS", payload: id });
  } catch (error) {
    dispatch({
      type: "SUBJECT_DELETE_FAIL",
      payload: error.message,
    });
  }
};
